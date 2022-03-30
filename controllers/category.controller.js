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





const getAllCategories = async (req, res) => {
  try {
      const category = await CategoryModel.find();
      console.log(category);
      res.status(200).json(category);

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}

module.exports = {
  add,
  getAllCategories
}
