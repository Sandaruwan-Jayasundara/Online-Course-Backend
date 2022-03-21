const Cart = require('../models/cart.model');

// Add product to the cart
const addToCart = async (req, res) => {

console.log(
    req.body.itemId,req.body.itemImage,req.body.itemTitle,req.body.orderItems);


    const data = req.body.orderItems;
  

    if (req.body) {
        const cart = new Cart({
            itemId:req.body.itemId,
            itemImage:req.body.itemImage,
            itemTitle:req.body.itemTitle,
            menuId:data[0].menuId,
            qty:data[0].qty,
            price:data[0].price,
            total:data[0].total,

           
       
        });
        try {
            const newCartItem = await cart.save();
            console.log(newCartItem)
            res.status(200).json(newCartItem);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}


// Update cart quantity
const updateProductQty = async (req, res) => {
    if (req.params.id && req.body.qty) {

        const cartItem =await Cart.findById(req.params.id);
        cartItem.qty = req.body.qty;
        try {

            const updatedCartItem = await cartItem.save();
            res.status(200).json(updatedCartItem);

        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}


// Remove from from cart

const removeFromCart = async (req, res) => {
    if (req.params.id) {
        const cartItem = Cart.findById(req.params.id);
        try {
            const removedCartItem = await cartItem.remove();
            res.status(200).json(removedCartItem);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}

// Get all cart products

const getAllFromCart = async (req, res) => {

    try {
        const cartItems = await Cart.find();

        if(cartItems){
            res.status(200).json(cartItems);
        }else{
            res.status(200).json(null);
        }
        

    } catch (err) {
        res.status(500).json({message: err.message});
    }
  
}





module.exports = {
    addToCart,
    updateProductQty,
    removeFromCart,
    getAllFromCart,

}
