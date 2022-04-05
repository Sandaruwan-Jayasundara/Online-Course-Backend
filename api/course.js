const express = require('express');
const router = express.Router();
const course = require('../controllers/course.controller');
const multer=require('multer');

const FileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, '../frontend/assets/images');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload=multer({storage:FileStorage});

router.get('/', course.getAllCourses);
router.post('/add',upload.single('file'),course.add);
router.delete('/delete/:id',course.removeCourse);
router.patch('/update/:id',upload.single('file'),course.updateCourse);






module.exports = router;
