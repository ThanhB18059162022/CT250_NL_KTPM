const Controller = require("../../Controller");

module.exports = class ZaloPayPaymentController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  createOrder = async (req, res) => {
    try {
      const { successUrl, cancelUrl } = req.query;

      this.processor.checkValidateUrl(successUrl);
      this.processor.checkValidateUrl(cancelUrl);

      const serverCheckoutUrl = `${req.protocol}://${req.headers.host}/api/zalo/checkoutOrder`;
      const { body: cart } = req;
      const url = await this.processor.createOrder(cart, {
        successUrl,
        cancelUrl,
        baseUrl: serverCheckoutUrl,
      });

      return this.created(res, { url });
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    try {
      const {
        params: { id },
        query,
      } = req;

      const redirectUrl = await this.processor.checkoutOrder(id, query);

      // Về trang khi thanh toán
      return this.redirect(res, redirectUrl);
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
