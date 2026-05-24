import { Product } from '../types/product';
import ProductGrid from './ProductGrid';

interface Props {
    products: Product[];
    favorites: number[];
    compare: number[];
    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;
}

function FavoritesSection({
                              products,
                              favorites,
                              compare,
                              onToggleFavorite,
                              onToggleCompare,
                          }: Props) {
    return (
        <section className="section">
            <h2>Favorites</h2>

            {products.length === 0 ? (
                <p>No favorite products yet.</p>
            ) : (
                <ProductGrid
                    products={products}
                    favorites={favorites}
                    compare={compare}
                    onToggleFavorite={onToggleFavorite}
                    onToggleCompare={onToggleCompare}
                />
            )}
        </section>
    );
}

export default FavoritesSection;