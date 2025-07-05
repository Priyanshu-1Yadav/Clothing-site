import React from 'react';
import './cartSummary.css';
import Coupon from './coupon';
import ShippingAddress from './shippingAddresses';

const CartSummary = ({ totalItems, subtotal, shippingCost, discount, totalPrice }) => {
  return (
    <>
      <div className="cart-summary">
        <ShippingAddress />

        <h2>Summary</h2>
        <div className="summary-row">
          <span>ITEMS {totalItems}</span>
          <span>INR {subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>SHIPPING</span>
          <span>INR {shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>DISCOUNT</span>
          <span>INR {discount.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>TOTAL</span>
          <span>INR {totalPrice.toFixed(2)}</span>
        </div>

        <Coupon />
      </div>
    </>
  );
};

export default CartSummary;
