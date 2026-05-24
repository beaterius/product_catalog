import { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/product';
import { fetchProducts } from '../services/fetchProducts';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [discountOnly, setDiscountOnly] = useState(false);
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (err: any) {
                setError(err.message || 'Не вдалося завантажити товари.');
            } finally {
                setLoading(false);
            }
        }
        void loadData();
    }, []);

    // useMemo для обробки сортування та фільтрації (filteredProducts)
    const filteredProducts = useMemo(() => {
        const searchLower = search.toLowerCase();
        return [...products]
            .filter(product => {
                const matchesSearch =
                    product.title.toLowerCase().includes(searchLower) ||
                    product.brand?.toLowerCase().includes(searchLower) ||
                    product.category.toLowerCase().includes(searchLower);
                const matchesCategory = category === 'all' || product.category === category;
                const matchesStock = !inStockOnly || product.stock > 0;
                const matchesDiscount = !discountOnly || product.discountPercentage > 0;

                return matchesSearch && matchesCategory && matchesStock && matchesDiscount;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc': return a.price - b.price;
                    case 'price-desc': return b.price - a.price;
                    case 'rating-desc': return b.rating - a.rating;
                    case 'title-asc': return a.title.localeCompare(b.title);
                    default: return 0;
                }
            });
    }, [products, search, category, inStockOnly, discountOnly, sortBy]);

    const categories = useMemo(() => {
        return [...new Set(products.map(product => product.category))];
    }, [products]);

    function resetFilters() {
        setSearch('');
        setCategory('all');
        setInStockOnly(false);
        setDiscountOnly(false);
        setSortBy('');
    }

    return {
        products,
        filteredProducts,
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
        resetFilters,
    };
}