const Controller = require("../../Controller");
const PaymentController = require("../PaymentController");

module.exports = class ZaloPayPaymentController extends Controller {
  constructor(processor) {
    super();
    this.processor = processor;
  }

  //#region CREATE ORDER

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

  //#endregion

  //#region CHECKOUT ORDER

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

  //#endregion
};
