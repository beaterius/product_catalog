import { useEffect, useMemo, useState } from 'react';

import './App.css';

import { Product } from './types/product';

import { API_URL } from './constants/api';

import Header from './components/layout/Header';
import NavigationTabs from './components/layout/NavigationTabs';
import MessageBox from './components/layout/MessageBox';

import MainPage from './components/pages/MainPage';
import FavoritesPage from './components/pages/FavoritesPage';
import ComparePage from './components/pages/ComparePage';

const ITEMS_PER_PAGE_MAIN = 8;

type Tab = 'main' | 'favorites' | 'compare';

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [activeTab, setActiveTab] =
        useState<Tab>('main');

    // filters
    const [search, setSearch] = useState('');
    const [category, setCategory] =
        useState('all');

    const [inStockOnly, setInStockOnly] =
        useState(false);

    const [discountOnly, setDiscountOnly] =
        useState(false);

    const [sortBy, setSortBy] = useState('');

    // pagination main
    const [currentMainPage, setCurrentMainPage] =
        useState(1);

    const [itemsPerPage, setItemsPerPage] =
        useState(ITEMS_PER_PAGE_MAIN);

    // pagination favorites
    const [currentFavPage, setCurrentFavPage] =
        useState(1);

    const [itemsPerPageFav, setItemsPerPageFav] =
        useState(4);

    // favorites
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('favorites');

        return saved ? JSON.parse(saved) : [];
    });

    // compare
    const [compare, setCompare] = useState<number[]>(() => {
        const saved = localStorage.getItem('compare');

        return saved ? JSON.parse(saved) : [];
    });

    const [message, setMessage] = useState<{
        type: 'info' | 'warn' | 'error' | 'success';
        text: string;
    } | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);

                const response = await fetch(API_URL);

                if (!response.ok) {
                    setError('Failed to load products.');
                    setLoading(false);
                    return;
                }

                const data = await response.json();

                setProducts(data.products);
            } catch {
                setError('Failed to load products.');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'favorites',
            JSON.stringify(favorites)
        );
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem(
            'compare',
            JSON.stringify(compare)
        );
    }, [compare]);

    const categories = useMemo(() => {
        return [
            ...new Set(
                products.map(product => product.category)
            )
        ];
    }, [products]);

    const filteredProducts = useMemo(() => {
        const searchLower = search.toLowerCase();

        return [...products]
            .filter(product => {
                const matchesSearch =
                    product.title
                        .toLowerCase()
                        .includes(searchLower) ||
                    product.brand
                        ?.toLowerCase()
                        .includes(searchLower) ||
                    product.category
                        .toLowerCase()
                        .includes(searchLower);

                const matchesCategory =
                    category === 'all' ||
                    product.category === category;

                const matchesStock =
                    !inStockOnly || product.stock > 0;

                const matchesDiscount =
                    !discountOnly ||
                    product.discountPercentage > 0;

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStock &&
                    matchesDiscount
                );
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc':
                        return a.price - b.price;

                    case 'price-desc':
                        return b.price - a.price;

                    case 'rating-desc':
                        return b.rating - a.rating;

                    case 'title-asc':
                        return a.title.localeCompare(
                            b.title
                        );

                    default:
                        return 0;
                }
            });
    }, [
        products,
        search,
        category,
        inStockOnly,
        discountOnly,
        sortBy
    ]);

    useEffect(() => {
        setCurrentMainPage(1);
    }, [
        search,
        category,
        inStockOnly,
        discountOnly,
        sortBy,
        itemsPerPage
    ]);

    const totalMainPages = Math.ceil(
        filteredProducts.length / itemsPerPage
    );

    const paginatedProducts = useMemo(() => {
        const start =
            (currentMainPage - 1) * itemsPerPage;

        return filteredProducts.slice(
            start,
            start + itemsPerPage
        );
    }, [
        filteredProducts,
        currentMainPage,
        itemsPerPage
    ]);

    const favoriteProducts = products.filter(product =>
        favorites.includes(product.id)
    );

    const compareProducts = products.filter(product =>
        compare.includes(product.id)
    );

    const totalFavPages = Math.ceil(
        favoriteProducts.length / itemsPerPageFav
    );

    const paginatedFavProducts = useMemo(() => {
        const start =
            (currentFavPage - 1) * itemsPerPageFav;

        return favoriteProducts.slice(
            start,
            start + itemsPerPageFav
        );
    }, [
        favoriteProducts,
        currentFavPage,
        itemsPerPageFav
    ]);

    function toggleFavorite(id: number) {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }

    function toggleCompare(id: number) {
        setMessage(null);

        if (compare.includes(id)) {
            setCompare(prev =>
                prev.filter(item => item !== id)
            );

            return;
        }

        if (compare.length >= 3) {
            setMessage({
                type: 'error',
                text: 'You can compare only 3 products.'
            });

            return;
        }

        setCompare(prev => [...prev, id]);
    }

    function resetFilters() {
        setSearch('');
        setCategory('all');
        setInStockOnly(false);
        setDiscountOnly(false);
        setSortBy('');
    }

    if (loading) {
        return (
            <p className="status">
                Loading products...
            </p>
        );
    }

    if (error) {
        return (
            <p className="status error">
                {error}
            </p>
        );
    }

    return (
        <div className="app">
            <Header
                productsCount={products.length}
            />

            <NavigationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                favoritesCount={favorites.length}
                compareCount={compare.length}
            />

            <main className="tab-content">
                {activeTab === 'main' && (
                    <MainPage
                        search={search}
                        setSearch={setSearch}
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                        inStockOnly={inStockOnly}
                        setInStockOnly={
                            setInStockOnly
                        }
                        discountOnly={discountOnly}
                        setDiscountOnly={
                            setDiscountOnly
                        }
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        resetFilters={resetFilters}
                        filteredProducts={
                            filteredProducts
                        }
                        paginatedProducts={
                            paginatedProducts
                        }
                        favorites={favorites}
                        compare={compare}
                        onToggleFavorite={
                            toggleFavorite
                        }
                        onToggleCompare={
                            toggleCompare
                        }
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={
                            setItemsPerPage
                        }
                        currentPage={
                            currentMainPage
                        }
                        totalPages={totalMainPages}
                        setCurrentPage={
                            setCurrentMainPage
                        }
                    />
                )}

                {activeTab === 'favorites' && (
                    <FavoritesPage
                        favoriteProducts={
                            favoriteProducts
                        }
                        paginatedProducts={
                            paginatedFavProducts
                        }
                        favorites={favorites}
                        compare={compare}
                        onToggleFavorite={
                            toggleFavorite
                        }
                        onToggleCompare={
                            toggleCompare
                        }
                        itemsPerPage={
                            itemsPerPageFav
                        }
                        setItemsPerPage={
                            setItemsPerPageFav
                        }
                        currentPage={currentFavPage}
                        totalPages={totalFavPages}
                        setCurrentPage={
                            setCurrentFavPage
                        }
                    />
                )}

                {activeTab === 'compare' && (
                    <ComparePage
                        products={compareProducts}
                        onRemove={toggleCompare}
                    />
                )}

                <MessageBox
                    message={message}
                    onClose={() => setMessage(null)}
                />
            </main>
        </div>
    );
}

export default App;