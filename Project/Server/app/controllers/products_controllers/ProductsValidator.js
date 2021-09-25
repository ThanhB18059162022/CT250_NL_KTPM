const Validator = require("../Validator");

module.exports = class ProductsValidator extends Validator {
  // Kiểm tra mã hợp lệ
  validateNo = (prod_no) => {
    const schema = this.joi.object({
      prod_no: this.joi.number().integer().min(0).required(),
    });

    const result = this.getValidationResult(schema, { prod_no });

    return result;
  };

  // Kiểm tra tên hợp lệ
  validateName = (prod_name) => {
    const schema = this.joi.object({
      prod_name: this.joi.string().min(5).max(50).required(),
    });

    const result = this.getValidationResult(schema, { prod_name });

    return result;
  };

  // Kiểm tra sản phẩm hợp lệ
  validateProduct = (product) => {
    return product !== undefined;
  };
};
