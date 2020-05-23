const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
};

module.exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
  .select(['-password'])
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
};

module.exports.addUser = (req, res) => {
  let newUser = req.body;
  bcrypt.hash(newUser.password, 12, function (err, hash) {
    newUser.password = hash;
  });
  const user = new User(newUser);

  user.save()
    .then(() => res.json({ status: "inserted" }))
    .catch((err) => console.log(err));
};

module.exports.editUser = (req, res) => {
  const id = req.params.id;
  let editedUser = req.body;
  bcrypt.hash(editedUser.password, 12, function (err, hash) {
    editedUser.password = hash;
  });

  User.findByIdAndUpdate(id, editedUser)
    .then(() => res.json({ status: "updated" }))
    .catch((err) => console.log(err));
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
