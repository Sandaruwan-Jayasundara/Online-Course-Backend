const express = require("express");
var router = express.Router();
const Card = require("../models/card");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const SaveCard = async(req, res) => {
try{
    const {       
        cardNumber,
        cardName,
        cvv,
        date} = req.body;

console.log(     
    cardNumber,
    cardName,
    cvv,
    date)

     const existingCard = await Card.findOne({ cardNumber });

      if (existingCard)
        return res
          .status(401)
          .json({ status: "already exists a card with this number" });
     
    const newCard = new Card({
        cardNumber,
        cardName,
        cvv,
        date
    });
    const saveCard = await newCard.save();

    console.log(saveCard);
    res.status(201).json({ status: "Saved" });;
  } catch (err) {
    res.status(500).send();
  }


};

module.exports = {
    SaveCard

}
