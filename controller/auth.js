const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.changePassword = (req, res) => {

  const username = req.user;
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;

  let newinfo = {
    username: username,
    password: "",
  };

  bcrypt.hash(newpassword, 12, function (err, hash) {
    newinfo.password = hash;
  });

  User.findOne({
    username: username,
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(oldpassword, user.password, function (err, rs) {
          if (err) {
            console.log(err);
          }
          if (rs) {
            User.findByIdAndUpdate(user._id, newinfo, { new: true }).then(
              (result) => {
                res.json({ msg: "Password Changed Successfully" });
              }
            );
          } else {
            res.json({ msg: "Old password is incorrect" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "There is a problem, please try again later" });
    });
};


module.exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    User.findOne({
    username
  })
    .then(user => {
      if (!user) {
        console.log('no user found')
        res.json({msg: "username or password is incorrect"});
      }
      else{
        bcrypt.compare(password, user.password,function(err,rs){
          if(err){
            console.log(err)
            res.json({msg: "username or password is incorrect"});
        }
          if(rs){
            const token = jwt.sign({user:user.username},'secret_key')
            res.cookie('authcookie',token,{maxAge:900000,httpOnly:true})
              res.json({
                token
              })
          }
          else{
            res.json({msg: "username or password is incorrect"});
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
};
