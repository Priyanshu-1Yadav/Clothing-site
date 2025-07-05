import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUser, FaShoppingCart,FaAddressBook, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import './dashboard.css';
import ShippingAddress from '../Cart/shippingAddresses';
import { useVariableContext } from '../../context/VariableContext';



const Dashboard = () => {

  const { deleteUser} = useVariableContext();

  return (
    <div className='user-dashboard'>
        <h2 className='account'>Account</h2>
      <div className='dashboard-head'>
        <div className='profile-icon'>
          <FaUserCircle size={60} />
        </div>
        <div className='user-info'>
          {/* <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p> */}
        </div>
      </div>

      <div className='dashboard-links'>
        <Link to='/dashboard' className='user-dashboard-links'>
          <FaUser className="icon" /> Profile
        </Link>
        <a href='/orders' className='user-dashboard-links'>
          <FaShoppingCart className="icon" /> Orders
          </a>
        <Link to='/savedaddress' className='user-dashboard-links'>
          <FaAddressBook className="icon" /> Saved Address
          </Link>
        <Link to='/contact' className='user-dashboard-links'>
          <FaEnvelope className="icon" /> Contact Us
        </Link>
        <div className='user-dashboard-links' onClick={()=>{deleteUser(); window.location = '/'}}>
          <FaSignOutAlt className="icon" /> Logout
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
