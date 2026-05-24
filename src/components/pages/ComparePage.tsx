import CompareTable from '../CompareTable';
import { Product } from '../../types/product';

type ComparePageProps = {
    products: Product[];
    onRemove: (id: number) => void;
};

function ComparePage({
                         products,
                         onRemove
                     }: ComparePageProps) {
    return (
        <div className="page-fade">
            <div className="page-header-box">
                <h2>📊 Compare Products</h2>

                <p>
                    Compare prices, ratings, and brands
                    side-by-side (Maximum 3 products).
                </p>
            </div>

            {products.length === 0 ? (
                <p className="status">
                    No products selected for comparison.
                </p>
            ) : (
                <CompareTable
                    products={products}
                    onRemove={onRemove}
                />
            )}
        </div>
    );
}

export default ComparePage;