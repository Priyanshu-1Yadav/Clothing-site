import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state
import { useVariableContext } from '../../context/VariableContext';
import './orderdetails.css';

const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Access the passed order from state
  const {host} = useVariableContext();

  if (!order) {
    return <p>No order details available.</p>;
  }
  // console.log(order);

  const formatShippingAddress = () => {
    const { addressLine1, addressLine2, city, state, postalCode } = order.shippingAddress;
    return `${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}`;
  };

  return (
    <div className='order-details'>
      <h4>Order Details</h4>
      <p>Status: {order.orderStatus}</p>

      <div className='products-container'>
        <h4>Products</h4>
        {order.orderedItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <ul className='products-list'>
            {order.orderedItems.map((item, index) => (
              <li key={index} className='cart-item'>
                <div className='cart-item-details'>
                  <img src={`${host}/${item.images[0]}`} alt={item.name} className='cart-item-img' />
                  <div>
                    <p>Item: {item.name}</p>
                    <p>Price: INR {item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='shipping-details'>
        <h4>Shipping Details</h4>
        <div className='shipping-info'>
          <div className='shipping-info-labels'>
            <p>Shipping Date</p>
            <p>Tracking Id</p>
            <p>Shipping</p>
            <p>Address</p>
          </div>
          <div className='shipping-info-values'>
            <p>12/01/2024</p>
            <p>1234567890</p>
            <p>India Post</p>
            <p>{formatShippingAddress()}</p>
          </div>
        </div>
      </div>

      <div className='payment-details'>
        <h4>Payment Details</h4>
        <div className='payment-info'>
          <div className='payment-info-labels'>
            <p>Items</p>
            <p>Coupon</p>
            <p>Shipping</p>
          </div>
          <div className='payment-info-values'>
            <p>₹{order.subtotal}</p>
            <p>₹{order.discountedAmount}</p>
            <p>₹{order.totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
