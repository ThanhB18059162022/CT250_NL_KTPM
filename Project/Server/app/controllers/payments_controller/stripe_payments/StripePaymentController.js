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

    const baseUrl = `${req.protocol}://${req.headers.host}`;
    const newOrder = await this.stripeService.createOrder(cart, baseUrl);

    return res.status(201).json(newOrder);
  };

  //#endregion

  //#region CHECKOUT ORDER

  saveOrder = async (req, res) => {
    const { id } = req.params;

    const result = this.validator.validateStripeOrderId(id);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const successUrl = await this.stripeService.saveOrder(id);

    // Về trang khi thanh toán
    res.writeHead(302, {
      Location: successUrl,
    });

    return res.end();
  };

  //#endregion
};
