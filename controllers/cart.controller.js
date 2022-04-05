const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Cart = require("../models/cart.model");



const addToCart = async(req,res) => {

    const newCart = new Cart({
      courseId:req.body.courseId,
      status:req.body.status
    });
    const savedCart = await newCart.save();

    console.log(savedCart);
    res.status(201).json(savedCart);;
}

const getAllCartItems = async(req,res) => {
    try {
        const cartItems = await Cart.find({status:"pending"}).populate('courseId');
        res.status(200).json(cartItems);
  
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const AlreadyInTheCart = async(req,res) => {
    if(req.params.id){
        try{
            const cartItems = await Cart.find({});
            let count=0;
            cartItems.map((item)=>{
                if(item.courseId==req.params.id){
                    ++count;
                }
            })
            if(count>0){
                res.status(200).json({status:true});
            }
            else{
                res.status(200).json({status:false});
            }
       
        }catch(err){
            res.status(500).json({message: err.message})
        }
        }

    }

    const removeCartItem = async (req, res) => {
        if (req.params.id) {
            const cartitem = await Cart.findById(req.params.id);
            try {
      
                const removedItem = await cartitem.remove();
                res.status(200).json(removedItem);
      
            } catch (err) {
                res.status(400).json({message: err.message})
            }
      
        }
    }


    const getTotalPrice = async(req,res) => {
         var total=0;
        try {
            const cartItems = await Cart.find({status:"pending"}).populate('courseId');
            cartItems.map(item=>{
                total+=item.courseId.coursePrice;
            });
            res.status(200).json({total:total});
      
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }


module.exports={
    addToCart,
    getAllCartItems,
    AlreadyInTheCart,
    getTotalPrice,
    removeCartItem,
}
