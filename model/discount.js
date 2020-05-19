const mongoose = require("mongoose");
const schema = mongoose.Schema;

const discountSchema = new schema({
    title: { 
      type: String, 
      required: true 
    },
    discount:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        default:0
    },
    enabled:{
        type:Boolean,
        required: true
    },
    // used:{
    //     type:Number,
    //     default:0
    // }
});

module.exports = mongoose.model('discount',discountSchema)
