import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
    fetchProductById,
    addProductRatingAsync,
    clearCurrentProduct
} from '../store/slice/productSlice';
import StarRating from '../components/product/StarRating';
import { Rating } from '../types/productTypes';
import './css/productDetail.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentProduct, loading, error } = useAppSelector(state => state.product);
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    const [activeImage, setActiveImage] = useState<number>(0);
    const [userRating, setUserRating] = useState<number>(0);
    const [userComment, setUserComment] = useState<string>('');
    const [ratingSubmitting, setRatingSubmitting] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);


    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }

        // Cleanup on component unmount
        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (currentProduct && isAuthenticated) {
            // Check if user has already rated
            const existingRating = currentProduct.ratings?.find(r =>
                typeof r.user === 'string'
                    ? r.user === user?.id
                    : r.user === user?.id
            );

            if (existingRating) {
                setUserRating(existingRating.rating);
                setUserComment(existingRating.comment || '');
            }
        }
    }, [currentProduct, isAuthenticated]);

    const handleImageChange = (index: number) => {
        setActiveImage(index);
    };

    const handleRatingChange = (rating: number) => {
        setUserRating(rating);
    };

    const handleRatingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !userRating) return;

        setRatingSubmitting(true);
        try {
            await dispatch(addProductRatingAsync({
                productId: id,
                userId: user?.id || "Anonymous",
                rating: userRating,
                comment: userComment
            })).unwrap();

            alert('Rating submitted successfully!');
        } catch (err) {
            alert('Failed to submit rating. Please try again.');
        } finally {
            setRatingSubmitting(false);
        }
    };

    const handleAddToCart = () => {
        if (!currentProduct) return;
        // Implement cart functionality
        alert(`Added ${quantity} ${currentProduct.name} to cart!`);
    };

    const handleBuyNow = () => {
        if (!currentProduct) return;
        // Implement checkout functionality
        alert(`Proceeding to checkout with ${quantity} ${currentProduct.name}`);
        // navigate('/checkout', { state: { products: [{ ...currentProduct, quantity }] } });
    };

    const incrementQuantity = () => {
        if (currentProduct && quantity < currentProduct.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) {
        return <div className="ecommerce-product-detail-loading">Loading product details...</div>;
    }

    if (error) {
        return <div className="ecommerce-product-detail-error">{error}</div>;
    }

    if (!currentProduct) {
        return <div className="ecommerce-product-detail-error">Product not found</div>;
    }

    // Convert specifications Map to object for rendering
    const specifications: Record<string, string> = {};
    if (currentProduct.specifications) {
        if (currentProduct.specifications instanceof Map) {
            currentProduct.specifications.forEach((value: any, key: any) => {
                specifications[key] = value;
            });
        } else if (typeof currentProduct.specifications === 'object') {
            // Handle case where it might come as object from API
            Object.assign(specifications, currentProduct.specifications);
        }
    }

    // Format date for display
    const formatDate = (date: Date | string): string => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isOutOfStock = currentProduct.stock <= 0;

    return (
        <div className="ecommerce-product-detail-container">
            <button
                onClick={() => navigate(-1)}
                className="ecommerce-product-detail-back-button"
            >
                ← Back to Products
            </button>

            <div className="ecommerce-product-detail-content">
                <div className="ecommerce-product-detail-images">
                    <div className="ecommerce-product-detail-main-image">
                        {currentProduct.images && currentProduct.images.length > 0 ? (
                            <img
                                src={currentProduct.images[activeImage]}
                                alt={currentProduct.name}
                            />
                        ) : (
                            <div className="ecommerce-product-detail-no-image">No Image Available</div>
                        )}
                    </div>

                    {currentProduct.images && currentProduct.images.length > 1 && (
                        <div className="ecommerce-product-detail-thumbnails">
                            {currentProduct.images.map((img: string, index: number) => (
                                <div
                                    key={index}
                                    className={`ecommerce-product-detail-thumbnail ${activeImage === index ? 'active' : ''}`}
                                    onClick={() => handleImageChange(index)}
                                >
                                    <img src={img} alt={`${currentProduct.name} - view ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="ecommerce-product-detail-info">
                    <h1 className="ecommerce-product-detail-name">{currentProduct.name}</h1>

                    <div className="ecommerce-product-detail-meta">
                        <div className="ecommerce-product-detail-category">
                            Category: <span>{currentProduct.category}</span>
                            {currentProduct.subcategory && (
                                <> | Subcategory: <span>{currentProduct.subcategory}</span></>
                            )}
                        </div>

                        {currentProduct.brand && (
                            <div className="ecommerce-product-detail-brand">
                                Brand: <span>{currentProduct.brand}</span>
                            </div>
                        )}
                    </div>

                    <div className="ecommerce-product-detail-rating-price">
                        <div className="ecommerce-product-detail-price">
                            <span className="ecommerce-product-detail-current-price">${currentProduct.price.toFixed(2)}</span>
                        </div>

                        <div className="ecommerce-product-detail-rating-display">
                            <StarRating
                                rating={currentProduct.averageRating || 0}
                                readOnly
                                size="medium"
                            />
                            <span className="ecommerce-product-detail-rating-count">
                                ({currentProduct.ratings?.length || 0} reviews)
                            </span>
                        </div>
                    </div>

                    <div className={`ecommerce-product-detail-stock ${currentProduct.stock < 10 ? 'low-stock' : ''}`}>
                        {currentProduct.stock > 0
                            ? `In Stock (${currentProduct.stock} available)`
                            : 'Out of Stock'}
                    </div>

                    {!isOutOfStock && (
                        <div className="ecommerce-product-detail-quantity">
                            <span className="ecommerce-product-detail-quantity-label">Quantity:</span>
                            <div className="ecommerce-product-detail-quantity-controls">
                                <button
                                    onClick={decrementQuantity}
                                    className="ecommerce-product-detail-quantity-btn"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={currentProduct.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.min(currentProduct.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                    className="ecommerce-product-detail-quantity-input"
                                />
                                <button
                                    onClick={incrementQuantity}
                                    className="ecommerce-product-detail-quantity-btn"
                                    disabled={quantity >= currentProduct.stock}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="ecommerce-product-detail-actions">
                        <button
                            className="ecommerce-product-detail-cart-btn"
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="ecommerce-product-detail-buy-btn"
                            onClick={handleBuyNow}
                            disabled={isOutOfStock}
                        >
                            Buy Now
                        </button>
                    </div>

                    <div className="ecommerce-product-detail-description">
                        <h3>Description</h3>
                        <p>{currentProduct.description}</p>
                    </div>

                    {currentProduct.tags && currentProduct.tags.length > 0 && (
                        <div className="ecommerce-product-detail-tags">
                            <h3>Tags</h3>
                            <div className="ecommerce-product-detail-tags-list">
                                {currentProduct.tags.map((tag: string, index: number) => (
                                    <span key={index} className="ecommerce-product-detail-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {Object.keys(specifications).length > 0 && (
                        <div className="ecommerce-product-detail-specs">
                            <h3>Specifications</h3>
                            <table>
                                <tbody>
                                    {Object.entries(specifications).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="ecommerce-product-detail-spec-name">{key}</td>
                                            <td className="ecommerce-product-detail-spec-value">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="ecommerce-product-detail-dates">
                        <p className="ecommerce-product-detail-date-info">
                            Listed on: {formatDate(currentProduct.createdAt)}
                            {currentProduct.updatedAt && (
                                <> | Last updated: {formatDate(currentProduct.updatedAt)}</>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {isAuthenticated && (
                <div className="ecommerce-product-detail-user-rating">
                    <h3>Leave Your Rating</h3>
                    <form onSubmit={handleRatingSubmit}>
                        <div className="ecommerce-product-detail-rating-input">
                            <label>Your Rating:</label>
                            <StarRating
                                rating={userRating}
                                onChange={handleRatingChange}
                                size="large"
                            />
                        </div>

                        <div className="ecommerce-product-detail-comment-input">
                            <label htmlFor="comment">Your Review (optional):</label>
                            <textarea
                                id="comment"
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                placeholder="Share your experience with this product..."
                                rows={4}
                            />
                        </div>

                        <button
                            type="submit"
                            className="ecommerce-product-detail-submit-btn"
                            disabled={!userRating || ratingSubmitting}
                        >
                            {ratingSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            )}

            {currentProduct.ratings && currentProduct.ratings.length > 0 && (
                <div className="ecommerce-product-detail-reviews">
                    <h2>Customer Reviews</h2>
                    <div className="ecommerce-product-detail-reviews-list">
                        {currentProduct.ratings.map((review: Rating, index: number) => (
                            <div key={index} className="ecommerce-product-detail-review">
                                <div className="ecommerce-product-detail-review-header">
                                    <StarRating rating={review.rating} readOnly size="small" />
                                    <span className="ecommerce-product-detail-reviewer-name">{review.createdBy || 'Anonymous'}</span>
                                    {review.createdAt && (
                                        <span className="ecommerce-product-detail-review-date">
                                            {formatDate(review.createdAt)}
                                        </span>
                                    )}
                                </div>
                                {review.comment && (
                                    <div className="ecommerce-product-detail-review-comment">{review.comment}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;