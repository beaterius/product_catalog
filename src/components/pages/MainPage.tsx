import SearchBar from '../SearchBar';
import Filters from '../Filters';
import ProductGrid from '../ProductGrid';
import Pagination from '../pagination/Pagination';
import ItemsPerPageSelect from '../pagination/ItemsPerPageSelect';

import { Product } from '../../types/product';

type MainPageProps = {
    search: string;
    setSearch: (value: string) => void;

    categories: string[];
    category: string;
    setCategory: (value: string) => void;

    inStockOnly: boolean;
    setInStockOnly: (value: boolean) => void;

    discountOnly: boolean;
    setDiscountOnly: (value: boolean) => void;

    sortBy: string;
    setSortBy: (value: string) => void;

    resetFilters: () => void;

    filteredProducts: Product[];
    paginatedProducts: Product[];

    favorites: number[];
    compare: number[];

    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;

    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;

    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
};

function MainPage({
                      search,
                      setSearch,

                      categories,
                      category,
                      setCategory,

                      inStockOnly,
                      setInStockOnly,

                      discountOnly,
                      setDiscountOnly,

                      sortBy,
                      setSortBy,

                      resetFilters,

                      filteredProducts,
                      paginatedProducts,

                      favorites,
                      compare,

                      onToggleFavorite,
                      onToggleCompare,

                      itemsPerPage,
                      setItemsPerPage,

                      currentPage,
                      totalPages,
                      setCurrentPage
                  }: MainPageProps) {
    return (
        <div className="page-fade">
            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <Filters
                categories={categories}
                category={category}
                setCategory={setCategory}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                discountOnly={discountOnly}
                setDiscountOnly={setDiscountOnly}
                sortBy={sortBy}
                setSortBy={setSortBy}
                resetFilters={resetFilters}
            />

            {filteredProducts.length === 0 ? (
                <p className="status">
                    No products match current filters.
                </p>
            ) : (
                <>
                    <ProductGrid
                        products={paginatedProducts}
                        favorites={favorites}
                        compare={compare}
                        onToggleFavorite={onToggleFavorite}
                        onToggleCompare={onToggleCompare}
                    />

                    <div className="paginationWrapper">
                        <ItemsPerPageSelect
                            value={itemsPerPage}
                            options={[8, 16, 24]}
                            onChange={setItemsPerPage}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default MainPage;