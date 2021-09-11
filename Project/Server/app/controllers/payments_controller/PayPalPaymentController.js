module.exports = class PayPalPaymentController {
  // PayPalserivce tạo đơn hàng - thanh toán
  // OrderSerivice tính tiền để tạo đơn hàng - lưu vào csdl
  constructor(payPalSerivce, orderSerivce) {
    this.payPalSerivce = payPalSerivce;
    this.orderSerivce = orderSerivce;
  }

  //#region GET

  // Lấy client id để chèn vào script bên font-end
  getClientId = async (req, res) => {
    const { clientId } = this.payPalSerivce;

    return res.json({ clientId });
  };

  // Lấy ra order theo id
  getOrderById = async (req, res) => {
    const { id } = req.params;

    const exist = await this.payPalSerivce.existOrder(id);
    if (!exist) {
      return res.status(404).json({});
    }

    const order = await this.payPalSerivce.getOrderById(id);

    return res.json(order);
  };

  //#endregion

  //#region  CREATE

  // Tạo order theo danh sách sản phẩm
  createOrder = async (req, res) => {
    const { body: products } = req;

    let orderBody = {};
    try {
      orderBody = await this.orderSerivce.createOrderBody(products);
    } catch (error) {
      return res.status(400).json({ error: error.stack });
    }

    const order = await this.payPalSerivce.createOrder(orderBody);

    return res.status(201).json(order);
  };

  //#endregion

  //#region CAPTURE

  // Thanh toán order
  captureOrder = async (req, res) => {
    const { orderId } = req.params;

    const exist = await this.payPalSerivce.existOrder(orderId);
    if (!exist) {
      return res.status(404).json({});
    }

    // Thanh toán order
    const order = await this.payPalSerivce.captureOrder(orderId);

    // Lưu vào CSDL
    await this.orderSerivce.saveOrder(order);

    return res.json(order);
  };

  //#endregion
};
