const PaymentController = require("../PaymentController");

module.exports = class PayPalPaymentController extends PaymentController {
  constructor(validator, dao, exchangeService, payPalSerivce) {
    super(validator, dao, exchangeService);

    this.payPalSerivce = payPalSerivce;
  }

  //#region GET

  // Lấy client id để chèn vào script bên font-end
  getClientId = async (req, res) => {
    const { clientId } = this.payPalSerivce;

    return res.json({ clientId });
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

    const { customer, products } = cart;

    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

    // Đổi sang USD
    const usdTotal = await this.exchangeService.convert(total).to("USD");

    const orderID = await this.payPalSerivce.createOrder(usdTotal);

    // Lưu tạm đơn hàng
    const tempOrder = {
      id: orderID, // Xài luôn id của paypal khỏi tạo
      customer,
      orderProducts,
      total,
      payment: "paypal",
    };
    this.storeOrder(tempOrder);

    return res.status(201).json({ orderID });
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

    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = PayPalPaymentController;
    const order = storedOrders.get(orderID);
    if (order === undefined) {
      return res.status(404).json({});
    }

    // Thanh toán order
    await this.payPalSerivce.captureOrder(order.id);

    // Lưu vào CSDL
    const saveOrderId = await this.saveOrder(order);

    // Xóa order lưu tạm
    storedOrders.delete(order.id);

    return res.json({ saveOrderId });
  };

  //#endregion
};
