const Processor = require("../Processor");
const crypto = require("crypto");
const {
  InstantiateAbstractClassError,
  NotExistError,
} = require("../../errors/errorsContainer");

// Abstract class
module.exports = class PaymentsProcessor extends Processor {
  // Lưu các order đã đặt mà chưa thanh toán sẽ xóa sau 1 ngày
  static storedOrders = new Map();

  constructor(validator, dao, exchangeService) {
    super();
    if (this.constructor === PaymentsProcessor) {
      throw new InstantiateAbstractClassError();
    }
    this.validator = validator;
    this.dao = dao;
    this.exchangeService = exchangeService;
  }

  // Tạo giỏ hàng
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

  // Tạo id dài 64 ký tự cho đơn hàng
  getOrderId = () => {
    const { storedOrders } = PaymentsProcessor;

    // Tạo id cho order theo số lượng order trong danh sách + thời gian
    const id = crypto
      .createHash("sha256")
      .update(storedOrders.size + new Date())
      .digest("hex");

    return id;
  };

  // Lấy ra danh sách sản phẩm đặt hàng
  // Có giá tiền trong CSDL
  getOrderProducts = async (products) => {
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      const { prod_no, prod_quantity } = products[i];
      // Lấy giá theo mã
      const prod = await this.dao.getOrderProduct(prod_no);

      orderProducts.push({
        ...prod,
        prod_quantity,
      });
    }

    return orderProducts;
  };

  // Tính tổng tiền trong mảng mà client gửi
  // Tiền * số lượng
  // Làm tròn 2 số sau dấu phẩy
  // Paypal chỉ lấy 2 số sau dấu phẩy
  getTotalPrice = (products) => {
    const total = products.reduce((sum, prod) => {
      return sum + prod.prod_price * prod.prod_quantity;
    }, 0); // Số 0 là giá trị khởi tạo của sum

    // Lấy 2 số sau số 0
    return this.exchangeService.roundTakeTwo(total);
  };

  // Lưu tạm thông tin order vào ram sẽ xóa sau 1 ngày
  storeOrder = (tempOrder) => {
    const order = {
      ...tempOrder,
      paid: false, // Chưa trả tiền
      createTime: new Date(), // Thời gian tạo đơn
    };

    const { storedOrders } = PaymentsProcessor;

    // Save bằng paypal id
    storedOrders.set(order.id, order);

    // Số mili giây 1 ngày
    const miliSecInDay = 86400000;

    // Xóa order
    setTimeout(() => {
      storedOrders.delete(order.id);
    }, miliSecInDay);
  };

  // Thanh toán
  checkout = async (id) => {
    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = PaymentsProcessor;

    const order = storedOrders.get(id);
    if (order === undefined) {
      throw new NotExistError(`Order ${id} has been paid or`);
    }

    // Lưu vào CSDL
    const saveOrderId = await this.saveOrder(order);

    // Xóa order lưu tạm
    storedOrders.delete(order.id);

    return saveOrderId;
  };

  // Lưu đơn hàng
  saveOrder = async (order) => {
    const paidOrder = {
      ...order,
      payTime: new Date(), // Thời gian thanh toán đơn
      paid: true,
    };

    // Lưu vào CSDL
    const saveOrderId = await this.dao.saveOrder(paidOrder);

    return saveOrderId;
  };

  //Lấy ra đơn hàng đã lưu trong CSDL
  getSaveOrder = async (id) => {
    const saveOrderId = Number(id);

    this.checkValidate(() => this.validator.validateSaveOrderId(saveOrderId));

    const saveOrder = await this.checkExistAsync(
      async () => await this.dao.getSaveOrder(saveOrderId),
      this.dao.emptyData,
      `Save order id: ${id} not exist`
    );

    return saveOrder;
  };

  checkValidateCart = (cart) => {
    this.checkValidate(() => this.validator.validateCart(cart));
  };

  checkValidateUrl = (url) => {
    this.checkValidate(() => this.validator.validateUrl(url));
  };
};
