import React from 'react';
import './allproducts.css';
import ProductCard from '../../components/ProductCard/productCard';
import useGetAllProducts from '../../hooks/useGetAllProducts'; // Import the custom hook

const AllProducts = () => {
  const { products, loading, error } = useGetAllProducts(); // Use the hook

  return (
    <div className="container">
      <div className="breadcrumb">Home / Products</div>

      <div className="layout">
        <div className="product-list">
          <div className="product-grid">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ):(
              <ProductCard products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
