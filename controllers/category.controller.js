const express = require("express");
var router = express.Router();
const CategoryModel = require("../models/categoryModel");


const add = async(req, res) => {

    const {CategoryName,CategoryNumber} = req.body;


    const image = req.file.originalname;

    const CategoryImage = "assets/images/" + image

    const newCategory = new CategoryModel({
      CategoryName,
      CategoryNumber,
      CategoryImage,
  
    });
    const savedCategory = await newCategory.save();

    console.log(savedCategory);
    res.status(201).json({status: "Success" });;

}





const getAllCategories = async (req, res) => {
  try {
      const category = await CategoryModel.find();
      res.status(200).json(category);

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}

const removeCategory = async (req, res) => {
  if (req.params.id) {
      const category = await CategoryModel.findById(req.params.id);
      try {

          const removedCategory = await category.remove();
          res.status(200).json(removedCategory);

      } catch (err) {
          res.status(400).json({message: err.message})
      }

  }

}


const updateCategory=async(req,res)=>{
  if(req.params.id){
    const category = await CategoryModel.findById(req.params.id);

    if(req.file==null){
      category.CategoryImage=req.body.CategoryImage;
        console.log(req.body.CategoryImage);
    }
    if (req.body.CategoryName != null) {
        category.CategoryName = req.body.CategoryName;
    }
    if (req.body.CategoryNumber != null) {
      category.CategoryNumber = req.body.CategoryNumber;
    }
 
    try {
      
        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);

    } catch (err) {
        res.status(400).json({message: err.message})
    }
  }
}

module.exports = {
  add,
  getAllCategories,
  removeCategory,
  updateCategory
}
