// Tham khảo https://joi.dev/api/?v=17.4.2
const Joi = require("joi");

<<<<<<< Updated upstream
// Xài Joi validate dữ liệu
module.exports = class ProductsValidator {
=======
const { getValidationResult } = require("../validatorHelper");

// Lớp xác thực dữ liệu truyền vào có hợp lệ hay không
// Xài joi để xác thực
module.exports = class ProductsValidator {
  getResult = (schema, data) => getValidationResult(schema, data);

>>>>>>> Stashed changes
  existProduct = (product) => {
    return product !== undefined;
  };

  validProduct = (product) => {
    return product !== undefined;
  };

  validNo = (pro_no) => {
    const schema = Joi.object({
      pro_no: Joi.number().min(0).max(number.max).required(),
    });
<<<<<<< Updated upstream
    return schema.validate({ pro_no });
  };

  // Kiểm tra tên hợp lệ
  validName = (pro_name) => {
    return pro_name;
=======

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
>>>>>>> Stashed changes
  };
};
