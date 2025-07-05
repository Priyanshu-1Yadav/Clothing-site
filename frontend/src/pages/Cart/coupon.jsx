import React, { useState } from 'react';
import './cartSummary.css';
import { useVariableContext } from '../../context/VariableContext';

const Coupon = () => {
  const { couponDiscount, setCouponDiscount } = useVariableContext();
  const [couponCode, setCouponCode] = useState("");
  const isCouponApplied = couponDiscount > 0;

  const applyCoupon = () => {
    if (couponCode.trim() === "DISCOUNT10") {
      setCouponDiscount(10);
    } else {
      alert("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setCouponCode("");
  };

  return (
    <div className="coupon-section">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Coupon code"
        className="coupon-input"
      />
      {isCouponApplied ? (
        <button onClick={removeCoupon} className="remove-coupon-button">Remove Coupon</button>
      ) : (
        <button onClick={applyCoupon} className="apply-coupon-button">Apply</button>
      )}
    </div>
  );
};

export default Coupon;
