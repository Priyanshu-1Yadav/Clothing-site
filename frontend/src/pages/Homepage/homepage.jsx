import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/productCard';
import './homepage.css';
import Hero from '../../components/Hero/hero';
import useGetAllProducts from '../../hooks/useGetAllProducts'; // Import the custom hook

const Homepage = () => {
  const { products, loading, error } = useGetAllProducts(); // Use the hook to fetch products

  // Display only the first 4 products
  const displayedProducts = products.slice(0, 4);

  return (
    <>
      <Hero />
      <div className="homepage">
        <div className="new-this-week-container">
          <div className="section-header">
            <h2 className="section-title">
              NEW<br />THIS WEEK
              <span className="product-count">({loading ? 0 : products.length})</span> {/* Dynamic product count */}
            </h2>
            <button className="see-all-button">
              <Link to='/products'>See All</Link>
            </button>
          </div>

          <div className="product-grid">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ):(
              <ProductCard products={displayedProducts} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
