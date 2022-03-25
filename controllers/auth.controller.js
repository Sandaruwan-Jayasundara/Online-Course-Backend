const express = require("express");
var router = express.Router();
const AuthenticationModel = require("../models/AuthenticationModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const Register = async(req, res) => {
try{
    const {       
      name,
      email,
      password} = req.body;

     const existingUser = await AuthenticationModel.findOne({ email });

      if (existingUser)
        return res
          .status(401)
          .json({ status: "already exists an account with this email" });
     
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new AuthenticationModel({
      name,
      email,
      passwordHash
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
        password,
        type} = req.body;
  
       const existingUser = await AuthenticationModel.findOne({ email });
  
        if (existingUser)
          return res
            .status(401)
            .json({ status: "already exists an account with this email" });
       
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new AuthenticationModel({
        name,
        email,
        passwordHash,
        type
      });
      const saveUser = await newUser.save();
  
      console.log(saveUser);
      res.status(201).json({User:saveUser ,status: "Success" });
    } catch (err) {
      res.status(500).send();
    }
  
  
  };





const Login = async(req, res) => {

  try{
    const { email, password } = req.body;
    const existingUser = await AuthenticationModel.findOne({ email });

    if (!existingUser) 
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    console.log(existingUser);
    res.status(200).json({"status":"LoggedIn" });
 

  } catch (err) {
    console.log(err);
  }
};

// const Logout = async(req, res) => {
//   res
//     .cookie("token", "", {
//       httpOnly: true,
//       expires: new Date(0),
//     })
//     .send(true);
// };


// const getUserData = async (req, res) => {

//   try {
//       const userData = await AuthenticationModel.find();

//       console.log(userData[0].Email)
//           res.status(200).json({

//             UserName:userData[0].UserName,
//             Email:userData[0].Email,
//             Contact:userData[0].Phone

//           });

//   } catch (err) {
//       res.status(500).json({message: err.message});
//   }

// }



// const Update = async (req, res) => {


//   const {       
//     UserName,
//     Phone
// } = req.body;
//   const Emails = 'user@gmail.com'


//   try {
//       const userData = await AuthenticationModel.updateOne({Email:Emails},{
//         UserName:UserName,
//         Phone:Phone

//       })

//           res.status(200).json();

//   } catch (err) {
//  console.log(err)
//   }

// }



module.exports = {
  Register,
  Login,
  Add
  // Logout,
  // getUserData,
  // Update
}
