const Shipping = require('../model/shipping')

module.exports.getAllShippings = (req, res) => {
  Shipping.find().sort({
      title: 1
    })
    .then(dis => {
      res.json(dis)
    })
    .catch(err => console.log(err))
}

module.exports.getShippingtByTitle = (req,res) => {
  console.log(req.params.title)
  Shipping.findOne({
    title:req.params.title
  })
  .then(dis => {
    res.json(dis)
  })
  .catch(err => console.log(err))
}

module.exports.getShipping = (req, res) => {
  const id = req.params.id

  Shipping.findById(id).select()
    .then(ship => {
      res.json(ship)
    })
    .catch(err => console.log(err))
}



module.exports.addShipping = (req, res) => {
  console.log(req.body)
        const shipping = new Shipping({
            title:req.body.title,
            price:req.body.price,
        })
        shipping.save()
        .then(ship=>res.json(ship))
        .catch(err=>console.log(err))
}

module.exports.editShipping = (req, res) => {
  const id = req.params.id

  const editedShipping = {
    title:req.body.title,
    price:req.body.price
  }

  Shipping.findByIdAndUpdate(id,editedShipping, {new: true})
  .then(ship => {
       res.json(ship)
    })
  .catch(
    err => console.log(err)
  )
}

module.exports.editTitle = (req,res) => {
  console.log(req.body.enabled)
  Shipping.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
      },
    }
  )
  .then((Shipping) =>{
    res.json(Shipping)
  })
  .catch(err=>console.log(err))
}

module.exports.editPrice = (req,res) => {
  console.log(req.body.count)
  Shipping.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        price: req.body.price,
      },
    }
  )
  .then((Shipping) =>{
    res.json(Shipping)
  })
  .catch(err=>console.log(err))
}



module.exports.deleteShipping = (req, res) => {
    const id = req.params.id
    Shipping.findByIdAndDelete(id)
    .then(()=>res.json({result:'deleted'}))
    .catch(err=>console.log(err))
}