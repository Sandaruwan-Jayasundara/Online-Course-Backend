const mongoose = require("mongoose");
const schema = mongoose.schema;

const Cart = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status:{
      type: String,
      required: true,
  }
 
});

const Carts = mongoose.model("Cart", Cart);
module.exports = Carts;
