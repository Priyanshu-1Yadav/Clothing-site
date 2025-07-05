import React from 'react';
import './productCard.css';
import { Link } from 'react-router-dom';
import {useVariableContext} from '../../context/VariableContext';

const ProductCard = ({ products }) => {
  const {host} = useVariableContext();
  // console.log(products);
  
  return (
    <>
      {products.map((product, index) => (
        <a key={index} href={`/products/${product.id}`} className="product-card-link">
          <div className="product-card">
            <div className="product-card-image-box">
              <img
                src={`${host}/${product.images[0]}`}
                // src={`/assets/Images/${product.images[0].split('/').pop()}`}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-card-content">
              <p className="product-type">{product.type}</p>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-details">
                <div className="price-variants">
                  <p className="product-price">
                    ₹{parseInt(product.price).toLocaleString("en-IN")}
                  </p>
                </div>
              </div> 
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default ProductCard;
