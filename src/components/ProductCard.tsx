import { Product } from '../types/product';

interface Props {
    product: Product;
    isFavorite: boolean;
    isCompared: boolean;
    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;
}

function ProductCard({
                         product,
                         isFavorite,
                         isCompared,
                         onToggleFavorite,
                         onToggleCompare,
                     }: Props) {
    return (
        <article className="card">
            <img
                src={product.thumbnail}
                alt={`${product.title} product image`}
                className="cardImage"
            />

            <div className="cardContent">
                <h2 style={{ height: '50px', textAlign:"center" }}>{product.title}</h2>
                <p>
                    <strong>Brand:</strong> {product.brand || 'Unknown'}
                </p>

                <p>
                    <strong>Category:</strong> {product.category}
                </p>

                <p>
                    <strong>Price:</strong> ${product.price}
                </p>

                <p>
                    <strong>Discount:</strong>{' '}
                    {product.discountPercentage.toFixed(2)}%
                </p>

                <p>
                    <strong>Rating:</strong> {product.rating}
                </p>

                <p>
                    <strong>Status:</strong>{' '}
                    {product.stock > 0 ? 'In stock' : 'Out of stock'}
                </p>

                <div className="actions">
                    <button
                        aria-pressed={isFavorite}
                        onClick={() => onToggleFavorite(product.id)}
                    >
                        {isFavorite ? '★ In Favorites' : '☆ Add favorite'}
                    </button>

                    <button
                        aria-pressed={isCompared}
                        onClick={() => onToggleCompare(product.id)}
                    >
                        {isCompared ? 'Remove' : 'Compare'}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;