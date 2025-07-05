import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
      unique: true,
    },
    couponType: {
      type: String,
      default: 'percentage',
    },
    discountAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    minimumItemQuantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    minPurchaseAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    maxDiscountAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageLimit: {
      type: Number,
      min: 1,
      default: 1,
    },
    userLimit: {
      type: Number,
      min: 1,
      default: 1,
    },
    description: {
      type: String,
      default: '',
    },
    usedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
