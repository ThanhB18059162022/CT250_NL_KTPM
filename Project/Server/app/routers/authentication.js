const jwt = require("jsonwebtoken");
require("../.env_manager")();

//Middleware xác thực jwt token

const authenticate = (req, res, next) => {
  const authToken = req.headers["authorization"];

  const tokenRegex = /^Bearer\s/i;

  const notValidPattern = !tokenRegex.test(authToken);

  if (notValidPattern) {
    return res.status(400).json({});
  }

  //Tách token bearer
  const token = authToken.split(" ")[1];

  const secretKey = process.env.SECRET_KEY;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ err });

    //Thêm người dùng hiện tại
    req.user = decoded.user;

    return next();
  });
};

module.exports = authenticate;
