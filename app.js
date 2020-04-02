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
const productRoute = require('./routes/product')
const homeRoute = require('./routes/home')
const cartRoute = require('./routes/cart')
const userRoute = require('./routes/user')

//middleware
app.use(cors())

app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//view engine
app.set('view engine', 'ejs');
app.set('views', 'views')


app.disable('view cache');

// app.use('/',(req,res)=>{
//     res.json({
//         'hi':'hi'
//     })
// })
app.use('/',homeRoute)
app.use('/products', productRoute);
app.use('/carts',cartRoute)
app.use('/users',userRoute)


//mongoose
mongoose.set('useFindAndModify',false)
mongoose.connect('mongodb+srv://keikaavousi:qaqjob-rovjy3-pucSaq@cluster0-ffwd2.mongodb.net/shop?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(result=>{
    app.listen(process.env.PORT || port,()=>{
        console.log('connect')
    })
})
.catch(err=>{
    console.log(err)
})


module.exports = app
//listen

// app.listen(process.env.PORT || port , ()=>{
//     console.log(`app is listening on post ${port}!`)
// })

