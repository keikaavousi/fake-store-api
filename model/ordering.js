const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderingSchema = new Schema ({
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        required:true
    },
    enabled:{
        type:Boolean,
        required:false
    }
})

module.exports = mongoose.model('Ordering',OrderingSchema)