const PaymentsController = require("../PaymentsController");

module.exports = class PayPalPaymentController extends PaymentsController {
  constructor(processor, config) {
    super(processor, config);
  }

  // Lấy client id để chèn vào script bên font-end
  getClientId = async (_, res) => {
    const clientId = await this.processor.getClientId();

    return this.ok(res, { clientId });
  };

  // Tạo order theo danh sách sản phẩm
  createOrder = async (req, res) => {
    const { body: cart } = req;

    const orderID = await this.processor.createOrder(cart);

    return this.created(res, { orderID });
  };

  // Thanh toán order
  captureOrder = async (req, res) => {
    const { id } = req.params;

    const saveOrderId = await this.processor.captureOrder(id);

    // Trả về id trong CSDL
    return this.ok(res, { saveOrderId });
  };
};
