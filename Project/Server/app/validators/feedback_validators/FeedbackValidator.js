const Validator = require("../Validator");

module.exports = class FeedbackValidator extends Validator {
  constructor(productValidator) {
    super();
    this.productValidator = productValidator;
  }

  // Kiểm tra mã phản hồi
  validateFeedbackNo = (fb_no) => {
    const schema = this.joi.object({
      fb_no: this.joi.number().integer().min(0).required(),
    });

    const result = this.getValidationResult(schema, { fb_no });

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
