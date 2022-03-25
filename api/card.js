const express = require('express');
const router = express.Router();
const card = require('../controllers/card.controller');


router.post('/save', card.SaveCard);

module.exports = router;
