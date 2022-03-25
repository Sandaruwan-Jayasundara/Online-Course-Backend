const express = require('express');
const router = express.Router();
const course = require('../controllers/course.controller');


router.get('/', course.getAllCourses);
router.post('/add', course.add);




module.exports = router;
