const Controller = require("../../Controller");

module.exports = class PayPalPaymentController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  // Lấy client id để chèn vào script bên font-end
  getClientId = async (_, res) => {
    const clientId = await this.processor.getClientId();

    return this.ok(res, { clientId });
  };

  // Tạo order theo danh sách sản phẩm
  createOrder = async (req, res) => {
    try {
      const { body: cart } = req;

      const OrderID = await this.processor.createOrder(cart);

      return this.created(res, { OrderID });
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Thanh toán order
  captureOrder = async (req, res) => {
    try {
      const { id } = req.params;

      const saveOrderId = await this.processor.captureOrder(id);

      // Trả về id trong CSDL
      return this.ok(res, { saveOrderId });
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
