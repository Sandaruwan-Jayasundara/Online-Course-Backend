const express = require("express");
var router = express.Router();
const CategoryModel = require("../models/categoryModel");


const add = async(req, res) => {

    const {CategoryName,CategoryNumber} = req.body;


    const CategoryImage ="STILL NO IMAGE"

    const newCategory = new CategoryModel({
      CategoryName,
      CategoryNumber,
      CategoryImage,
  
    });
    const savedCategory = await newCategory.save();

    console.log(savedCategory);
    res.status(201).json({status: "Success" });;

}





const getAllCourses = async (req, res) => {
  console.log("WORKINGGGGGG");
  try {
      const category = await newCategory.find();
      console.log(category);
      res.status(200).json({data:category});

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}

module.exports = {
  add,
  getAllCourses
}
