const jwt = require("jsonwebtoken");
const secret = "secret";
const jwtAuthorization = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("token not provided");
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).send("invalid token");
    req.user = user;
    next();
  });
};

module.exports = {
  jwtAuthorization, 
  secret
}
