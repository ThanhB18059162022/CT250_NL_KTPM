const CheckoutPaymentController = require("../CheckoutPaymentController");

module.exports = class StripePaymentController extends (
  CheckoutPaymentController
) {
  constructor(validator, dao, exchangeService, stripeSerivce) {
    super(validator, dao, exchangeService);

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

    const usdOrderProducts = await this.convertToUSD(orderProducts);

    const url = await this.stripeService.createOrder(
      usdOrderProducts,
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

  // Chuyển giá tiền trong danh sách đặt hàng sang USD
  convertToUSD = async (orderProducts) => {
    const usdOrderProductsPromise = orderProducts.map(async (op) => {
      const usdPrice = await this.exchangeService
        .convert(op.prod_price)
        .to("USD");

      return {
        ...op,
        prod_price: usdPrice,
      };
    });

    const usdOrderProducts = await Promise.all(usdOrderProductsPromise);

    return usdOrderProducts;
  };

  //#endregion
};
