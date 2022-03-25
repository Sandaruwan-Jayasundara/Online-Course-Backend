const mongoose = require("mongoose");
const schema = mongoose.schema;

const Card = new mongoose.Schema({
    cardNumber: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
 
},{ timestamps: true });

const Cards = mongoose.model("Card", Card);
module.exports = Cards;
