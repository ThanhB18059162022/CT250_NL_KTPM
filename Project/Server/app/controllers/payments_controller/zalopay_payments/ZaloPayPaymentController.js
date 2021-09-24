const PaymentController = require("../PaymentController");

module.exports = class ZaloPayPaymentController extends PaymentController {
  constructor(validator, dao, currencyService, zaloPaySerivce) {
    super(validator, dao, currencyService);

    this.zaloPayService = zaloPaySerivce;
  }

  //#region CREATE ORDER

  createOrder = async (req, res) => {
    const { body: cart } = req;

    const result = this.validator.validateCart(cart);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const { successUrl } = req.query;

    const urlResult = this.validator.validateUrl(successUrl);
    if (urlResult.hasAnyError) {
      return res.status(400).json(urlResult.error);
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
    const serverSuccessUrl = `${req.protocol}://${req.headers.host}/api/zalo/checkoutOrder/${id}?successUrl=${successUrl}`;

    const url = await this.zaloPayService.createOrder(
      id,
      customer.cus_name,
      total,
      serverSuccessUrl
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

  //#endregion

  //#region CHECKOUT ORDER

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    const { id } = req.params;

    const idResult = this.validator.validateId(id);
    if (idResult.hasAnyError) {
      return res.status(400).json(idResult.error);
    }

    const { successUrl } = req.query;
    const urlResult = this.validator.validateUrl(successUrl);
    if (urlResult.hasAnyError) {
      return res.status(400).json(urlResult.error);
    }

    // Kiểm tra thông tin thanh toán không bị thay đổi
    const valid = this.zaloPayService.validRedirectQuery(req.query);
    if (!valid) {
      return res.status(400).json({ error: "Url query string not valid" });
    }

    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = PaymentController;
    const order = storedOrders.get(id);
    if (order === undefined) {
      return res.status(404).json({});
    }

    // Lưu vào CSDL
    const saveOrderId = await this.saveOrder(order);
    // Xóa order lưu tạm
    storedOrders.delete(order.id);

    // Về trang khi thanh toán
    return res.status(301).redirect(`${successUrl}/${saveOrderId}`);
  };

  //#endregion
};
