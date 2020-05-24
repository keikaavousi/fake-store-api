const jwt = require("jsonwebtoken");


module.exports.ensureToken = (req, res, next) => {
  // if (req.url == "/auth/login") {
  //   next();
  // } else {
  //   const authcookie = req.cookies.auth;
  //   console.log(' req.cookies', authcookie)
    
  //   jwt.verify(authcookie, "secret_key", (err, data) => {
  //     console.log(err)
  //     if (err) {
  //       res.sendStatus(403);
  //     } else if (data.user) {
  //       req.user = data.user;
  //       next();
  //     }
  //   });
  // }
  const authcookie = req.cookies.auth;
   console.log(' req.cookies', authcookie)

  const authHeader = req.headers.authorization;

  if (authHeader) {
      jwt.verify(authHeader, "secret_key", (err, data) => {
          if (err) {
              return res.sendStatus(403);
          }else if (data.user) {
                req.user = data.user;
                next();
              }
      });
  }
};


