
import express from 'express';
import { addToCart, getCartItems, removeCartItem, updateCartItem } from '../controller/cartController.js';


const router = express.Router();

router.post('/add', addToCart); 
router.put('/update', updateCartItem); 
router.get('/:userId', getCartItems); 
router.delete('/item/:cartItemId', removeCartItem); 

export default router;
