// client/src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../../types/productTypes';
import './css/productCard.css';

interface ProductCardProps {
    product: Product;
    onProductClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    return (
        <div className="product-card" onClick={() => onProductClick(product._id)}>
            <div className="product-image">
                {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} />
                ) : (
                    <div className="no-image">No Image</div>
                )}
            </div>

            <div className="product-card-info">
                <h3 className="product-card-name">{product.name}</h3>

                <div className="product-card-meta">
                    <span className="product-card-category">{product.category}</span>
                    {product.brand && <span className="product-card-brand">{product.brand}</span>}
                </div>

                <div className="product-card-footer">
                    <span className="product-card-price">${product.price.toFixed(2)}</span>
                    <span className="product-card-rating">
                        {product.averageRating > 0 ? (
                            <>
                                <span className="star">★</span> {product.averageRating.toFixed(1)}
                            </>
                        ) : (
                            'No ratings'
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;