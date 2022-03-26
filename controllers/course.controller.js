const express = require("express");
var router = express.Router();
const Course = require("../models/CourseModel");


const add = async(req, res) => {

    const image = req.file.originalname;

    const courseImage = "assets/images/" + image


    const newCourse = new Course({
      courseName:req.body.courseName,
      coursePrice:req.body.coursePrice,
      courseDuration:req.body.courseDuration,
      courseImage
    });
    console.log(newCourse);
    const savedCourse = await newCourse.save();

    console.log(savedCourse);
    res.status(201).json({status: "Success" });;

}

const getAllCourses = async (req, res) => {
  console.log("WORKINGGGGGG");
  try {
      const course = await Course.find();
      console.log(course);
      res.status(200).json(course);

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}

module.exports = {
  add,
  getAllCourses
}
