const PaymentController = require("../PaymentController");

module.exports = class StripePaymentController extends PaymentController {
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
      payment: "stripe",
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
