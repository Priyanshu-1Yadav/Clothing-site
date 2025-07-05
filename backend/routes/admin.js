import express from 'express';
import { getOrders, updateOrders, getUsers, updateUsers} from '../controllers/AdminControllers/users.js';
import { addProduct, updateProducts } from '../controllers/AdminControllers/products.js';
import { addCoupon, updateCoupons, getCoupons } from '../controllers/AdminControllers/coupons.js';
import {upload} from '../middlewares/multer.js';
import {authenticate, isAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/getusers', authenticate, isAdmin, getUsers);
router.get('/getorders', authenticate, isAdmin, getOrders)
router.get('/getcoupons', authenticate, isAdmin, getCoupons)

router.post('/addproduct', authenticate, isAdmin, upload.array('images', 10), addProduct);
router.post('/addcoupon', authenticate, isAdmin, addCoupon);
router.post('/editorder/:orderId', authenticate, isAdmin, updateOrders);
router.post('/editcoupon/:couponCode', authenticate, isAdmin, updateCoupons);
router.post('/edituser/:userId', authenticate, isAdmin, updateUsers);
router.post('/editproduct/:productId', authenticate, isAdmin, updateProducts);


export default router;