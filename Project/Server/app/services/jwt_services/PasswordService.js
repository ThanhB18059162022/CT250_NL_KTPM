const crypto = require("crypto");

module.exports = class PasswordService {
  getHasPassword = (loginModel) =>
    crypto
      .createHash("sha256")
      .update(`${loginModel.username}-${loginModel.password}`)
      .digest("hex");
};
