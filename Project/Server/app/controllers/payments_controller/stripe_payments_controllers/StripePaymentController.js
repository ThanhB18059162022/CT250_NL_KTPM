const Controller = require("../../Controller");
const PaymentController = require("../PaymentController");

module.exports = class StripePaymentController extends Controller {
  constructor(processor) {
    super();
    this.processor = processor;
  }

  // Tạo đơn hàng
  // Nhận vào giỏ hàng là body
  // 2 query để điều hướng thành công và hủy
  createOrder = async (req, res) => {
    try {
      const { successUrl, cancelUrl } = req.query;

      this.processor.checkValidateUrl(successUrl);
      this.processor.checkValidateUrl(cancelUrl);

      const serverCheckoutUrl = `${req.protocol}://${req.headers.host}/api/stripe/checkoutOrder`;
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
      const { id } = req.params;
      const { successUrl } = req.query;

      const redirectUrl = await this.processor.checkoutOrder(id, successUrl);

      // Về trang khi thanh toán
      return this.redirect(res, redirectUrl);
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
