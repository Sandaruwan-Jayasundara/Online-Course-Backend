const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');

router.post('/add', category.add);


module.exports = router;
