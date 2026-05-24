import React from 'react';
import { Product } from '../types/product';

interface Props {
    products: Product[];
    onRemove: (id: number) => void;
}

function CompareTable({ products, onRemove }: Props) {
    return (
        <section className="section">
            <h2>Compare Products</h2>

            {products.length === 0 ? (
                <p>No products selected for comparison.</p>
            ) : (
                <div className="tableWrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>{product.rating}</td>
                                <td>
                                    {product.stock > 0 ? 'In stock' : 'Out of stock'}
                                </td>
                                <td>{product.category}</td>
                                <td>{product.discountPercentage.toFixed(2)}%</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => onRemove(product.id)}
                                        style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default CompareTable;