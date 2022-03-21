const express = require('express');
const router = express.Router();
const controller = require('../controllers/Order.Controller');

// Add Orders
router.post('/add', controller.addOrders);
router.get('/get', controller.getOrder);
router.get('/all', controller.getAllOrders);


module.exports = router;
