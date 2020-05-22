const Product = require("../model/product")

module.exports.getAllProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0
  const sort = req.query.sort=="desc"?-1:1
  const search = req.query.search || ''

  //Product.find({ "title": { "$regex": search, "$options": "i" } })
  Product.find()
  .select().limit(limit).sort({id:sort})
    .then(products => {
      console.log(products)
      res.json(products)
    })
    .catch(err=> console.log(err))
}

module.exports.getProduct = (req, res) => {
  const id = req.params.id

  Product.findById(id)
  .select()
    .then(product => {
      res.json(product)
    })
    .catch(err=> console.log(err))
}

module.exports.getProductByTitle = (req,res) => {
  const slug = req.params.slug

  Product.findOne({slug:slug})
  .select()
    .then(product => {
      res.json(product)
    })
    .catch(err=> console.log(err))
}

module.exports.getProductsInCategory = (req,res) => {
  const category = req.params.category
  Product.find({
    category
  })
  .then(products => {
    res.json(products)
  })
  .catch(err=> console.log(err))
}

module.exports.addProduct = (req, res) => {
  console.log(req.body)
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined"
    })
  } else {
    let productCount = 0;
    Product.find().countDocuments(function(err, count){
      productCount = count
  })
  .then(() => {
    const product = new Product({
      id: productCount + 1,
      title:req.body.title,
      slug:req.body.slug,
      ingredients:req.body.ingredients,
      price:req.body.price,
      description:req.body.description,
      image:req.body.image,
      preview:req.body.preview,
      category:req.body.category,
      mintime:req.body.mintime,
      maxtime:req.body.maxtime,
      recipe:req.body.recipe,
      qunatity:0
    })
    product.save()
      .then(product => res.json(product))
      .catch(err => console.log(err))
    //res.json(product)
  })
  }
}

module.exports.editProduct = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data"
    })
  } else {
    const pid = req.params.id
    const editProduct = {
      title:req.body.title,
      slug:req.body.slug,
      ingredients:req.body.ingredients,
      price:req.body.price,
      description:req.body.description,
      image:req.body.image,
      preview:req.body.preview,
      category:req.body.category,
      mintime:req.body.mintime,
      maxtime:req.body.maxtime,
      recipe:req.body.recipe,
      quantity:req.body.quantity,
    }
    Product.findByIdAndUpdate(pid,editProduct, {new: true})
    .then(product => {
         res.json(product)
      })
    .catch(
      err => console.log(err)
    )
  }
}

module.exports.editProductPrice = (req,res)=>{
  Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        price: req.body.price,
      },
    }
  )
  .then((product) =>{
    console.log(product)
    res.json(product)
  })
  .catch(err=>console.log(err))
}




module.exports.editProductQuantity = (req,res)=>{
  Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        quantity: req.body.quantity,
      },
    }
  )
  .then((product) =>{
    console.log(product)
    res.json(product)
  })
  .catch(err=>console.log(err))
  }



module.exports.deleteProduct = (req, res) => {
  const pid = req.params.id
    
  Product.findByIdAndDelete(pid)
  .then(()=>{
    res.json({
      'result':'deleted'
    })
  })
  .catch((err)=>{
    console.log(err)
  })
  }
