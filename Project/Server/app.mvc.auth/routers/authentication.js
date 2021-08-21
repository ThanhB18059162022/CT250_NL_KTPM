//Xác thực với jwt
const jwt = require("jsonwebtoken");
//Đọc file env
require("dotenv").config();

//Middleware xác thực 

/* #region Synchronous */

const authenticate = (req, res, next) => {
  const authToken = req.headers['authorization'];

  //Nếu khác null tách bearer
  const token = authToken && authToken.split(" ")[1];

  try {
    const secretKey = process.env.SECRET_TOKEN;

    //Có exception khi lỗi secretKey
    const value = jwt.verify(token, secretKey);

    //Thêm người dùng hiện tại
    req.user = value.user;
    next();

  } catch (error) {

    //Token không có bị sửa hoặc hết hạn
    return res.status(401).json(error);
  }
}

/* #endregion */

/* #region  Asynchronous */
const authenticateAsync = (req, res, next) => {
  const authToken = req.headers['authorization'];

  //Nếu khác null tách bearer
  const token = authToken && authToken.split(" ")[1];

  const secretKey = process.env.SECRET_TOKEN;

  //Có exception khi lỗi secretKey
  jwt.verify(token, secretKey, (err, data) => {
     //Token không có bị sửa hoặc hết hạn
     if(err) return res.status(401).send(err);

     //Thêm người dùng hiện tại
    req.user = data.user;
    next();
  });
}
/* #endregion */

module.exports = {authenticate, authenticateAsync};
