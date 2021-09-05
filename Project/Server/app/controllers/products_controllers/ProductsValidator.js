// Tham khảo https://joi.dev/api/?v=17.4.2
const Joi = require("joi");

const { getValidationResult } = require("../validatorHelper");

// Lớp xác thực dữ liệu truyền vào có hợp lệ hay không
// Xài joi để xác thực
module.exports = class ProductsValidator {
  getResult = (schema, data) => getValidationResult(schema, data);

  existProduct = (product) => {
    return product !== undefined;
  };

  validateProduct = (product) => {
    return product !== undefined;
  };

  // Kiểm tra mã hợp
  validateNo = (prod_no) => {
    const schema = Joi.object({
      prod_no: Joi.number().min(0).max(number.max).required(),
    });

    const result = this.getResult(schema, { prod_no });

    return result;
  };

  // Kiểm tra tên hợp lệ
  validateName = (prod_name) => {
    const schema = Joi.object({
      prod_name: Joi.string().min(5).max(50).required(),
    });

    const result = this.getResult(schema, { prod_name });

    return result;
  };
};
