const jwt = require("jsonwebtoken");


module.exports.ensureToken = (req, res, next) => {
  if (req.url == "/auth/login") {
    next();
  } else {
    const authcookie = req.cookies.authcookie;
    jwt.verify(authcookie, "secret_key", (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else if (data.user) {
        req.user = data.user;
        next();
      }
    });
  }
};
