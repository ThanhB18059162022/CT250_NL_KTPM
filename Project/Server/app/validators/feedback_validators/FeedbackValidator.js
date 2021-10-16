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
  validateFeedback = (feedback = {}) => {
    const { customer, fb_content } = feedback;

    const cusResult = this.validateCustomer(customer);
    if (cusResult.hasAnyError) {
      return cusResult;
    }

    const schema = this.joi.object({
      fb_content: this.joi.string().min(5).max(70).required(),
    });

    const result = this.getValidationResult(schema, { fb_content });

    return result;
  };

  // Xác thực khách hàng nữa
  validateCustomer = (customer = {}) => {
    const schema = this.joi
      .object({
        cus_name: this.joi.string().min(5).max(70).required(),
        cus_email: this.joi
          .string()
          .pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          .required(),
        cus_sex: this.joi.boolean().required(),
        cus_phoneNumber: this.joi
          .string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required(),
      })
      .required();

    const result = this.getValidationResult(schema, customer);

    return result;
  };
};
