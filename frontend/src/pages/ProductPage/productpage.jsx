import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './productpage.css';
import { useGetProduct } from '../../hooks/useGetProduct';
import { useSaveCartItem } from '../../hooks/usePostCart';
import { useVariableContext } from '../../context/VariableContext';
import ColorOption from './colorOption';
import SizeOption from './sizeOption';
import ImageGallery from './imageGallery';

export default function ProductPage() {
  const { token } = useVariableContext(); // Get the token from context
  const { id } = useParams();
  
  const { product, loading, error } = useGetProduct(id);
  const { saveCartItem, successMsg, loading: savingLoading, error: savingError } = useSaveCartItem();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = async () => {
    setErrorMsg(''); // Clear previous error message
  
    if (!selectedColor || !selectedSize) {
      setErrorMsg('Please select both a color and size before adding to the cart.');
      return;
    }
  
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      category: product.category,
      description: product.description,
      images: product.images,
    };
  
    await saveCartItem(newItem);
  
    if (savingError) {
      setErrorMsg(savingError); 
    } else {
      setIsInCart(true);
    }
  };

  const handleButtonClick = () => {
    if (!token) {
      alert('Please log in to add items to the cart or view your cart.');
      navigate('/login'); // Redirect to the login page
    } else if (isInCart) {
      navigate('/cart'); // Redirect to the /cart page
    } else {
      handleAddToCart(); // Call the function to add to cart
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error loading product: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-container">
      <ImageGallery
        images={product.images}
        currentImageIndex={currentImageIndex}
        onThumbnailClick={handleThumbnailClick}
      />
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">INR {product.price}</p>
        <p className="tax-info">MRP incl. of all taxes</p>
        <p className="product-description">{product.description}</p>

        <div className="color-selection">
          <p className="option-label">Color</p>
          <div className="color-options">
            {product.color.map((color) => (
              <ColorOption
                key={color}
                color={color}
                isSelected={color === selectedColor}
                handleClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="size-selection">
          <p className="option-label">Size</p>
          <div className="size-options">
            {product.size.map((size) => (
              <SizeOption
                key={size}
                size={size}
                isSelected={size === selectedSize}
                handleClick={() => setSelectedSize(size)}
              />
            ))}
          </div>
        </div>

        {/* Error message display */}
        {(errorMsg || savingError) && (
          <div className="error-message">
            {errorMsg || savingError}
          </div>
        )}
        {/* Success message display */}
        {successMsg && <div className="success-message">{successMsg}</div>}

        <button
          className="add-to-cart-button"
          onClick={handleButtonClick}
          disabled={savingLoading}
        >
          {savingLoading ? 'Adding...' : (isInCart ? 'Go to Cart' : 'Add to Cart')}
        </button>
      </div>
    </div>
  );
}
