import { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/product';
import { fetchProducts } from '../services/fetchProducts';

const ITEMS_PER_PAGE = 8;

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [discountOnly, setDiscountOnly] = useState(false);
    const [sortBy, setSortBy] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);

                const products = await fetchProducts();

                setProducts(products);
                setError('');
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load products.'
                );
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, inStockOnly, discountOnly, sortBy]);

    const categories = useMemo(() => {
        return [...new Set(products.map(p => p.category))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        const searchLower = search.toLowerCase();

        return [...products]
            .filter(product => {
                const matchesSearch =
                    product.title.toLowerCase().includes(searchLower) ||
                    product.brand?.toLowerCase().includes(searchLower) ||
                    product.category.toLowerCase().includes(searchLower);

                const matchesCategory =
                    category === 'all' || product.category === category;

                const matchesStock =
                    !inStockOnly || product.stock > 0;

                const matchesDiscount =
                    !discountOnly || product.discountPercentage > 0;

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
                        return a.title.localeCompare(b.title);
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
        sortBy,
    ]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    }, [filteredProducts]);

    const paginatedProducts = useMemo(() => {
        const startIndex =
            (currentPage - 1) * ITEMS_PER_PAGE;

        return filteredProducts.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    function resetFilters() {
        setSearch('');
        setCategory('all');
        setInStockOnly(false);
        setDiscountOnly(false);
        setSortBy('');
        setCurrentPage(1);
    }

    return {
        products,
        filteredProducts: paginatedProducts,
        totalFilteredCount: filteredProducts.length,
        categories,
        loading,
        error,
        search,
        setSearch,
        category,
        setCategory,
        inStockOnly,
        setInStockOnly,
        discountOnly,
        setDiscountOnly,
        sortBy,
        setSortBy,
        currentPage,
        totalPages,
        setCurrentPage,
        resetFilters,
    };
}