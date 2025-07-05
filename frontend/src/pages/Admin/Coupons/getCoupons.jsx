import React, { useState } from 'react';
import './getCoupons.css';
import useGetCoupons from '../../../hooks/Admin/useGetCoupons';
import EditCoupons from './editCoupons';

export default function Coupons() {
    const { coupons, loading, error } = useGetCoupons();
    const [selectedCoupon, setSelectedCoupon] = useState(null); // For the selected coupon to edit
    const [isEditing, setIsEditing] = useState(false); // Popup visibility

    const handleEdit = (coupon) => {
        setSelectedCoupon(coupon);
        setIsEditing(true);
    };

    const closeEditPopup = () => {
        setSelectedCoupon(null);
        setIsEditing(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Coupons</h2>
            <table className="coupons-table">
                <thead>
                    <tr>
                        <th>Coupon Code</th>
                        <th>Coupon Type</th>
                        <th>Discount Amount</th>
                        <th>Discount Percentage</th>
                        <th>Expiry Date</th>
                        <th>Min Item Quantity</th>
                        <th>Min Purchase Amount</th>
                        <th>Max Discount Amount</th>
                        <th>Usage Limit</th>
                        <th>User Limit</th>
                        <th>Is Active</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.length === 0 && (
                        <tr>
                            <td colSpan="13">No coupons available</td>
                        </tr>
                    )}
                    {coupons.map((coupon) => (
                        <tr key={coupon._id}>
                            <td data-label="Coupon Code">{coupon.couponCode}</td>
                            <td data-label="Coupon Type">{coupon.couponType}</td>
                            <td data-label="Discount Amount">{coupon.discountAmount}</td>
                            <td data-label="Discount Percentage">{coupon.discountPercentage}%</td>
                            <td data-label="Expiry Date">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                            <td data-label="Min Item Quantity">{coupon.minimumItemQuantity}</td>
                            <td data-label="Min Purchase Amount">{coupon.minPurchaseAmount}</td>
                            <td data-label="Max Discount Amount">{coupon.maxDiscountAmount}</td>
                            <td data-label="Usage Limit">{coupon.usageLimit}</td>
                            <td data-label="User Limit">{coupon.userLimit}</td>
                            <td data-label="Is Active">{coupon.isActive ? 'Yes' : 'No'}</td>
                            <td data-label="Description">{coupon.description || 'N/A'}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(coupon)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing && (
                <EditCoupons coupon={selectedCoupon} onClose={closeEditPopup} />
            )}
        </div>
    );
}
