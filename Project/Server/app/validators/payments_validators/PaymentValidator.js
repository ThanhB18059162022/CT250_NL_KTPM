const Validator = require("../Validator");

module.exports = class PatmentValidator extends Validator {
  // Xác thực danh sách sản phẩm trong giỏ
  validateOrderProducts = (products = []) => {
    const schema = this.joi.array().items(
      this.joi
        .object({
          prod_no: this.joi.number().integer().min(0).required(),
          pd_no: this.joi.number().integer().min(1).required(),
          prod_quantity: this.joi.number().integer().min(1).required(),
        })
        .required()
    );
    const result = this.getValidationResult(schema, products);

    return result;
  };

  // Xác thực khách hàng nữa
  validateCustomer = (customer = {}) => {
    const schema = this.joi
      .object({
        cus_name: this.joi.string().min(5).max(70).required(),
        cus_id: this.joi
          .string()
          .length(9)
          .pattern(/^[0-9]+$/)
          .required(),
        cus_email: this.joi
          .string()
          .pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          .required(),
        cus_sex: this.joi.boolean().required(),
        cus_address: this.joi.string().min(10).max(128).required(),
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

  // Xác thực giỏ hàng
  validateCart = (cart = {}) => {
    const { products } = cart;

    const prodResult = this.validateOrderProducts(products);
    if (prodResult.hasAnyError) {
      return prodResult;
    }

    const { customer } = cart;

    const cusResult = this.validateCustomer(customer);
    if (cusResult.hasAnyError) {
      return cusResult;
    }

    return { hasAnyError: false };
  };

  // Xác thực đường dẫn
  validateUrl = (url) => {
    const schema = this.joi.object({
      url: this.joi.string().uri().required(),
    });

    const result = this.getValidationResult(schema, { url });

    return result;
  };

  // Xài cho id tự tạo
  validateId = (orderId) => {
    const schema = this.joi.object({
      orderId: this.joi.string().length(64).required(),
    });

    const result = this.getValidationResult(schema, { orderId });

    return result;
  };

  // Xài cho id tự tạo
  validateSaveOrderId = (id) => {
    const schema = this.joi.object({
      id: this.joi.number().min(0).max(Number.MAX_SAFE_INTEGER).required(),
    });

    const result = this.getValidationResult(schema, { id });

    return result;
  };

  // Xài cho paypal
  validatePayPalOrderID = (orderID) => {
    const schema = this.joi.object({
      orderID: this.joi.string().length(17).required(),
    });

    const result = this.getValidationResult(schema, { orderID });

    return result;
  };
};
