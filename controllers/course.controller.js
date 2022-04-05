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
      courseCategory:req.body.courseCategory,
      courseImage:courseImage,
      courseDescription:req.body.courseDescription
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
const updateCourse=async(req,res)=>{
  if(req.params.id){
    console.log(req.file);
    const course = await Course.findById(req.params.id);

    if(req.file==null){
        course.courseImage=req.body.courseImage;
        
    }
    if (req.body.courseName != null) {
        course.courseName = req.body.courseName;
    }
    if (req.body.coursePrice != null) {
        course.coursePrice = req.body.coursePrice;
    }
    if (req.body.courseDuration != null) {
        course.courseDuration = req.body.courseDuration;
    }
    if (req.body.courseDescription != null) {
        course.courseDescription = req.body.courseDescription;
    }

    if (req.body.courseCategory != null) {
      course.courseCategory = req.body.courseCategory;
  }
 
    try {
      
        const updatedCourse = await course.save();
        console.log("dsdsd"+updatedCourse);
        res.status(200).json(updatedCourse);

    } catch (err) {
        res.status(400).json({message: err.message})
    }
  }
}
//Remvoe the porduct
const removeCourse = async (req, res) => {
  if (req.params.id) {
      const course = await Course.findById(req.params.id);
      try {

          const removedCourse = await course.remove();
          res.status(200).json(removedCourse);

      } catch (err) {
          res.status(400).json({message: err.message})
      }

  }




}

module.exports = {
  add,
  getAllCourses,
  removeCourse,
  updateCourse
}
