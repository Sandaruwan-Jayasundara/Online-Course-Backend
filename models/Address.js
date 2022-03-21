const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    
    BuyerName:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    Street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    province: {
        type: String,
        required: true,
        trim: true
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Orders',
        required: false,
}
});
module.exports = mongoose.model('Address', AddressSchema);


