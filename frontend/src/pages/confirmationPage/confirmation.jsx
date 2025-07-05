import React from 'react';
import './confirmation.css';
import {Link} from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export default function Confirmation() {
  return (
    <div className="confirmation-container">
      <div className="confirmation-message">
        <FaCheckCircle className="confirmation-icon" />
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
        <p>You will receive a confirmation email shortly.</p>
        <Link to="/"><button className="go-home-button">Continue Shopping</button></Link>
      </div>
    </div>
  );
}
