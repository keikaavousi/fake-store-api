const Cart = require("../model/cart");

module.exports.getAllCarts = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;
  const startDate = req.query.startdate || new Date("1970-1-1");
  const endDate = req.query.enddate || new Date();
  

  Cart.find({
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  })
    .select()
    .limit(limit)
    .sort({ id: sort })
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => console.log(err));
};


module.exports.getQuantity = (req,res) => {
  let date = new Date()
  let today = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`

 
    Cart.find({ 
      $or:[
        { 
        date: { $gte: today },
        completed:true,
        "products.id":req.params.id
      },
      { 
        date: { 
          $lt: new Date(), 
          $gte: new Date(new Date().setDate(new Date().getMinutes()-10))
         },
        completed:false,
        "products.id":req.params.id
      }
    ]
     
    })
    .then(cart=>res.json(cart))
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
  Cart.findOne({
    id,
  })
    .select("-_id -products._id")
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
      },
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
