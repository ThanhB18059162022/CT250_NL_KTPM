module.exports = class PayPalPaymentController {
  constructor(validator, payPalSerivce) {
    this.validator = validator;
    this.payPalSerivce = payPalSerivce;
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
    const { body: cart } = req;

    const result = this.validator.validateCart(cart);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const order = await this.payPalSerivce.createOrder(cart);

    return res.status(201).json(order);
  };

  //#endregion

  //#region CAPTURE

  // Thanh toán order
  captureOrder = async (req, res) => {
    const { orderID } = req.params;

    const result = this.validator.validatePayPalOrderID(orderID);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const exist = await this.payPalSerivce.existOrder(orderID);
    if (!exist) {
      return res.status(404).json({});
    }

    // Thanh toán order
    const order = await this.payPalSerivce.captureOrder(orderID);

    return res.json(order);
  };

  //#endregion
};
