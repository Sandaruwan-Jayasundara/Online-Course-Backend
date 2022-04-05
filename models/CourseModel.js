const mongoose = require("mongoose");
const schema = mongoose.schema;

const Course = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  coursePrice: {
    type: Number,
    required: true,
  },
  courseDuration: {
    type: Number,
    required: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
    required: true,
  },
  
 
});

const Courses = mongoose.model("Course", Course);
module.exports = Courses;
