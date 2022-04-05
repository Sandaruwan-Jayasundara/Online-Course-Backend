const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// Auth Registration
router.get('/', auth.getAllUsers);
router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/add', auth.Add);
router.post('/update', auth.Update);
router.delete('/delete/:id',auth.RemoveUser);
module.exports = router;
