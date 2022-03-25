const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// Auth Registration
router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/add', auth.Add);


module.exports = router;
