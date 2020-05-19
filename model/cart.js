const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Product = require("./product");
const User = require("./user");
const Discount = require("./discount");
const Shipping = require("./shipping")

const cartSchema = new schema({
  id:{
    type:Number,
    required:true
  },
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: String,
  address: {
    type: String,
    required: true,
  },
  // products: [
  //   {
  //     id:{
  //        type:schema.Types.ObjectId,
  //        ref:Product,
  //        required: true
  //     },
  //     quantity:{
  //       type:Number,
  //       required: true
  //     },
  //     price:{
  //       type:Number,
  //       required: true
  //     }
  //   }
  // ],
  products:Array,
  total:{
    type:Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
  },
  delivered:{
    type:Boolean,
    required: true
  },
  printed:{
    type:Boolean,
    required: true
  },
  discount:{
    type: schema.Types.ObjectId,
    ref:Discount
    // type:String,
    // required:false
  },
  region:{
    type: schema.Types.ObjectId,
    ref:Shipping
  }
});

module.exports = mongoose.model("cart", cartSchema);
