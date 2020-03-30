const Product = require("../model/product")

module.exports.getAllProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0
  const sort = req.query.sort=="desc"?-1:1

  Product.find().limit(limit).sort({id:sort})
    .then(products => {
      res.json(products)
    })
    .catch(err=> console.log(err))
}

module.exports.getProduct = (req, res) => {
  const id = req.params.id

  Product.findOne({
    id
  })
    .then(products => {
      res.json(products)
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
    res.json({
      id:Product.find().count()+1,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category
    })
  }
}

module.exports.editProduct = (req, res) => {
  if (typeof req.body == undefined || req.body.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data"
    })
  } else {
    res.json({
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category
    })
  }
}

module.exports.deleteProduct = (req, res) => {
    if (typeof req.body == undefined || req.body.id == null) {
        res.json({
          status: "error",
          message: "something went wrong! check your sent data"
        })
      } else {
      Product.findById(req.params.id)
      .then(product=>{
        res.json({
            id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category
          })
      })
    }
  }
