import express from 'express';
import { createOrder, getOrders } from '../controllers/orders.js';
import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/createorder', authenticate, createOrder);
router.get('/getorders', authenticate, getOrders)

export default router;