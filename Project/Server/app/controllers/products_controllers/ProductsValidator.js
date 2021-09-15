// Tham khảo https://joi.dev/api/?v=17.4.2
const Joi = require("joi");

const { getValidationResult } = require("../validatorHelper");

// Lớp xác thực dữ liệu truyền vào có hợp lệ hay không
// Xài joi để xác thực
module.exports = class ProductsValidator {
  // Kiểm tra tồn tại
  existProduct = (product) => {
    return product?.prod_no > 0;
  };

  // Kiểm tra mã hợp lệ
  validateNo = (prod_no) => {
    const schema = Joi.object({
      prod_no: Joi.number().integer().min(0).required(),
    });

    const result = getValidationResult(schema, { prod_no });

    return result;
  };

  // Kiểm tra tên hợp lệ
  validateName = (prod_name) => {
    const schema = Joi.object({
      prod_name: Joi.string().min(5).max(50).required(),
    });

    const result = getValidationResult(schema, { prod_name });

    return result;
  };

  // Kiểm tra sản phẩm hợp lệ
  validateProduct = (product) => {
    return product !== undefined;
  };
};
