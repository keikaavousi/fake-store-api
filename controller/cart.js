const Cart = require('../model/cart')

module.exports.getAllCart = (req,res) => {
    const limit = Number(req.query.limit) || 0
    const sort = req.query.sort=="desc"?-1:1
    const userId = req.query.userid || 0
    const startDate = req.query.startdate
    const endDate = req.query.enddate

    Cart.find({
        userId,
        date:{ $gte:ISODate(startDate), $lt:ISODate(endDate)}
    }).select(['-_id']).limit(limit).sort({id:sort})
    .then(carts=>{
        res.json(carts)
    })
    .catch(err=>console.log(err))
}

module.exports.getSingleCart = (req,res) => {
    const id = req.params.id
    Cart.findOne({
        id
    })
    .then(cart => res.json(cart))
    .catch(err=> console.log(err))
}

module.exports.addCart = (req,res) => {
    if (typeof req.body == undefined) {
        res.json({
          status: "error",
          message: "data is undefined"
        })
      } else {
        res.json({...req.body,id:Cart.find().count()+1})
      }
}


module.exports.editCart = (req,res) => {
    if (typeof req.body == undefined || req.params.id == null) {
        res.json({
          status: "error",
          message: "something went wrong! check your sent data"
        })
      } else {
        res.json({...req.body,id:req.params.id})
      }
}

module.exports.deleteCart = (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
        res.json({
          status: "error",
          message: "something went wrong! check your sent data"
        })
      } else {
      Cart.findById(req.params.id)
      .then(cart=>{
        res.json(cart)
      })
    }
  }
