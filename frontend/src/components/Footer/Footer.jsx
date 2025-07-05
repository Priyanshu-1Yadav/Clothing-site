import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { FaChevronRight, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Updated imports
import "./footer.css"; // Import the CSS file

// LinkTitle component
const LinkTitle = ({ title }) => {
  return (
    <div className="link-title">
      <span className="icon">
        <FaChevronRight className="icon-chevron" />
      </span>
      {title}
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo-section">
            <Link to="/">
            <img className="footer-logo" src="/assets/logo.jpg" alt="Logo Image"/>
            </Link>
            {/* Social Links (currently commented out) */}
            <div className="social-links">
              {/* <a href="#" className="social-icon"><FaLinkedin size={25} /></a> */}
              <a href="https://www.instagram.com/thrift_n_bliss2?igsh=dnd5Y3pwYjVwMWxk" className="social-icon"><FaInstagram size={35} />Instagram</a>
            </div>
            <h1 className="footer-logo-text">Thrift N Bliss</h1>
          </div>
          <div className="footer-links">
            <div>
              <h2 className="footer-heading">Useful Links</h2>
              <ul className="footer-list">
                <li>
                  <a href="/" className="footer-link">
                    <LinkTitle title="Home" />
                  </a>
                </li>
                <li>
                  <a href="/about" className="footer-link">
                    <LinkTitle title="About Us" />
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-link">
                    <LinkTitle title="Contact Us" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Help</h2>
              <ul className="footer-list">
                <li>
                  <Link to="/how-it-works" className="footer-link">
                    <LinkTitle title="How's it works?" />
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="footer-link">
                    <LinkTitle title="FAQs" />
                  </Link>
                </li>
                <li>
                  <Link to="https://api.whatsapp.com/send/?phone=919907359784&text&type=phone_number&app_absent=0" className="footer-link">
                    <LinkTitle title="Support" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Legal</h2>
              <ul className="footer-list">
                <li>
                  <Link to="/privacy-policy" className="footer-link">
                    <LinkTitle title="Privacy Policy" />
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="footer-link">
                    <LinkTitle title="Terms and Conditions" />
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="footer-link">
                    <LinkTitle title="Refund and Cancellation" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <span className="footer-bottom-text">
          © 2024{" "}
          <a href="https://neartocollege.com" className="footer-bottom-link">
            Thrift N Bliss
          </a>
          . All Rights Reserved.
        </span>
        <p className="footer-bottom-text">
          {" "}
          <a href="https://neartocollege.com" className="footer-bottom-link">
          Designed & Developed with ❤️
          </a>
          
        </p>
      </div>
    </div>
  );
};

export default Footer;
