const mongoose = require("mongoose");
const schema = mongoose.schema;

const Course = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  CategoryNumber: {
    type: String,
    required: true,
  },
  CategoryImage: {
    type: String,
    required: true,
  }
 
});

const Courses = mongoose.model("Category", Course);
module.exports = Courses;
