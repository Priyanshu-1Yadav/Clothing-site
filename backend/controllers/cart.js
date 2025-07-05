import Cart from "../models/carts.js";

export const addToCart = async (req, res) => {
  const {id, email} = req.user;
  const { cartItem } = req.body;

  try {
    let userCart = await Cart.findOne({ userId: id });
    if (!userCart) {
      userCart = new Cart({ userId: id, email, cartItems: [] });
    }

    const existingItemIndex = userCart.cartItems.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingItemIndex !== -1) {
      // Item exists, update its quantity
      userCart.cartItems[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Item does not exist, add it to cartItems array
      userCart.cartItems.push(cartItem);
    }

    await userCart.save();
    res.status(200).json({ message: 'Item added/updated in cart', userCart });
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const getCartItems = async (req, res) => {
  // console.log("getCart");
  
  const { id } = req.user;
  // console.log('User ID:', id); // Debugging line
  

  try {
    const userCart = await Cart.findOne({ userId: id });

    if (userCart && userCart.cartItems.length > 0) {
      return res.status(200).json(userCart.cartItems);
    } else {
      return res.status(404).json({ message: 'No cart items found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const updateCartItems = async (req, res) => {
  const {id} = req.user;
  const { cartItems } = req.body;
  cartItems.userId = id;
  // console.log('Body cart :', cartItems); // Debugging line


  try {
    // Replace the entire cart for the user
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: id}, // Find the user's cart
      { $set: { cartItems } }, // Set the new cart items
      { new: true, upsert: true } // Create if it doesn't exist and return the updated document
    );
    // console.log('updated cart', updatedCart);


    return res.status(200).json({ message: 'Cart updated successfully', updatedCartItems : updatedCart.cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

