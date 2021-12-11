const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    id:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        }
    },
    address:{
        city:String,
        street:String,
        number:Number,
        zipcode:String,
        geolocation:{
            lat:String,
            long:String
        }
    },
    phone:String
})

module.exports = mongoose.model('user',userSchema)