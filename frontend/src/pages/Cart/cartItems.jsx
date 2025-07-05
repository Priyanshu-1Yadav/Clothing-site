import React from 'react';
import './cart.css';
import { useVariableContext } from '../../context/VariableContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import useUpdateCart from '../../hooks/useUpdateCart';

const CartItem = ({ itemId }) => {
  const { cartItems, setCartItems, host } = useVariableContext();
  const { updateCartItems } = useUpdateCart();
  const item = cartItems.find(cartItem => cartItem.id === itemId);

  const removeItem = () => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
    updateCartItems(updatedCartItems);
  };

  const incrementQuantity = () => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    updateCartItems(updatedCartItems);
  };

  const decrementQuantity = () => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === itemId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

    updateCartItems(updatedCartItems); 
  };

  return (
    <div className="cart-item">
      <img src={`${host}/${item.images[0]}`} alt={item.name} className="item-image" />
      <div className="item-details">
        <span className="product-name">{item.name}</span>
        {/* <h3 className="item-type">{item.type}</h3> */}
        <div className="item-options">
          <p>Color: {item.color}</p>
          <p>Size: {item.size}</p>
          <p>
            Quantity: 
            <button onClick={decrementQuantity} className="quantity-button">
              <FaMinus />
            </button>
            {item.quantity}
            <button onClick={incrementQuantity} className="quantity-button">
              <FaPlus />
            </button>
          </p>
        </div>
      </div>
      <div className="item-price">₹ {item.price.toFixed(2)}
      <button onClick={removeItem} className="remove-button">
        <FaTrash />
      </button>
      </div>
    </div>
  );
};

export default CartItem;
