const Discount = require('../model/discount')
const Cart = require('../model/cart')

module.exports.getAllDiscount = (req, res) => {
  Discount.find().sort({
      _id: -1
    })
    .then(dis => {
      res.json(dis)
    })
    .catch(err => console.log(err))
}
module.exports.getDiscountByTitle = (req,res) => {
  console.log(req.params.title)
  Discount.findOne({
    title:req.params.title
  })
  .then(dis => {
    if(dis.count!=0){
      Cart.countDocuments({discount:dis._id,completed:true}, function(err, c) {
        console.log(c,dis.count)
        if(c<dis.count){
          res.json({_id:dis._id,val:dis.discount})
        }
        else{
          res.json({status:'finished'})
        }
   });
  }else{
    res.json({_id:dis._id,val:dis.discount})
  }
  })
  .catch(err => console.log(err))
}

module.exports.getDiscount = (req, res) => {
  const id = req.params.id

  Discount.findById(id).select()
    .then(dis => {
      res.json(dis)
    })
    .catch(err => console.log(err))
}



module.exports.addDiscount = (req, res) => {
  console.log(req.body)
        const discount = new Discount({
            title:req.body.title,
            discount:req.body.discount,
            count:req.body.count,
            enabled:req.body.enabled,
        })
        discount.save()
        .then(dis=>res.json(dis))
        .catch(err=>console.log(err))
}

module.exports.editDiscount = (req, res) => {
  const id = req.params.id

  const editedDiscount = {
    title:req.body.title,
    discount:req.body.discount,
    count:req.body.count,
    enabled:req.body.enabled,
    // used:req.body.used,
  }
  Discount.findByIdAndUpdate(id,editedDiscount, {new: true})
  .then(dis => {
       res.json(dis)
    })
  .catch(
    err => console.log(err)
  )
}

module.exports.editEnabled = (req,res) => {
  console.log(req.body.enabled)
  Discount.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        enabled: req.body.enabled,
      },
    }
  )
  .then((discount) =>{
    res.json(discount)
  })
  .catch(err=>console.log(err))
}

module.exports.editCount = (req,res) => {
  console.log(req.body.count)
  Discount.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        count: req.body.count,
      },
    }
  )
  .then((discount) =>{
    res.json(discount)
  })
  .catch(err=>console.log(err))
}



module.exports.deleteDiscount = (req, res) => {
    const id = req.params.id
    Discount.findByIdAndDelete(id)
    .then(()=>res.json({result:'deleted'}))
    .catch(err=>console.log(err))
}