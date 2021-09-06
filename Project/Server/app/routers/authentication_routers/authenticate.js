const JwtService = require("./JwtService");
const config = require("../../config");

//Middleware xác thực đăng nhập bằng bearer jwt
async function authenticate(req, res, next) {
  // Token = Bearer + jwtToken (ex: Bearer ecadawdwa...)
  const { authorization: token } = req.headers;

  const tokenRegex = /^Bearer\s/i;

  const validPattern = tokenRegex.test(token);
  if (!validPattern) {
    return res.status(400).json();
  }

  try {
    //Tách jwtToken ra khỏi Bearer
    const jwtToken = token.split(" ")[1];

    const jwt = new JwtService(config.secretKey);
    const { user } = jwt.getData(jwtToken);

    //Thêm người dùng hiện tại
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
}

module.exports = authenticate;
