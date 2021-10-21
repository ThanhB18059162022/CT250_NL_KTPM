const Processor = require("../Processor");
const crypto = require("crypto");
const {
  InstantiateAbstractClassError,
  NotExistError,
} = require("../../errors/errorsContainer");

// Abstract class
module.exports = class PaymentsProcessor extends Processor {
  constructor(validator, dao, exchangeService, storageService) {
    super();
    if (this.constructor === PaymentsProcessor) {
      throw new InstantiateAbstractClassError();
    }
    this.validator = validator;
    this.dao = dao;
    this.exchangeService = exchangeService;
    this.storageService = storageService;
  }

  //#region Order

  // Tạo giỏ hàng
  createOrderFromCartAsync = async (cart) => {
    const { products, customer } = cart;

    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

    // Tạo id để lưu tạm đơn hàng
    const id = await this.getOrderId();

    const order = {
      id,
      orderProducts,
      customer,
      total,
    };

    return order;
  };

  // Tạo id dài 64 ký tự cho đơn hàng
  getOrderId = async () => {
    // Tạo id cho order theo số lượng order trong danh sách + thời gian
    const size = await this.storageService.getSize();

    const id = crypto
      .createHash("sha256")
      .update(size + new Date())
      .digest("hex");

    return id;
  };

  // Lấy ra danh sách sản phẩm đặt hàng
  // Có giá tiền trong CSDL
  getOrderProducts = async (products) => {
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      // Lấy giá theo mã
      const orderProduct = await this.dao.getOrderProduct(products[i]);

      orderProducts.push(orderProduct);
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

  //#endregion

  //#region Temp orders

  // Lấy ra danh sách các order lưu tạm
  getStoreOrders = async () => await this.storageService.getAll();

  // Lưu tạm thông tin order và mặc định sẽ xóa sau 1 ngày
  storeOrder = async (tempOrder, sec = 86400) => {
    const order = {
      ...tempOrder,
      paid: false, // Chưa trả tiền
      createTime: new Date(), // Thời gian tạo đơn
    };

    // Save bằng order id
    await this.storageService.setex(order.id, sec, order);
  };

  // Xóa đơn hàng lưu tạm
  deleteStoreOrder = async (id) => await this.storageService.delete(id);

  // Thanh toán
  checkout = async (id) => {
    // Kiểm tra còn order trước khi thanh toán
    const order = await this.storageService.get(id);
    if (this.storageService.emptyData(order)) {
      throw new NotExistError(`Order ${id} has been paid or`);
    }

    // Lưu vào CSDL
    const saveOrderId = await this.saveOrder(order);

    // Xóa order lưu tạm
    await this.deleteStoreOrder(order.id);

    return saveOrderId;
  };

  //#endregion

  //#region Database order

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

    const saveOrder = await this.dao.getSaveOrder(saveOrderId);

    return saveOrder;
  };

  // Lấy tất cả đơn hàng đã lưu trong CSDL
  getAllSaveOrder = async() =>{
    const saveOrders =  await  this.dao.getAllSaveOrder()
    return saveOrders;
  }

  //#endregion

  //#region Ex

  checkValidateCart = (cart) => {
    this.checkValidate(() => this.validator.validateCart(cart));
  };

  checkValidateUrl = (url) => {
    this.checkValidate(() => this.validator.validateUrl(url));
  };

  //#endregion
};
