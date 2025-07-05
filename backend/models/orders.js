import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({

  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  images: {
    type: [String] // Array of image URLs
  },
});

// Define the schema for an order
const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  orderedItems: [OrderItemSchema], // Array of cart items

  subtotal: {
    type: Number,
    required: true,
  },
  discountCode: {
    type: String,
  },
  discountedAmount: {
    type: Number,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true,
  },
  shippingId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date,
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
