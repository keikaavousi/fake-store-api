//initializes
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//port
const port = 9000

//routes
const ProductRoute = require('./routes/product')

//middleware
//app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use('/products', ProductRoute);
app.use('/',(req,res)=>{
    res.json({
        'hi':'hi'
    })
})


//mongoose
mongoose.set('useFindAndModify',false)
mongoose.connect('mongodb+srv://keikaavousi:qaqjob-rovjy3-pucSaq@cluster0-ffwd2.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(result=>{
    app.listen(process.env.PORT || port)
})
.catch(err=>{
    console.log(err)
})

//listen

// app.listen(process.env.PORT || port , ()=>{
//     console.log(`app is listening on post ${port}!`)
// })

