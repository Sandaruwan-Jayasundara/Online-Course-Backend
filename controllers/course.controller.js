const express = require("express");
var router = express.Router();
const Course = require("../models/CourseModel");


const add = async(req, res) => {

    const {courseName,courseDuration,coursePrice} = req.body;


    const courseImage ="STILL NO IMAGE"

    const newCourse = new Course({
      courseName,
      coursePrice,
      courseDuration,
      courseImage
    });
    const savedCourse = await newCourse.save();

    console.log(savedCourse);
    res.status(201).json({status: "Success" });;

}

const getAllCourses = async (req, res) => {
  console.log("WORKINGGGGGG");
  try {
      const course = await Course.find();
      console.log(course);
      res.status(200).json({data:course});

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}

module.exports = {
  add,
  getAllCourses
}
