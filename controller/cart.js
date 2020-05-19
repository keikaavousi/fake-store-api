const Cart = require("../model/cart");
const Product = require("../model/product");
const ZarinpalCheckout = require('zarinpal-checkout');

module.exports.getAllCarts = (req, res) => {
  //const limit = Number(req.query.limit) || 0;
 // const sort = req.query.sort == "desc" ? -1 : 1;
 const startDate = req.query.startdate || new Date("1970-1-1");
  //const endDate = req.query.enddate || new Date();
  const completed = req.query.completed || true
  

  Cart.find({
     //date: { $gte: new Date(startDate), $lt: new Date(endDate) },
    date: { $gte: new Date(startDate)},
    completed:completed
  })
  // .populate('products.id')
  // .select('title')
    //.limit(limit)
    .sort({ id: -1,printed:false })
    .then((carts) => {
      console.log(carts)
      res.json(carts);
    })
    .catch((err) => console.log(err));
};


module.exports.getQuantity = (req,res) => {
  let date = new Date()
  let today = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
  let lastMinutes = new Date(new Date().setMinutes(new Date().getMinutes()-10+270))
  let sold = 0;


  id = req.params.id


    Cart.find({ 
      $or:[
        { 
        date: { $gte: today },
        completed:true,
        "products.id":id
      },
      { 
        date: { 
          $gte: lastMinutes
         },
        completed:false,
        "products.id":id
      }
    ]
     
    })
    
    .then(cart=>{
      cart.forEach(n=>{
        n.products.forEach(l=>{
          if(l.id==id){
            sold+=l.quantity
          }
        })
      })

     Product.findById(id).then(product=>res.json(product.quantity-sold))
    })
}





module.exports.getCartsbyUserid = (req, res) => {
  const userId = req.params.userid;
  const startDate = req.query.startdate || new Date("1970-1-1");
  const endDate = req.query.enddate || new Date();

  console.log(startDate, endDate);
  Cart.find({
    userId,
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  })
    .select("-_id -products._id")
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => console.log(err));
};

module.exports.getSingleCart = (req, res) => {
  const id = req.params.id;
  Cart.findById(id)
    .select()
    .then((cart) => res.json(cart))
    .catch((err) => console.log(err));
};

module.exports.addCart = (req, res) => {
  console.log(req.body);

  let cartCount = 0;
  Cart.find()
    .countDocuments(function (err, count) {
      cartCount = count;
    })
    .then(() => {
      const cart = new Cart({
        id: cartCount,
        date: new Date(),
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        products: req.body.products,
        total: req.body.total,
        completed: req.body.completed,
        delivered: req.body.delivered,
        printed: req.body.printed,
        region: req.body.region
      });
      cart
        .save()
        .then((cart) =>
          res.json({
            status: "created",
            cart,
          })
        )
        .catch((err) => console.log(err));
    });
};

module.exports.editCart = (req, res) => {

  Cart.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        delivered: req.body.delivered,
      }
    }
  )
  .then((cart) =>res.json(cart))
  .catch(err=>console.log(err))
  // Product.findById(id).then((product)=>{

  // })

  // Product.findByIdAndUpdate(pid,editProduct, {new: true})
  // .then(product => {
  //      res.json(product)
  //   })
  // .catch(
  //   err => console.log(err)
  // )
  //       res.json({
  //         completed:req.body.completed,
  //         delivered:req.body.delivered
  //       })
};


module.exports.editCartCompleted = (req,res)=>{
  Cart.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        completed: req.body.completed,
      },
    }
  )
  .then((Cart) =>{
    res.json(Cart)
  })
  .catch(err=>console.log(err))
  }


  module.exports.editCartPrinted = (req,res) => {
    Cart.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          printed: true,
        },
      }
    )
    .then((cart) =>{
      console.log(cart)
      res.json(cart)
    })
    .catch(err=>console.log(err))
  }

module.exports.deleteCart = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    Cart.findOne({ id: req.params.id })
      .select("-_id -products._id")
      .then((cart) => {
        res.json(cart);
      })
      .catch((err) => console.log(err));
  }
};


module.exports.payment = (req,res) => {
  console.log(req.params.id)
  console.log(req.body)
  var zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
  zarinpal.PaymentRequest({
    Amount: req.body.total+'000',
    CallbackURL: `http://localhost:3333/invoice?cart=${req.params.id}`,
    Description: 'سفارش آنلاین آشپزخانه ویترین',
    Email: req.body.email,
    Mobile: req.body.tel
  }).then(response => {
    if (response.status === 100) {
      //console.log(response.url);
      res.json({url:response.url})
    }
  }).catch(err => {
    console.error(err);
  })
}