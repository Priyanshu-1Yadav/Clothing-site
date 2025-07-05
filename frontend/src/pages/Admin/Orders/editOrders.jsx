import React, { useState } from 'react';
import { useVariableContext } from '../../../context/VariableContext';
import './editOrders.css';

export default function EditOrders({ order, onClose }) {

    const {host, token} = useVariableContext();

    const [formData, setFormData] = useState({
        paymentStatus: order?.paymentStatus || '',
        orderStatus: order?.orderStatus || '',
        shippingId: order?.shippingId || '', // New field for Shipping ID
    });

    const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        
        e.preventDefault();

        try {
            const response = await fetch(`${host}/admin/editorder/${order.orderId}`,{
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                ,
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage({ text: 'Order updated successfully!', type: 'success' });
                setTimeout(onClose, 1500); // Close popup after showing success message
            } else {
                setMessage({ text: 'Error updating order. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('API call failed:', error);
            setMessage({ text: 'Error updating order. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Edit Order</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Payment Status:
                        <select
                            name="paymentStatus"
                            value={formData.paymentStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </label>
                    <label>
                        Order Status:
                        <select
                            name="orderStatus"
                            value={formData.orderStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="Created">Created</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </label>
                    {formData.orderStatus === 'Shipped' && (
                        <label>
                            Shipping ID:
                            <input
                                type="text"
                                name="shippingId"
                                value={formData.shippingId}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    )}
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
