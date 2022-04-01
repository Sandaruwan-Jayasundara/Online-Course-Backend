const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart.controller');

router.post('/add',cart.addToCart);
router.get('/',cart.getAllCartItems);
router.get('/check/:id',cart.AlreadyInTheCart);
router.get('/total',cart.getTotalPrice);
router.delete('/delete/:id',cart.removeCartItem);

module.exports = router;