import express from 'express';
import { addToCart, getCartItems, updateCartItems } from '../controllers/cart.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addtocart', authenticate, addToCart );
router.get('/getcart', authenticate, getCartItems );
router.post('/updatecart', authenticate, updateCartItems );

export default router;
