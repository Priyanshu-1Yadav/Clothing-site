import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaPhoneAlt, FaHome } from 'react-icons/fa';
import './navbar.css';
import { useVariableContext } from '../../context/VariableContext';

const BottomNavbar = () => {
  const { token } = useVariableContext();
  const isAdmin = localStorage.getItem('isAdmin');

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {/* Top Navbar For PC */}
      <nav className="navbar">
        <div className="navbar-left">
          <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/products'>Collection</Link></li>
            <li><Link to='/products'>New</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul className="navbar-icons">
            <li className="navbar-cart">
              <Link to='/cart' className="cart-link">
                <span className="navbar-cart-text">Cart</span>
                <FaShoppingCart size={20} />
              </Link>
            </li>
            <li className="navbar-profile">
              {token ? (
                <div className="navbar-profile-dropdown">
                  <div onClick={toggleDropdown} className="navbar-profile-icon">
                    <FaUser size={25} />
                  </div>
                  {dropdownOpen && (
                    <div className="navbar-profile-dropdown-content">
                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="dropdown-item">Dashboard</Link>
                      {isAdmin && (
                        <Link to="/admin-dashboard" onClick={() => setDropdownOpen(false)} className="dropdown-item">Admin Dashboard</Link>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link to='/login' className="navbar-login">
                  <span className="navbar-login-text">Login</span>
                  <FaUser size={25} />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="bottom-navbar">
        <div className="bottom-navbar-item">
          <Link to='/'>
            <FaHome size={25} />
            <span className="bottom-navbar-text">Home</span>
          </Link>
        </div>
        <div className="bottom-navbar-item">
          <a href='/contact'>
            <FaPhoneAlt size={25} />
            <span className="bottom-navbar-text">Contact</span>
          </a>
        </div>
        <div className="bottom-navbar-item">
          <Link to='/cart'>
            <FaShoppingCart size={25} />
            <span className="bottom-navbar-text">Cart</span>
          </Link>
        </div>
        <div className="bottom-navbar-item">
          {token ? (
            isAdmin ? (
              <a href='/admin-dashboard'>
                <FaUser size={25} />
                <span className="bottom-navbar-text">Admin</span>
              </a>
            ) : (
              <a href='/dashboard'>
                <FaUser size={25} />
                <span className="bottom-navbar-text">Profile</span>
              </a>
            )
          ) : (
            <Link to='/login'>
              <span className='bottom-navbar-login-text'>Login</span>
            </Link>
          )}

        </div>
      </nav>
    </>
  );
};

export default BottomNavbar;
