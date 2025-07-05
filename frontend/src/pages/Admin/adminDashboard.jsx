import React, { useState } from 'react';
import './adminDashboard.css';
import GetUsers from './UserData/getUsers';
import GetOrders from './Orders/getOrders';
import AddProducts from './Products/addProducts';
import AddCoupons from './Coupons/addCoupons';
import Coupons from './Coupons/getCoupons';
import GetProducts from './Products/getProducts';
import AdminSummary from './adminSummary';

export default function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('summary');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSidebarOpen(false); // Close sidebar when an option is clicked
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'users':
        return <div><GetUsers /></div>;
      case 'orders':
        return <div><GetOrders /></div>;
      case 'coupons':
        return <div><Coupons /></div>;
      case 'products':
        return <div><GetProducts /></div>;
      case 'postProduct':
        return <div><AddProducts /></div>;
      case 'addCoupons':
        return <div><AddCoupons /></div>;
      default:
        return <div><AdminSummary /></div>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Toggle Sidebar Button for Desktop and Mobile */}
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? 'Hide Menu' : 'Show Menu'}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <p className="sidebar-title">Admin Dashboard</p>
        <ul className="sidebar-options">
          <li onClick={() => handleOptionClick('summary')}>Dashboard Summary</li>
          <li onClick={() => handleOptionClick('users')}>View Users</li>
          <li onClick={() => handleOptionClick('orders')}>View Orders</li>
          <li onClick={() => handleOptionClick('coupons')}>View Coupons</li>
          <li onClick={() => handleOptionClick('products')}>View Products</li>
          <li onClick={() => handleOptionClick('postProduct')}>Add New Product</li>
          <li onClick={() => handleOptionClick('addCoupons')}>Add Coupons</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}
