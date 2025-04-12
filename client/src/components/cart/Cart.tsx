import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
    incrementQuantity,
    decrementQuantity,
    removeItem,
    fetchCartAsync,
    updateItemQuantitytAsync,
    removeItemFromCarttAsync
} from '../../store/slice/cartSlice'
import './css/cart.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Spinner from '../common/Spinner';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCartAsync());
    }, [dispatch]);

    const handleIncrement = (id: string) => {
        const item = items.find(item => item.id === id);
        if (item) {
            // Optimistic UI update
            dispatch(incrementQuantity(id));
            // Server sync
            dispatch(updateItemQuantitytAsync({ productId: id, quantity: item.quantity + 1 }));
        }
    };

    const handleDecrement = (id: string) => {
        const item = items.find(item => item.id === id);
        if (item && item.quantity > 1) {
            // Optimistic UI update
            dispatch(decrementQuantity(id));
            // Server sync
            dispatch(updateItemQuantitytAsync({ productId: id, quantity: item.quantity - 1 }));
        }
    };

    const handleRemove = (id: string) => {
        // Optimistic UI update
        dispatch(removeItem(id));
        // Server sync
        dispatch(removeItemFromCarttAsync({ productId: id }));
    };

    // Calculate total price
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Calculate total items
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    if (loading && items.length === 0) {
        return <Spinner />;
    }

    return (
        <div className="cart-container">
            {loading && <div className="cart-overlay"><Spinner /></div>}
            <div className="cart-items">
                {items.length > 0 ? items.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <div className="item-image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item-details">
                            <h3>{item.title}</h3>
                            <p className="item-price">₹{item.price}</p>
                            <div className="item-quantity">
                                <button onClick={() => handleDecrement(item.id)} disabled={item.quantity <= 1}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item.id)}>+</button>
                            </div>
                        </div>
                        <button className="remove-button" onClick={() => handleRemove(item.id)}>
                            <ClearOutlinedIcon fontSize='small' />
                        </button>
                    </div>
                )) : <div className="cart-item-not-found">No Items in Cart</div>
                }
            </div>

            <div className="cart-summary">
                <h3>Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h3>
                <p className="summary-line">
                    Order Value <span>₹{total.toFixed(2)}</span>
                </p>
                <hr />
                <p className="summary-total">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </p>
                <button className="continue-button" disabled={items.length === 0 || loading}>Continue</button>
            </div>
        </div>
    );
};

export default Cart;