const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const schema = mongoose.Schema

const productSchema = new schema({
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
    description:String,
    image:String,
    category:String
})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('product',productSchema)