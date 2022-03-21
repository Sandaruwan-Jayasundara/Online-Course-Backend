const Topping = require('../models/topping.model');
const addTopping = async (req, res) => {
    if (req.body) {
        const topping = new Topping(req.body);
        try {
            const newTopping = await topping.save();
            res.status(200).json(newTopping);
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
}
const removeTopping = async (req, res) => {
    if (req.params.id) {
        const topping = Topping.findById(req.params.id);
        try {
            const removedTopping = await topping.remove();
            res.status(200).json(removedTopping);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}
const updateTopping = async (req, res) => {
    if (req.params.id) {
        const topping = Topping.findById(req.params.id);
        if (req.body.name != null) {
            topping.name = req.body.name;
        }
        if (req.body.price != null) {
            topping.price = req.body.price;
        }
        try {
            const updatedTopping = await topping.save();
            res.status(200).json(removedTopping);
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
}
const getAllToppings = async (req, res) => {
    try {
        const toppings = await Topping.find({});
        res.status(200).json(toppings);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
module.exports = {
    addTopping,
    removeTopping,
    updateTopping,
    getAllToppings
}
