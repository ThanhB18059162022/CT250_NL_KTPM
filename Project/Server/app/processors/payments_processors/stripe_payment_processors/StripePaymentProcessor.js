const SessionPaymentProcessor = require("../SessionPaymentProcessor");

module.exports = class StripePaymentProcessor extends SessionPaymentProcessor {
  constructor(validator, dao, exchangeService, stripeSerivce) {
    super(validator, dao, exchangeService);
    this.stripeService = stripeSerivce;
  }

  // Tạo đơn hàng
  createOrder = async (cart, url = {}) => {
    // Kiểm tra giỏ hàng
    this.checkValidate(() => this.validator.validateCart(cart));

    const { successUrl, cancelUrl } = url;
    // Kiểm tra success url
    this.checkValidate(() => this.validator.validateUrl(successUrl));

    // Kiểm tra cancel url
    this.checkValidate(() => this.validator.validateUrl(cancelUrl));

    const order = await this.createOrderFromCartAsync(cart);

    // Chuyển sang USD
    const usdOrderProducts = await this.convertToUSD(order.orderProducts);

    const stripeUrl = await this.stripeService.createOrder(
      usdOrderProducts,
      successUrl,
      cancelUrl
    );

    //Lưu tạm order
    order.payment = "stripe";
    this.storeOrder(order);

    return stripeUrl;
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

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (id, url) => {
    this.checkValidate(() => this.validator.validateId(id));
    this.checkValidate(() => this.validator.validateUrl(url));

    const saveOrderId = await this.checkout(id);

    return `${url}/${saveOrderId}`;
  };
};
