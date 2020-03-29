const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductSchema = new schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    category:{
        type:String
    }
})

module.exports = mongoose.model('product',ProductSchema)