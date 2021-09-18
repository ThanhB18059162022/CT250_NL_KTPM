module.exports = class StripePaymentController {
  constructor(validator, stripeSerivce) {
    this.validator = validator;
    this.stripeService = stripeSerivce;
  }

  //#region  CREATE ORDER

  // Tạo đơn hàng
  createOrder = async (req, res) => {
    const { body: cart } = req;

    const result = this.validator.validateCart(cart);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const newOrder = await this.stripeService.createOrder(cart);

    return res.status(201).json(newOrder);
  };

  //#endregion
};
