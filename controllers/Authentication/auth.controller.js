const express = require("express");
var router = express.Router();
const AuthenticationModel = require("../../models/AuthenticationModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const Register = async(req, res) => {


  try {
    const {       
      UserName,
      Email,
      Phone,
      Password,
      RePassword} = req.body;

console.log(    UserName,
  Email,
  Phone,
  Password,
  RePassword)


    if (!UserName ||!Email ||!Phone || !Password || !RePassword)
      return res
        .status(201)
        .json({ status: "Please enter all required fields" });

    if (Password.length < 6)
      return res
        .status(201)
        .json({
          status: "Please enter strong password",
        });

    if (Password !== RePassword)
      return res
        .status(201)
        .json({ status: "Password must be same" });

    const existingUser = await AuthenticationModel.findOne({ Email });

    if (existingUser)
      return res
        .status(201)
        .json({ status: "already exists an account with this email" });
     
    const salt = await bcrypt.genSalt();
    const PasswordHash = await bcrypt.hash(Password, salt);

    const newUser = new AuthenticationModel({
      UserName,
      Email,
      Phone,
      PasswordHash
    });
    const saveUser = await newUser.save();
    res.status(200).json({ status: "Registered" });;
  } catch (err) {
    res.status(500).send();
  }
};





const Login = async(req, res) => {

  
  try {
    const { Email, Password } = req.body;
    console.log("TESTING",Email, Password);



    if (!Email || !Password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }
    const existingUser = await AuthenticationModel.findOne({ Email });

    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }
    const passwordCorrect = await bcrypt.compare(
      Password,
      existingUser.PasswordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }
    console.log(existingUser)
    res.status(200).json({ status: "LoggedIn" });;
 
         
 

  } catch (err) {
    console.log(err);
  }
};

const Logout = async(req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send(true);
};


const getUserData = async (req, res) => {

  try {
      const userData = await AuthenticationModel.find();

      console.log(userData[0].Email)
          res.status(200).json({

            UserName:userData[0].UserName,
            Email:userData[0].Email,
            Contact:userData[0].Phone

          });

  } catch (err) {
      res.status(500).json({message: err.message});
  }

}



const Update = async (req, res) => {


  const {       
    UserName,
    Phone
} = req.body;
  const Emails = 'user@gmail.com'


  try {
      const userData = await AuthenticationModel.updateOne({Email:Emails},{
        UserName:UserName,
        Phone:Phone

      })

          res.status(200).json();

  } catch (err) {
 console.log(err)
  }

}



module.exports = {
  Register,
  Login,
  Logout,
  getUserData,
  Update
}
