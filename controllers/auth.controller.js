const express = require("express");
var router = express.Router();
const AuthenticationModel = require("../models/AuthenticationModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const Register = async(req, res) => {
try{
    const {       
      name,
      email} = req.body;

     const existingUser = await AuthenticationModel.findOne({ email });

      if (existingUser)
        return res
          .status(401)
          .json({ status: "already exists an account with this email" });
     
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = new AuthenticationModel({
      name,
      email,
      password,
      type:"User"
    });
    const saveUser = await newUser.save();

    console.log(saveUser);
    res.status(201).json({User:saveUser ,status: "Registered" });
  } catch (err) {
    res.status(500).send();
  }


};



const Add = async(req, res) => {
  try{
      const {       
        name,
        email,
        type} = req.body;

        console.log( name,
          email,
          type,req.body.password)
  
       
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new AuthenticationModel({
        name,
        email,
        password,
        type
      });
      const saveUser = await newUser.save();
  
      console.log(saveUser);
      res.status(201).json({status: "Success" });
    } catch (err) {
      res.status(500).send();
    }
  
  
  };


  const Update = async(req, res) => {
    console.log("WORKING UPDATE PART")

    
    if(req.body.userId){

      const user = await AuthenticationModel.findById(req.body.userId);
  
      if (req.body.user != null) {
        user.name = req.body.name;
      }
      if (req.body.email != null) {
        user.email = req.body.email;
      }
      if (req.body.type != null) {
        user.type = req.body.type;
      }
   
      try {
        
          const updatedUser = await user.save();
          console.log("Updated Uuer"+updatedUser);
          res.status(200).json({status: "Success"});
  
      } catch (err) {
          res.status(400).json({message: err.message})
      }
    }
    
    };
  
    const RemoveUser = async (req, res) => {

      if (req.params.id) {
        const user = await AuthenticationModel.findById(req.params.id);
        try {
  
            const removedUser = await user.remove();
            console.log("WORK FINE"+ removedUser);
            res.status(200).json({status: "Success"});
  
        } catch (err) {
            res.status(400).json({message: err.message})
        }
  
    }
  




      }

const Login = async(req, res) => {

  try{
    const { email, password } = req.body;
    const existingUser = await AuthenticationModel.findOne({ email });

    if (!existingUser) 
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }
    console.log(existingUser);
    res.status(200).json(existingUser);
 

  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req, res) => {

  console.log("WORKING HERE MANAGEMENT")
  try {
      const user = await AuthenticationModel.find();
      console.log(user);
      res.status(200).json(user);

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}



module.exports = {
  Register,
  Login,
  Add,
  getAllUsers,
  Update,
  RemoveUser

}
