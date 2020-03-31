const User = require('../model/user')

module.exports.getAllUser = (req,res) => {
  const limit = Number(req.query.limit) || 0
  const sort = req.query.sort=="desc"?-1:1

  User.find().select(['-_id']).limit(limit).sort({id:sort})
    .then(users => {
      res.json(users)
    })
    .catch(err=> console.log(err))
}

module.exports.getUser = (req, res) => {
    const id = req.params.id
  
    User.findOne({
      id
    }).select(['-_id'])
      .then(user => {
        res.json(user)
      })
      .catch(err=> console.log(err))
  }



  module.exports.addUser = (req, res) => {
    if (typeof req.body == undefined) {
      res.json({
        status: "error",
        message: "data is undefined"
      })
    } else {
      res.json({...req.body,id:User.find().count()+1})
    }
  }
  
  module.exports.editUser = (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
      res.json({
        status: "error",
        message: "something went wrong! check your sent data"
      })
    } else {
      res.json({...req.body,id:req.params.id})
    }
  }
  
  module.exports.deleteUser = (req, res) => {
      if (typeof req.body == undefined || req.params.id == null) {
          res.json({
            status: "error",
            message: "something went wrong! check your sent data"
          })
        } else {
        User.findById(req.params.id)
        .then(user=>{
          res.json(user)
        })
      }
    }
  
  