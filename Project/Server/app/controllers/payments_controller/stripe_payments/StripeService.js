const Stripe = require("stripe");

module.exports = class StripeService {
  // Lưu các order đã đặt mà chưa thanh toán sau 1 ngày sẽ xóa
  static storedOrders = new Map();

  constructor(config, dao) {
    const { secretKey, currency = "USD" } = config;

    this.stripe = new Stripe(secretKey);
    this.currency = currency;
    this.dao = dao;
  }

  //#region CREATE ORDER

  // Tạo dơn hàng
  createOrder = async (cart) => {
    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(cart.products);

    // Tạo id để lưu tạm đơn hàng
    const orderId = this.getOrderId();

    // Tạo order từ giỏ hàng
    const orderBody = await this.createOrderBody(orderId, orderProducts);

    const session = await this.stripe.checkout.sessions.create(orderBody);

    //Lưu tạm order
    const tmpOrder = {
      id,
      orderProducts,
      customer: cart.customer,
    };
    this.storeOrder(tmpOrder);

    return res.json({ url: session.url });
  };

  getOrderId = () => {
    // Tạo id cho order the số lượng order trong danh sách + thời gian
    const id = Buffer.from(tempOrders.size + new Date()).toString("base64");

    return id;
  };

  // Lấy ra danh sách sản phẩm đặt hàng
  // Có giá tiền trong CSDL
  getOrderProducts = async (products) => {
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      const prod = products[i];
      // Lấy giá theo mã
      const prod_price = await this.dao.getProductPrice(prod.prod_no);

      orderProducts.push({
        ...prod,
        prod_price,
      });
    }

    return orderProducts;
  };

  createOrderBody = async (orderId, cart) => {
    const order = {
      payment_method_types: ["card"],
      mode: "payment",
      // Danh sách sản phẩm
      line_items: [],
      success_url: `${process.env.SERVER_URL}/success/${orderId}?redirect=${req.headers.origin}`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    };

    return order;
  };

  // Save tạm thông tin order vào ram sẽ xóa sau 1 ngày
  storeOrder = (order) => {
    const { storedOrders } = StripeService;

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
};
