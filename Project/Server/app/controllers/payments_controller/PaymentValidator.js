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

  // Xác thực giỏ hàng
  validateCart = (cart = {}) => {
    const { products } = cart;

    const prodResult = this.validateOrderProducts(products);
    if (prodResult.hasAnyError) {
      return prodResult;
    }

    return { hasAnyError: false };
  };

  // Xài cho paypal
  validateOrderID = (orderID) => {
    const schema = joi.object({
      orderID: joi.string().length(17).required(),
    });

    const result = getValidationResult(schema, { orderID });

    return result;
  };
};
