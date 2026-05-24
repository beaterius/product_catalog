import FavoritesSection from '../FavoritesSection';
import Pagination from '../pagination/Pagination';
import ItemsPerPageSelect from '../pagination/ItemsPerPageSelect';

import { Product } from '../../types/product';

type FavoritesPageProps = {
    favoriteProducts: Product[];
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

function FavoritesPage({
                           favoriteProducts,
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
                       }: FavoritesPageProps) {
    return (
        <div className="page-fade">
            <div className="page-header-box">
                <h2>⭐ Your Favorite Items</h2>

                <p>
                    Here are the products you saved
                    for later.
                </p>
            </div>

            {favoriteProducts.length === 0 ? (
                <p className="status">
                    Your favorites list is empty.
                    Go add some products!
                </p>
            ) : (
                <>
                    <FavoritesSection
                        products={paginatedProducts}
                        favorites={favorites}
                        compare={compare}
                        onToggleFavorite={onToggleFavorite}
                        onToggleCompare={onToggleCompare}
                    />

                    <div className="paginationWrapper">
                        <ItemsPerPageSelect
                            value={itemsPerPage}
                            options={[4, 8, 12]}
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

export default FavoritesPage;