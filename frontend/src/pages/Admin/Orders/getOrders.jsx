import React, { useState } from 'react';
import './getOrders.css';
import useGetOrders from '../../../hooks/Admin/useGetOrders';
import EditOrders from './editOrders';

export default function GetOrders() {
    const { orders, loading, error } = useGetOrders();
    const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
    const [isEditing, setIsEditing] = useState(false); // State for edit popup visibility

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setIsEditing(true);
    };

    const closeEditPopup = () => {
        setSelectedOrder(null);
        setIsEditing(false);
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <h2>Orders List</h2>
            {orders?.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>User Email</th>
                            <th>Ordered Items</th>
                            <th>Items Count</th>
                            <th>Total Price</th>
                            <th>Payment Status</th>
                            <th>Shipping Address</th>
                            <th>Order Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td data-label="Order ID">{order.orderId}</td>
                                <td data-label="Order Date">{order.date}</td>
                                <td data-label="User Email">{order.userEmail}</td>
                                <td data-label="Ordered Items">
                                    {(order.orderedItems.map((item) => (
                                    <div key={item._id}>
                                       ● {item.id} x {item.name} x {item.quantity}
                                    </div>))
                                    )}

                                </td>
                                <td data-label="Items Count">{order.orderedItems.length}</td>
                                <td data-label="Total Price">{order.totalPrice}</td>
                                <td data-label="Payment Status">{order.paymentStatus}</td>
                                <td data-label="Shipping Address">{order.shippingAddress.name},
                                {order.shippingAddress.mobileNumber},<br/>
                                {order.shippingAddress.addressLine1},
                                {order.shippingAddress.addressLine2},<br/>
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},<br/>
                                {order.shippingAddress.state}
                                </td>
                                <td data-label="Order Status">{order.orderStatus}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(order)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && !error && <p>No orders found</p>
            )}
            {isEditing && (
                <EditOrders order={selectedOrder} onClose={closeEditPopup} />
            )}
        </div>
    );
}
