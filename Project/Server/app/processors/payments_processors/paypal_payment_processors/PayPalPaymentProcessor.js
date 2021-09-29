const PaymentsProcessor = require("../PaymentsProcessor");

module.exports = class PayPalPaymentProcessor extends PaymentsProcessor {
  constructor(validator, dao, currencyService, payPalService) {
    super(validator, dao, currencyService);
    this.payPalService = payPalService;
  }

  // Lấy client id để chèn vào script bên font-end
  getClientId = async () => {
    const { clientId } = this.payPalService;

    return clientId;
  };

  createOrder = async (cart) => {
    // Kiểm tra giỏ hàng
    this.checkValidateCart(cart);

    const order = await this.createOrderFromCartAsync(cart);

    // Đổi sang USD
    const usdTotal = await this.exchangeService.convert(order.total).to("USD");

    const payPalOrderID = await this.payPalService.createOrder(usdTotal);

    // Lưu tạm oder
    // Xài luôn id của paypay cho dễ
    order.id = payPalOrderID;
    order.payment = "paypal";
    this.storeOrder(order);

    return payPalOrderID;
  };

  // Lưu đơn hàng đã thanh toán
  captureOrder = async (OrderID) => {
    this.checkValidate(() => this.validator.validatePayPalOrderID(OrderID));

    // Thanh toán order
    await this.payPalService.captureOrder(OrderID);

    // Trả về id trong CSDL
    const saveOrderId = await this.checkout(OrderID);

    return saveOrderId;
  };
};
