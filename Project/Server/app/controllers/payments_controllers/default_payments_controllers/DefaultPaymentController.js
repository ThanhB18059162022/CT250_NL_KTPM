const PaymentsController = require("../PaymentsController");

module.exports = class DefaultPaymentController extends PaymentsController {
  constructor(processor, config) {
    super(processor, config);
  }

  // Tạo đơn hàng
  createOrder = async (req, res) => {
    try {
      const { body: cart } = req;
      const id = await this.processor.createOrder(cart);

      return this.created(res, { id });
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      const saveOrderId = await this.processor.checkoutOrder(id);

      // Về trang khi thanh toán
      return this.ok(res, { saveOrderId });
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
