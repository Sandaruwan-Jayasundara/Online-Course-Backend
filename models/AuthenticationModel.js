const mongoose = require("mongoose");
const schema = mongoose.schema;

const authentication = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  }
 
},{ timestamps: true });

const Authentication = mongoose.model("Authentication", authentication);
module.exports = Authentication;
