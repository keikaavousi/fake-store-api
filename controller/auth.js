const User = require("../model/user");

module.exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    User.findOne({
      username,
    })
      .then((user) => {
        if (!user) {
          res.json({
            status: "Error",
            msg: "username or password is incorrect",
          });
        } else {
          console.log(user);
          res.json({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
