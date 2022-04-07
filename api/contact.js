const express = require('express');
const router = express.Router();
const contact = require('../controllers/contact.controller');

// Auth Registration
router.get('/', contact.getAllMessage);
router.post('/send', contact.add);
router.post('/update', contact.Update);
router.post('/reply', contact.reply);
router.delete('/remove/:id', contact.deleteContact);
module.exports = router;
