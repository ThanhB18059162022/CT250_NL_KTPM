const CheckoutPaymentController = require("../CheckoutPaymentController");

module.exports = class ZaloPayPaymentController extends (
  CheckoutPaymentController
) {
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
};
