//Middleware xác thực đăng nhập bằng bearer jwt
async function authenticate(req, res, next) {
  // Token = Bearer + jwtToken (ex: Bearer ecadawdwa...)
  const token = req.headers["authorization"];

  const tokenRegex = /^Bearer\s/i;

  const validPattern = tokenRegex.test(token);
  if (!validPattern) {
    return res.status(400).json({});
  }

  //Tách jwtToken ra khỏi Bearer
  const jwtToken = token.split(" ")[1];

  const secretKey = config.secretKey || "SECRET_KEY is not exist";
  jwt.verify(jwtToken, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ err });

    //Thêm người dùng hiện tại
    req.user = decoded.user;
  });
  return next();
}

module.exports = authenticate;
