import { Link } from 'react-router-dom';
import './css/latestProducts.css'

const LatestProducts: React.FC = () => {
    // Sample data for latest products
    const latestProducts = [
        { id: 1, name: 'Wireless Headphones', price: 89.99, image: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858916/samples/shoe.jpg', category: 'Electronics' },
        { id: 2, name: 'Smartphone Case', price: 19.99, image: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858916/samples/shoe.jpg', category: 'Accessories' },
        { id: 3, name: 'Smart Watch', price: 199.99, image: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858916/samples/shoe.jpg', category: 'Electronics' },
        { id: 4, name: 'Running Shoes', price: 79.99, image: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858916/samples/shoe.jpg', category: 'Footwear' },
        { id: 5, name: 'Bluetooth Speaker', price: 59.99, image: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858916/samples/shoe.jpg', category: 'Electronics' },
        { id: 6, name: 'Laptop Backpack', price: 49.99, image: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858916/samples/shoe.jpg', category: 'Accessories' },
    ];

    return (
        <section className="latest-products">
            <div className="container">
                <h2 className="section-title">Latest Products</h2>
                <div className="products-grid">
                    {latestProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                <div className="product-badge">NEW</div>
                            </div>
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-footer">
                                    <span className="product-price">${product.price}</span>
                                    <button className="add-to-cart-btn">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-all">
                    <Link to="/products" className="view-all-btn">View All Products</Link>
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;
