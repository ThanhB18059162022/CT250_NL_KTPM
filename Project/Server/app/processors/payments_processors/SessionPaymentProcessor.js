const PaymentsProcessor = require("./PaymentsProcessor");
const {
  InstantiateAbstractClassError,
} = require("../../errors/errorsContainer");

module.exports = class SessionPaymentProcessor extends PaymentsProcessor {
  constructor(validator, dao, exchangeService) {
    super(validator, dao, exchangeService);
    if (this.constructor === SessionPaymentProcessor) {
      throw new InstantiateAbstractClassError();
    }
  }

  createOrderFromCartAsync = async (cart) => {
    const { products, customer } = cart;

    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

    // Tạo id để lưu tạm đơn hàng
    const id = this.getOrderId();

    const order = {
      id,
      orderProducts,
      customer,
      total,
    };

    return order;
  };
};
