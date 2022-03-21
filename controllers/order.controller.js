const Order = require('../models/Orders');
const Cart = require('../models/cart.model');
const OrderManagement = require('../models/OrderManagement');
const Address = require('../models/Address');


const addOrders = async (req, res) => {

        const BuyerName = req.body.BuyerNames;
        const phone = req.body.phones;
        const Street = req.body.Streets;
        const city = req.body.Cities;
        const province = req.body.Provinces;

        try {
            const address = new Address({
                BuyerName,
                phone,
                Street,
                city,
                province
            })
            const newAddress = await address.save()

            if(newAddress){

                let id = newAddress._id;
                const cartItems = await Cart.find();
                if(cartItems){

                    const orders = new Order({
                        Date: new Date(),
                        order:id,
                        cartItems:cartItems
                    });

                    const newOrders = await orders.save();
                    const removedCartItem = await Cart.remove({});

                    res.status(200).json(newOrders);
            }

            }else{
                res.status(200).json(null);
            }
            
        } catch (err) {
            res.status(500).json({message: err.message});
            console.log(err)
        }
      
    }

    const getOrder = async (req, res) => {

        try {
            const orders = await Order.find();
            let data=[];
            if(orders.length >0){
                orders.map((order,index)=>{
                    let item = {_id:index,Cart:order.cartItems}
                        data.push(item)
                })
            }
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message})
        }
    }
    


    const getAllOrders = async (req, res) => {
        try {
            const orders = await Order.find().populate('order');
                    res.status(200).json(orders);
                
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message})
        }
    }
    



    module.exports = {
        addOrders,
        getOrder,
        getAllOrders

  
    }
    