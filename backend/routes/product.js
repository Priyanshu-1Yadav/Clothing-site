import express from 'express';
import { getAllProducts, getProduct } from '../controllers/products.js'
import { get } from 'mongoose';

const router = express.Router();

router.get('/allproducts', getAllProducts);
router.get('/product/:id', getProduct);

export default router;
