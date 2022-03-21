const mongoose = require("mongoose");
const schema = mongoose.schema;

const authentication = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  PasswordHash: {
    type: String,
    required: true,
  }
},{ timestamps: true });

const Authentication = mongoose.model("Authentication", authentication);
module.exports = Authentication;
