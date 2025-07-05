import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './cartItems';
import CartSummary from './cartSummary';
import './cart.css';
import { useVariableContext } from '../../context/VariableContext';
import useGetCartItems from '../../hooks/useGetCartItems';
import { usePostOrders } from '../../hooks/usePostOrders';

export default function Cart() {
    const { cartItems, couponDiscount, token } = useVariableContext();
    const { loading, error } = useGetCartItems();
    const { createNewOrder, successMsg, loading: orderLoading, error: orderError } = usePostOrders();

    if (loading) {
        return <div>Loading cart items...</div>;
    }

    if (error) {
        return <div>Error fetching cart items: {error}</div>;
    }

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => item ? sum + item.price * item.quantity : sum, 0);
    const shippingCost = totalItems !== 0 ? 99 : 0;
    const totalPrice = subtotal + shippingCost - couponDiscount;

    const handleCheckout = () => {
        createNewOrder(cartItems, subtotal, totalPrice, shippingCost, couponDiscount );
    };

    return (
        <div className="cart-container">
            <div className="cart-items-container">
                <h1>Shopping Cart <span>{totalItems} items</span></h1>
                <div className="cart-items">
                    {totalItems === 0 ? (
                        <div>Your cart is empty!</div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem key={item.id} itemId={item.id} /> // Pass only item ID
                        ))
                    )}
                </div>
                <button className="back-to-shop">
                    <span className="back-to-shop-text">
                        <a href="/">← Back to shop</a>
                    </span>
                </button>
            </div>

            <div className="cart-summary-container">
                <CartSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    discount={couponDiscount}
                    totalPrice={totalPrice}
                />
                {orderError && <div className="error">{orderError}</div>}
                {successMsg && <div className="success">{successMsg}</div>}
                <Link to="/confirmation">
                    <button className="checkout-button" onClick={handleCheckout} disabled={orderLoading}>
                        {orderLoading ? "Processing..." : "MAKE PAYMENT"}
                    </button>
                </Link>
            </div>
        </div>
    );
}
