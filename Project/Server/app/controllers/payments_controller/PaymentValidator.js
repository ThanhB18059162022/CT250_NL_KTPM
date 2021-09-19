// Tham khảo https://joi.dev/api/?v=17.4.2
//https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs

const joi = require("joi");
const { getValidationResult } = require("../validatorHelper");

module.exports = class PatmentValidator {
  // Xác thực danh sách sản phẩm trong giỏ
  validateOrderProducts = (products = []) => {
    const schema = joi.array().items(
      joi
        .object({
          prod_no: joi.number().integer().min(0).required(),
          prod_quantity: joi.number().integer().min(1).required(),
        })
        .required()
    );
    const result = getValidationResult(schema, products);

    return result;
  };

  // Xác thực khách hàng nữa
  validateCustomer = (customer = {}) => {
    const schema = joi
      .object({
        cus_name: joi.string().min(5).max(70).required(),
        cus_id: joi
          .string()
          .length(9)
          .pattern(/^[0-9]+$/)
          .required(),
        cus_email: joi
          .string()
          .pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          .required(),
        cus_sex: joi.boolean().required(),
        cus_address: joi.string().min(10).max(128).required(),
        cus_phoneNumber: joi
          .string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required(),
      })
      .required();

    const result = getValidationResult(schema, customer);

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

  // Xài cho paypal
  validatePayPalOrderID = (orderID) => {
    const schema = joi.object({
      orderID: joi.string().length(17).required(),
    });

    const result = getValidationResult(schema, { orderID });

    return result;
  };

  // Xài cho stripe
  validateStripeOrderId = (orderId) => {
    const schema = joi.object({
      orderId: joi.string().length(64).required(),
    });

    const result = getValidationResult(schema, { orderId });

    return result;
  };
};
