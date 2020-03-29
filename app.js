//initializes
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 9000

//routes
const ProductRoute = require('./routes/product')

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use('/products', ProductRoute);
app.use('/',(req,res)=>{
    res.json({
        'hi':'hi'
    })
})

//listen
app.listen(process.env.PORT || port , ()=>{
    console.log(`app is listening on post ${port}!`)
})

