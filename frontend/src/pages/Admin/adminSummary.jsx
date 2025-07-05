import React, { useEffect, useState } from 'react';
import './adminSummary.css';

export default function AdminSummary() {
  const [summaryData, setSummaryData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCoupons: 0,
    totalRevenue: 0,
  });

  // Simulate an API call to get summary data
  useEffect(() => {
    // You would fetch this data from your backend API
    // This is just a simulated data fetch for now
    setSummaryData({
      totalUsers: 1500,
      totalOrders: 3200,
      totalProducts: 250,
      totalCoupons: 50,
      totalRevenue: 120000, // Assuming revenue in some currency
    });
  }, []);

  return (
    <div className="admin-summary">
      <h2>Admin Summary</h2>
      <div className="summary-boxes">
        <div className="summary-box">
          <h3>Total Users</h3>
          <p>{summaryData.totalUsers}</p>
        </div>
        <div className="summary-box">
          <h3>Total Orders</h3>
          <p>{summaryData.totalOrders}</p>
        </div>
        <div className="summary-box">
          <h3>Total Products</h3>
          <p>{summaryData.totalProducts}</p>
        </div>
        <div className="summary-box">
          <h3>Total Coupons</h3>
          <p>{summaryData.totalCoupons}</p>
        </div>
        <div className="summary-box">
          <h3>Total Revenue</h3>
          <p>${summaryData.totalRevenue}</p>
        </div>
      </div>

      <div className="insights">
        <h3>Insights</h3>
        <div className="insight-item">
          <h4>Recent Activity</h4>
          <p>We have added 10 new products this week and 5 new coupons.</p>
        </div>
        <div className="insight-item">
          <h4>Trending Product</h4>
          <p>Product XYZ is currently the most popular among users.</p>
        </div>
      </div>
    </div>
  );
}
