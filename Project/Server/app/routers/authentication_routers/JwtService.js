// Tham khảo jwt https://www.youtube.com/watch?v=mbsmsi7l3r4
// https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken");

module.exports = class JwtService {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  // Tạo token mặc định hết hạn trong 1h
  getToken = (user, options = { expiresIn: "1h" }) => {
    return jwt.sign({ user }, this.secretKey, options);
  };

  // Lấy ra thông tin người dùng từ token
  // Throw error nếu token không hợp lệ
  getUser = (token) => {
    return jwt.verify(token, this.secretKey);
  };
};
