const PaymentController = require("../PaymentController");

module.exports = class ZaloPayPaymentController extends PaymentController {
  constructor(validator, dao, currencyService, zaloPaySerivce) {
    super(validator, dao, currencyService);

    this.zaloPayService = zaloPaySerivce;
  }

  //#region CREATE ORDER

  createOrder = async (req, res) => {
    const { body: cart } = req;

    //#region  Validate

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

    //#endregion

    const { products, customer } = cart;

    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

    // Tạo id để lưu tạm đơn hàng
    const id = this.getOrderId();

    // Về server xử lý trước
    const serverSuccessUrl = `${req.protocol}://${req.headers.host}/api/zalo/checkoutOrder/${id}?url=${successUrl}-${cancelUrl}`;

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
      payment: "zalopay",
    };
    this.storeOrder(tempOrder);

    return res.status(201).json({ url });
  };

  //#endregion

  //#region CHECKOUT ORDER

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    //#region  Validate

    //#region  Id

    const { id } = req.params;

    const idResult = this.validator.validateId(id);
    if (idResult.hasAnyError) {
      return res.status(400).json(idResult.error);
    }

    //#endregion

    //#region  Url

    const { url } = req.query;
    const [successUrl, cancelUrl] = url.split("-");

    const scsResult = this.validator.validateUrl(successUrl);
    if (scsResult.hasAnyError) {
      return res.status(400).json(scsResult.error);
    }

    const cnlResult = this.validator.validateUrl(cancelUrl);
    if (cnlResult.hasAnyError) {
      return res.status(400).json(cnlResult.error);
    }

    //#endregion

    //#region Zalo url query

    // Kiểm tra thông tin thanh toán không bị thay đổi
    const valid = this.zaloPayService.validRedirectQuery(req.query);
    if (!valid) {
      return res.status(400).json({
        key: "Url query string",
        message: "Url query string has been changed",
      });
    }

    //#endregion

    //#endregion

    // Kiểm tra khách hàng đã thanh toán
    const { status } = req.query;
    const paid = Number(status) === 1;
    if (!paid) {
      //Về trang khách hàng
      return res.status(301).redirect(cancelUrl);
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
