// Tham khảo https://joi.dev/api/?v=17.4.2
//https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs

const joi = require("joi");
const { getValidationResult } = require("../validatorHelper");

module.exports = class FeedbackValidator {
  constructor(productValidator) {
    this.productValidator = productValidator;
  }

  // Kiểm tra mã phản hồi
  validateFeedbackNo = (fb_no) => {
    const schema = joi.object({
      fb_no: joi.number().integer().min(0).required(),
    });

    const result = getValidationResult(schema, { fb_no });

    return result;
  };

  // Kiểm tra phản hồi
  validateFeedback = () => {
    return { hasAnyError: true };
  };

  // Kiểm tra mã sản phẩm
  validateProductNo = (prod_no) => {
    return this.productValidator.validateNo(prod_no);
  };
};
