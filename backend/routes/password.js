import express from 'express';
import { forgetpassword, resetpassword } from '../controllers/password.js';

const router = express.Router();

router.post('/forgetpassword', forgetpassword );
router.post('/resetpassword/:userId/:token', resetpassword );

export default router;