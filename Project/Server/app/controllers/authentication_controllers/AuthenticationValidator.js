// Tham khảo https://joi.dev/api/?v=17.4.2
const joi = require("joi");
const { getValidationResult } = require("../validatorHelper");

// Lớp xác thực dữ liệu truyền vào có hợp lệ hay không
// Xài joi để xác thực
module.exports = class AuthenticationValidator {
  getResult = (schema, data) => getValidationResult(schema, data);

  validateLoginModel = (loginModel = {}) => {
    const schema = joi.object({
      username: joi.string().min(5).max(70).alphanum().required(),
      password: joi.string().min(5).max(64).required(),
    });

    const result = this.getResult(schema, loginModel);

    return result;
  };

  validateToken(token) {
    const schema = joi.object({
      token: joi
        .string()
        .pattern(/^Bearer\s/i)
        .required(),
    });

    const result = this.getResult(schema, { token });

    return result;
  }
};
