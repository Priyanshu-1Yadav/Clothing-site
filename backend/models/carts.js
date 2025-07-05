import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  size: String,
  color: String,
  category: String,
  description: String,
  images: [String],
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  cartItems: [cartItemSchema], // Array of cart items
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
