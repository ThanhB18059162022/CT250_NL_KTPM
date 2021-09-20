const PaymentController = require("../PaymentController");

const crypto = require("crypto");

module.exports = class StripePaymentController extends PaymentController {
  // Lưu các order đã đặt mà chưa thanh toán
  static storedOrders = new Map();

  constructor(validator, stripeSerivce, dao, currencyService) {
    super(dao, currencyService);

    this.validator = validator;
    this.stripeService = stripeSerivce;
  }

  //#region  CREATE ORDER

  // Tạo đơn hàng
  // Nhận vào giỏ hàng là body
  // 2 query để điều hướng thành công và hủy
  createOrder = async (req, res) => {
    const { body: cart } = req;

    const result = this.validator.validateCart(cart);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const { successUrl, cancelUrl } = req.query;

    const scsResult = this.validator.validateUrl(successUrl);
    if (scsResult.hasAnyError) {
      return res.status(400).json(scsResult.error);
    }

    const cnlResult = this.validator.validateUrl(cancelUrl);
    if (cnlResult.hasAnyError) {
      return res.status(400).json(cnlResult.error);
    }

    const { products, customer } = cart;

    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

    // Tạo id để lưu tạm đơn hàng
    const id = this.getOrderId();

    // Về server xử lý trước
    const serverSuccessUrl = `${req.protocol}://${req.headers.host}/api/stripe/checkoutOrder/${id}?successUrl=${successUrl}`;

    const url = await this.stripeService.createOrder(
      orderProducts,
      serverSuccessUrl,
      cancelUrl
    );

    //Lưu tạm order
    const tempOrder = {
      id,
      orderProducts,
      customer,
      total,
    };
    this.storeOrder(tempOrder);

    return res.status(201).json({ url });
  };

  getOrderId = () => {
    const { storedOrders } = StripePaymentController;

    // Tạo id cho order theo số lượng order trong danh sách + thời gian
    const id = crypto
      .createHash("sha256")
      .update(storedOrders.size + new Date())
      .digest("hex");

    return id;
  };

  // Save tạm thông tin order vào ram sẽ xóa sau 1 ngày
  storeOrder = (tempOrder) => {
    const order = {
      ...tempOrder,
      paid: false, // Chưa trả tiền
      createTime: new Date(), // Thời gian tạo đơn
    };

    const { storedOrders } = StripePaymentController;

    // Save bằng paypal id
    storedOrders.set(order.id, order);

    // Số mili giây 1 ngày
    const miliSecInDay = 86400000;

    // Xóa order
    setTimeout(() => {
      storedOrders.delete(order.id);
    }, miliSecInDay);
  };

  //#endregion

  //#region CHECKOUT ORDER

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    const { id } = req.params;

    const idResult = this.validator.validateStripeOrderId(id);
    if (idResult.hasAnyError) {
      return res.status(400).json(idResult.error);
    }

    const { successUrl } = req.query;
    const urlResult = this.validator.validateUrl(successUrl);
    if (urlResult.hasAnyError) {
      return res.status(400).json(urlResult.error);
    }

    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = StripePaymentController;
    const order = storedOrders.get(id);
    if (order === undefined) {
      return res.status(404).json({});
    }

    // Lưu vào CSDL
    await this.saveOrder(order);

    // Xóa order lưu tạm
    storedOrders.delete(order.id);

    // Về trang khi thanh toán
    res.writeHead(302, {
      Location: successUrl,
    });

    return res.end();
  };

  //#endregion
};
