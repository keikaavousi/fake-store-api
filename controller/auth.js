const User = require("../model/user");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      if (username && password) {
        const user = await User.findOne({
          username: username,
          password: password,
        });

        if (user) {
          res.json({
            token: jwt.sign({ user: username }, "secret_key"),
          });
        } else {
          res.status(401);
          res.send("username or password is incorrect");
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
};
