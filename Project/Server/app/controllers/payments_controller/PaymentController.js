const crypto = require("crypto");

// Abstract class
module.exports = class PaymentController {
  // Lưu các order đã đặt mà chưa thanh toán sẽ xóa sau 1 ngày
  static storedOrders = new Map();

  constructor(validator, dao, exchangeService) {
    if (this.constructor === PaymentController) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.validator = validator;
    this.dao = dao;
    this.exchangeService = exchangeService;
  }

  // Tạo id dài 64 ký tự cho đơn hàng
  getOrderId = () => {
    const { storedOrders } = PaymentController;

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

    const { storedOrders } = PaymentController;

    // Save bằng paypal id
    storedOrders.set(order.id, order);

    // Số mili giây 1 ngày
    const miliSecInDay = 86400000;

    // Xóa order
    setTimeout(() => {
      storedOrders.delete(order.id);
    }, miliSecInDay);
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
  getSaveOrder = async (req, res) => {
    const { saveOrderId: saveOrderIdParam } = req.params;

    const saveOrderId = Number(saveOrderIdParam);

    const result = this.validator.validateSaveOrderId(saveOrderId);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const saveOrder = await this.dao.getSaveOrder(saveOrderId);
    if (this.dao.emptySaveOrder(saveOrder)) {
      return res.status(404).json({});
    }

    return res.json(saveOrder);
  };
};
