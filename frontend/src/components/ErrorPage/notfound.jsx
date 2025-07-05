import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './notFound.css'; // Import the CSS file

const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! The page you're looking for does not exist.</p>
            <a href="/" className="not-found-link">Go Back Home</a>
            <div className="not-found-image">
                <img src="https://via.placeholder.com/400" alt="Not Found" />
            </div>
        </div>
    );
};

export default NotFound;
