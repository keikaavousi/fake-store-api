const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shippingSchema = new schema({
    title: { 
      type: String, 
      required: true 
    },
    price:{
        type:Number,
        required:true
    },
});

module.exports = mongoose.model('shipping',shippingSchema)
