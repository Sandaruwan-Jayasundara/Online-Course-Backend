const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
    itemId:{
        type: String,
        required: true,
        trim: true
    },
    itemImage:{
        type: String,
        required: true,
        trim: true
    },
    itemTitle: {
        type: String,
        required: true,
        trim: true
    },
    menuId: {
        type: String,
        required: true,
        trim: true
    },
    qty: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    total: {
        type: Number,
        required: true,
        trim: true
    },
});
module.exports = mongoose.model('cart', cartSchema);
