import React, { useState } from 'react';
import './addCoupons.css';
import usePostCoupon from '../../../hooks/Admin/usePostCoupons';

export default function AddCoupons() {
    const initialCouponState = {
        couponCode: '',
        couponType: 'percentage', // default type
        discountAmount: 0,
        discountPercentage: 0,
        expiryDate: '',
        minimumItemQuantity: 1,
        minPurchaseAmount: 0,
        maxDiscountAmount: 0,
        isActive: true,
        usageLimit: 1,
        userLimit: 1,
        description: '',
    };

    const [coupon, setCoupon] = useState(initialCouponState);
    const { postCoupon, loading, error, success } = usePostCoupon(coupon);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCoupon({
            ...coupon,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postCoupon();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="add-coupon-container">
            <h2 className="add-coupon-title">Add New Coupon</h2>
            <form className="add-coupon-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="couponCode" className="form-label">Coupon Code</label>
                    <input
                        type="text"
                        id="couponCode"
                        name="couponCode"
                        value={coupon.couponCode}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Coupon Type</label>
                    <select
                        name="couponType"
                        value={coupon.couponType}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="percentage">Percentage</option>
                        <option value="flat">Flat Amount</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="discountAmount" className="form-label">Discount Amount</label>
                    <input
                        type="number"
                        id="discountAmount"
                        name="discountAmount"
                        value={coupon.discountAmount}
                        onChange={handleChange}
                        min="0"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={coupon.discountPercentage}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        value={coupon.expiryDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="minPurchaseAmount" className="form-label">Min Purchase Amount</label>
                    <input
                        type="number"
                        id="minPurchaseAmount"
                        name="minPurchaseAmount"
                        value={coupon.minPurchaseAmount}
                        onChange={handleChange}
                        min="0"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usageLimit" className="form-label">Usage Limit</label>
                    <input
                        type="number"
                        id="usageLimit"
                        name="usageLimit"
                        value={coupon.usageLimit}
                        onChange={handleChange}
                        min="1"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="userLimit" className="form-label">Per User Limit</label>
                    <input
                        type="number"
                        id="userLimit"
                        name="userLimit"
                        value={coupon.userLimit}
                        onChange={handleChange}
                        min="1"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="minimumItemQuantity" className="form-label">Minimum Item Quantity</label>
                    <input
                        type="number"
                        id="minimumItemQuantity"
                        name="minimumItemQuantity"
                        value={coupon.minimumItemQuantity}
                        onChange={handleChange}
                        min="1"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={coupon.description}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isActive" className="form-label">Active</label>
                    <label>True</label>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={coupon.isActive}
                        onChange={handleChange}
                        className="form-checkbox"
                    />
                </div>

                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? "Creating Coupon..." : "Create Coupon"}
                </button>
            </form>

            {/* Show success message */}
            {success && <div className="success-message">Coupon created successfully!</div>}
            
            {/* Show error message */}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
