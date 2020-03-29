//initializes
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

//port
const port = 9000

//routes
const ProductRoute = require('./routes/product')

//middleware
app.use(cors())

app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


// app.use('/',(req,res)=>{
//     res.json({
//         'hi':'hi'
//     })
// })
app.use('/products', ProductRoute);


//mongoose
mongoose.set('useFindAndModify',false)
mongoose.connect('mongodb+srv://keikaavousi:qaqjob-rovjy3-pucSaq@cluster0-ffwd2.mongodb.net/shop?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(result=>{
    app.listen(process.env.PORT || port,()=>{
        console.log('connected!')
    })
})
.catch(err=>{
    console.log(err)
})

//listen

// app.listen(process.env.PORT || port , ()=>{
//     console.log(`app is listening on post ${port}!`)
// })

