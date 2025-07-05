import React, { useState } from 'react';
import './editCoupons.css';
import { useVariableContext } from '../../../context/VariableContext';

export default function EditCoupons({ coupon, onClose }) {

    const { host, token } = useVariableContext();

    const [formData, setFormData] = useState({
        couponType: coupon?.couponType || '',
        discountAmount: coupon?.discountAmount || '',
        discountPercentage: coupon?.discountPercentage || '',
        expiryDate: coupon?.expiryDate
            ? new Date(coupon.expiryDate).toISOString().split('T')[0]
            : '',
        minimumItemQuantity: coupon?.minimumItemQuantity || '',
        minPurchaseAmount: coupon?.minPurchaseAmount || '',
        maxDiscountAmount: coupon?.maxDiscountAmount || '',
        usageLimit: coupon?.usageLimit || '',
        userLimit: coupon?.userLimit || '',
        isActive: coupon?.isActive || false,
        description: coupon?.description || '',
    });

    const [message, setMessage] = useState({ text: '', type: '' }); // For feedback messages

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndpoint = `${host}/admin/editcoupon/${coupon.couponCode}`;
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage({ text: 'Coupon updated successfully!', type: 'success' });
                setTimeout(onClose, 1500); // Close popup after showing success message
            } else {
                setMessage({ text: 'Error updating coupon. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('API call failed:', error);
            setMessage({ text: 'Error updating coupon. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Edit Coupon : {coupon.couponCode}</h2>
                <form onSubmit={handleSubmit}>
                    {/* <label>
                        Coupon Code:
                        <input
                            type="text"
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleChange}
                            required
                        />
                    </label> */}
                    <label>
                        Coupon Type:
                        <input
                            type="text"
                            name="couponType"
                            value={formData.couponType}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Discount Amount:
                        <input
                            type="number"
                            name="discountAmount"
                            value={formData.discountAmount}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Discount Percentage:
                        <input
                            type="number"
                            name="discountPercentage"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Expiry Date:
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Minimum Item Quantity:
                        <input
                            type="number"
                            name="minimumItemQuantity"
                            value={formData.minimumItemQuantity}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Min Purchase Amount:
                        <input
                            type="number"
                            name="minPurchaseAmount"
                            value={formData.minPurchaseAmount}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Max Discount Amount:
                        <input
                            type="number"
                            name="maxDiscountAmount"
                            value={formData.maxDiscountAmount}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Usage Limit:
                        <input
                            type="number"
                            name="usageLimit"
                            value={formData.usageLimit}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        User Limit:
                        <input
                            type="number"
                            name="userLimit"
                            value={formData.userLimit}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Is Active:
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    {message.text && (
                        <p className={`message ${message.type}`}>
                            {message.text}
                        </p>
                    )}
                    <button type="submit" className="submit-button">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
