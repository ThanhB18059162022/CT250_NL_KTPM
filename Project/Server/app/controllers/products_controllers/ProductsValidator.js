// Tham khảo https://joi.dev/api/?v=17.4.2
const Joi = require("joi");

// Xài Joi validate dữ liệu
module.exports = class ProductsValidator {
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
    return schema.validate({ pro_no });
  };

  // Kiểm tra tên hợp lệ
  validName = (pro_name) => {
    return pro_name;
  };
};
