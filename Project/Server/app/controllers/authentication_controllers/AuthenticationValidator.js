const Validator = require("../Validator");

module.exports = class AuthenticationValidator extends Validator {
  // Kiểm tra mẫu đăng nhập
  validateLoginModel = (loginModel = {}) => {
    const schema = this.joi.object({
      username: this.joi.string().min(5).max(70).alphanum().required(),
      password: this.joi.string().min(5).max(64).required(),
    });

    const result = this.getValidationResult(schema, loginModel);

    return result;
  };

  // Kiểm tra jwt token
  validateToken(token) {
    const schema = this.joi.object({
      token: this.joi
        .string()
        .pattern(/^Bearer\s/i)
        .required(),
    });

    const result = this.getValidationResult(schema, { token });

    return result;
  }
};
