import express from 'express';
import { getVendorOrders, placeOrderFromCart, placeSingleItemOrder } from '../controller/orderController.js';

const router = express.Router();

router.post('/cart', placeOrderFromCart);    
router.post('/single', placeSingleItemOrder);
router.get('/:vendorId',getVendorOrders)

export default router;
