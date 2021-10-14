const PaymentsProcessor = require("../PaymentsProcessor");

module.exports = class DefaultPaymentProcessor extends PaymentsProcessor {
  constructor(validator, dao, exchangeService, storageService) {
    super(validator, dao, exchangeService, storageService);
  }

  // Tạo đơn hàng
  createOrder = async (cart) => {
    // Kiểm tra giỏ hàng
    this.checkValidateCart(cart);

    const order = await this.createOrderFromCartAsync(cart);

    //Lưu tạm order
    order.payment = "default";
    // Xóa dơn hàng sau 1 tuần
    const secInWeek = 604800;
    await this.storeOrder(order, secInWeek);

    return order.id;
  };

  // Lưu đơn hàng đã thanh toán (Admin only)
  checkoutOrder = async (id) => {
    this.checkValidate(() => this.validator.validateId(id));

    const saveOrderId = await this.checkout(id);

    return saveOrderId;
  };
};
