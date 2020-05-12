const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MediaSchema = new Schema ({
    title:{
        type:String,
        required:false
    },
    alt:{
        type:String,
        required:false
    },
    caption:{
        type:String,
        required:false
    },
    url:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model('Media',MediaSchema)