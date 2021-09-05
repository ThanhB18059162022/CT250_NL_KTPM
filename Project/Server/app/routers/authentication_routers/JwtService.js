// Tham khảo jwt https://www.youtube.com/watch?v=mbsmsi7l3r4
// https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = class JwtService {
  constructor() {
    this.secretKey = config.secretKey || "SECRET_KEY is not exist";
  }

  // Tạo token mặc định hết hạn trong 1h
  getToken = (user, options = { expiresIn: "1h" }) => {
    return jwt.sign({ user }, this.secretKey, options);
  };
};
