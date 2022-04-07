const express = require("express");
var router = express.Router();
const Contact = require("../models/contact");

const add = async(req, res) => {
  try{

    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
       
    var date = year + "-" + month + "-" + day;
    console.log(date);

    console.log(req.body.email,req.body.message,  );

      const contact = new Contact({
        email:req.body.email,
        message:req.body.message,
        date : date
    
      });
      const saveContact = await contact.save();
  
      console.log(saveContact);
      res.status(201).json({status:"Success" });
    } catch (err) {
      res.status(500).send();
    }
};


const Update = async(req, res) => {
  console.log("WORKING UPDATE PART AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  console.log(req.body.contactId);
  console.log(req.body.email);
  console.log(req.body.message);

  if(req.body.contactId){

    const contact = await Contact.findById(req.body.contactId);

    if (req.body.email != null) {
      contact.email = req.body.email;
    }
    if (req.body.message != null) {
      contact.message = req.body.message;
    }
 
    try {
      
        const updatedMessage = await contact.save();
        console.log("Updated MEssage"+updatedMessage);
        res.status(200).json({status: "Success"});

    } catch (err) {
        res.status(400).json({message: err.message})
    }
  }
  
  };


const reply = async(req, res) => {
  try{


    console.log(req.body.reply);
    console.log(req.body.contactId);

    const _id = req.body.contactId;

    const saveContact = await Contact.findByIdAndUpdate(_id,{
      reply:req.body.reply,
    });


      console.log(saveContact);
      res.status(201).json({status:"Success" });
    } catch (err) {
      res.status(500).send();
    }
};





const deleteContact = async (req, res) => {

  console.log("DELETE CONTACT")
  console.log(req.params.id)
  if (req.params.id) {
    const contact = await Contact.findById(req.params.id);
    try {

        const removedContact = await contact.remove();
        console.log("WORK FINE DELETE CONTACT"+ removedContact);
        res.status(200).json({status: "Success"});

    } catch (err) {
        res.status(400).json({message: err.message})
    }

}





  }




const getAllMessage = async (req, res) => {

  console.log("WORKING HERE CONTACT")
  try {
      const contact = await Contact.find();
      console.log(contact);
      res.status(200).json(contact);

  } catch (err) {
      res.status(500).json({message: err.message})
  }
}



module.exports = {
  add,
  getAllMessage,
  reply,
  deleteContact,
  Update
  // Logout,
  // getUserData,
  // Update
}
