const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
  Date:{
      type: Date,
      required:true
  },
    cartItems: {
        type: Array,
        required: true,
        trim: true
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required: false,
}
});
module.exports = mongoose.model('Order', OrderSchema);


