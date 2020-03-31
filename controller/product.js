const Product = require("../model/product")

module.exports.getAllProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0
  const sort = req.query.sort=="desc"?-1:1

  Product.find().select(['-_id']).limit(limit).sort({id:sort})
    .then(products => {
      res.json(products)
    })
    .catch(err=> console.log(err))
}

module.exports.getProduct = (req, res) => {
  const id = req.params.id

  Product.findOne({
    id
  }).select(['-_id'])
    .then(product => {
      res.json(product)
    })
    .catch(err=> console.log(err))
}

module.exports.getProductsInCategory = (req,res) => {
  const category = req.params.category
  const limit = Number(req.query.limit) || 0
  const sort = req.query.sort=="desc"?-1:1

  Product.find({
    category
  }).limit(limit).sort({id:sort})
  .then(products => {
    res.json(products)
  })
  .catch(err=> console.log(err))
}

module.exports.addProduct = (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined"
    })
  } else {
    
    Product.find().countDocuments(function(err, count){
      res.json({...req.body,id:count+1})
  });

    
  }
}

module.exports.editProduct = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data"
    })
  } else {
    res.json({...req.body,id:req.params.id})
  }
}

module.exports.deleteProduct = (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
        res.json({
          status: "error",
          message: "something went wrong! check your sent data"
        })
      } else {
      Product.findOne({
        id:req.params.id
      })
      .then(product=>{
        res.json(product)
      })
      .catch(err=>console.log(err))
    }
  }
