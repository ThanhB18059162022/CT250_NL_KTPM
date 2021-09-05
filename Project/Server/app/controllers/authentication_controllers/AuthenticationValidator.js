// Lớp xác thực dữ liệu truyền vào có hợp lệ hay không
// Xài joi để xác thực
const joi = require("joi");
const { getValidationResult } = require("../validatorHelper");

module.exports = class AuthenticationValidator {
  getResult = (schema, data) => getValidationResult(schema, data);

  validateLoginModel = (loginModel) => {
    const schema = joi.object({
      username: joi.string().min(5).max().required(),
      password: joi.string().min(5).max().required(),
    });

    const result = this.getResult(schema, loginModel);

    return result;
  };
};
