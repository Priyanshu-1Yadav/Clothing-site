import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVariableContext } from '../../context/VariableContext';
import './orders.css';
import useGetOrders from '../../hooks/useGetOrders';

const Orders = () => {
  const { loading, error, orders } = useGetOrders();
  const navigate = useNavigate();
  const {host} = useVariableContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const navigateToOrderDetails = (order) => {
    navigate('/orderdetails', { state: { order } });
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='order-container'>
      <h2>My Orders</h2>
      <div className='order-list'>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className='order-item'>
              <div className='order-summary' onClick={() => navigateToOrderDetails(order)}>
                <div className='order-id-container'>
                  <p>Order ID: {order._id}</p>
                  <div className="order-preview">
                    {order.orderedItems.slice(0, 2).map((item, index) => (
                      <img key={index} src={`${host}/${item.images[0]}`} alt={item.name} className='order-preview-img' />
                    ))}
                  </div>
                </div>

                <div className='order-status-container'>
                  <div className='order-status-labels'>
                    <p>Order At:</p>
                    <p>Order Status:</p>
                    <p>Items:</p>
                    <p>Price:</p>
                  </div>
                  <div className='order-status-values'>
                    <p>{formatDate(order.date)}</p> {/* Format and display date */}
                    <p>{order.orderStatus}</p>
                    <p>{order.orderedItems.length} Items Purchased</p>
                    <p>₹{order.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
