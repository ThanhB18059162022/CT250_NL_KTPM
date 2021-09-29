const PaymentsProcessor = require("../PaymentsProcessor");

module.exports = class StripePaymentProcessor extends PaymentsProcessor {
  constructor(validator, dao, exchangeService, stripeSerivce) {
    super(validator, dao, exchangeService);
    this.stripeService = stripeSerivce;
  }

  // Tạo đơn hàng
  createOrder = async (cart, url = {}) => {
    // Kiểm tra giỏ hàng
    this.checkValidateCart(cart);

    const { successUrl, cancelUrl, baseUrl } = url;
    // Kiểm tra success url
    this.checkValidateUrl(successUrl);

    // Kiểm tra cancel url
    this.checkValidateUrl(cancelUrl);

    const order = await this.createOrderFromCartAsync(cart);

    // Chuyển sang USD
    const usdOrderProducts = await this.convertToUSD(order.orderProducts);

    // Về server xử lý trước
    const serverSuccessUrl = baseUrl + `/${order.id}?successUrl=${successUrl}`;
    const stripeUrl = await this.stripeService.createOrder(
      usdOrderProducts,
      serverSuccessUrl,
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
    this.checkValidateUrl(url);

    const saveOrderId = await this.checkout(id);

    return `${url}/${saveOrderId}`;
  };
};
