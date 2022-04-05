const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');
const multer=require('multer');

const FileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, '../frontend/assets/category');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const upload=multer({storage:FileStorage});

router.post('/add',upload.single('file'), category.add);
router.get("/",category.getAllCategories);


module.exports = router;
