const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Product = require("./product");
const User = require("./user");

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
  products: Array,
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
  }
});

module.exports = mongoose.model("cart", cartSchema);
