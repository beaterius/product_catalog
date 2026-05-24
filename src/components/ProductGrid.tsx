import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface Props {
    products: Product[];
    favorites: number[];
    compare: number[];
    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;
}

function ProductGrid({
                         products,
                         favorites,
                         compare,
                         onToggleFavorite,
                         onToggleCompare,
                     }: Props) {
    return (
        <section className="favoritesGrid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    isCompared={compare.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onToggleCompare={onToggleCompare}
                />
            ))}

        </section>
    );
}

export default ProductGrid;