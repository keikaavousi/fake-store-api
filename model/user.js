const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    id:{
        type:Number,
        required:true,
        unique: true,
        index: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        index: true
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

userSchema.indexes([
    [ { id: 1 }, { unique: true, background: true } ],
    [ { email: 1 }, { unique: true, background: true } ],
])
module.exports = mongoose.model('user',userSchema)