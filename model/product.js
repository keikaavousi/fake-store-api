const mongoose = require('mongoose')
const schema = mongoose.Schema
const Media = require('./media')

const productSchema = new schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    mintime:{
        type:String,
        required:true
    },
   
    maxtime:{
        type:String,
        required:true
    }, 
    ingredients:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    description:String,
    // image:{
    //     type:schema.Types.ObjectId,
    //     ref:Media
    // },
    image:String,
    preview:String,
    category:String,
    recipe:Array,
    quantity:Number
})

module.exports = mongoose.model('product',productSchema)