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
      orderId,
      orderProducts,
      customer: cart.customer,
    };
    this.storeOrder(tmpOrder);

    return session;
  };

  getOrderId = () => {
    const { storedOrders } = StripeService;

    // Tạo id cho order the số lượng order trong danh sách + thời gian
    const id = Buffer.from(storedOrders.size + new Date()).toString("base64");

    return id;
  };

  // Lấy ra danh sách sản phẩm đặt hàng
  // Có giá tiền trong CSDL
  getOrderProducts = async (products) => {
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      const { prod_no, prod_quantity } = products[i];
      // Lấy giá theo mã
      const prod = await this.dao.getOrderProduct(prod_no);

      orderProducts.push({
        ...prod,
        prod_quantity,
      });
    }

    return orderProducts;
  };

  createOrderBody = async (orderId, orderProducts) => {
    const order = {
      payment_method_types: ["card"],
      mode: "payment",
      // Danh sách sản phẩm
      line_items: this.getItems(orderProducts),
      success_url: `http://localhost:8000/success/${orderId}`,
      cancel_url: `http://localhost:8000/cancel.html`,
    };

    return order;
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
