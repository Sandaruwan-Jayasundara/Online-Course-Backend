const mongoose = require("mongoose");
const schema = mongoose.schema;

const Course = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: false,
  }
 
});

const contact = mongoose.model("Contact", Course);
module.exports = contact;
