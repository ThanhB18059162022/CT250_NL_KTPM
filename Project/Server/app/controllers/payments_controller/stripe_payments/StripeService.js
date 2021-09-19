// Tham khảo: https://stripe.com/docs/api?lang=node
// https://www.youtube.com/watch?v=1r-F3FIONl8&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
// https://www.youtube.com/watch?v=mI_-1tbIXQI&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
const Stripe = require("stripe");

module.exports = class StripeService {
  constructor(config, dao) {
    const { secretKey, currency } = config;

    this.stripe = new Stripe(secretKey);
    this.currency = currency;
    this.dao = dao;
  }

  // Tạo đơn hàng
  createOrder = async (orderProducts, successUrl, cancelUrl) => {
    const { url } = await this.createCheckoutSession(
      orderProducts,
      successUrl,
      cancelUrl
    );

    return url;
  };

  createCheckoutSession = async (orderProducts, successUrl, cancelUrl) => {
    const order = {
      payment_method_types: ["card"],
      mode: "payment",
      // Danh sách sản phẩm
      line_items: this.getItems(orderProducts),
      success_url: successUrl,
      cancel_url: cancelUrl,
    };

    const session = this.stripe.checkout.sessions.create(order);

    return session;
  };

  // Tạo danh sách sản phẩm theo định dạng của stripe
  getItems = (orderProducts) => {
    const items = [];

    for (let i = 0; i < orderProducts.length; i++) {
      const product = orderProducts[i];

      items.push(this.createItem(product));
    }

    return items;
  };

  createItem = (product) => {
    const item = {
      price_data: {
        currency: this.currency,
        product_data: {
          name: product.prod_name,
        },
        // Tiền phải là cent ko phải đô
        unit_amount: this.convertDollarsToCents(product.prod_price),
      },
      quantity: product.prod_quantity,
    };

    return item;
  };

  // Chuyển từ đô sang cent
  convertDollarsToCents(dollars) {
    const exchangeRate = 100;

    return dollars * exchangeRate;
  }
};
