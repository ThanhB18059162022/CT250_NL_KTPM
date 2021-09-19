// Tham khảo: https://stripe.com/docs/api?lang=node
// https://www.youtube.com/watch?v=1r-F3FIONl8&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
// https://www.youtube.com/watch?v=mI_-1tbIXQI&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
const Stripe = require("stripe");
var crypto = require("crypto");

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

  // Tạo đơn hàng
  createOrder = async (cart, baseUrl) => {
    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(cart.products);

    // Tạo id để lưu tạm đơn hàng
    const id = this.getOrderId();

    const { url } = await this.createCheckoutSession(
      id,
      orderProducts,
      baseUrl,
      cart.url.cancel
    );

    const total = this.getTotalPrice(orderProducts);
    //Lưu tạm order
    const tmpOrder = {
      id,
      orderProducts,
      customer: cart.customer,
      successUrl: cart.url.success,
      total,
      time: new Date(),
      paid: false, // Chưa trả tiền
    };
    this.storeOrder(tmpOrder);

    return { url };
  };

  getOrderId = () => {
    const { storedOrders } = StripeService;

    // Tạo id cho order the số lượng order trong danh sách + thời gian
    const id = crypto
      .createHash("sha256")
      .update(storedOrders.size + new Date())
      .digest("hex");

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

  createCheckoutSession = async (
    orderId,
    orderProducts,
    baseUrl,
    cancelUrl
  ) => {
    const order = {
      payment_method_types: ["card"],
      mode: "payment",
      // Danh sách sản phẩm
      line_items: this.getItems(orderProducts),
      success_url: `${baseUrl}/api/stripe/saveorder/${orderId}`,
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

  // Tính tổng tiền trong mảng mà client gửi
  // Tiền * số lượng
  // Làm tròn 2 số sau dấu phẩy
  // Paypal chỉ lấy 2 số sau dấu phẩy
  getTotalPrice = (products) => {
    const total =
      Math.round(
        100 *
          products.reduce((sum, prod) => {
            return sum + prod.prod_price * prod.prod_quantity;
          }, 0) // Số 0 là giá trị khởi tạo của sum
      ) / 100;

    return total;
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

  //#region Checkout Order

  checkoutOrder = async (orderId) => {
    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = StripeService;
    const order = storedOrders.get(orderId);
    if (order === undefined) {
      throw new Error("Order expired");
    }

    const paidOrder = { ...order, paid: true };

    // Lưu vào CSDL
    await this.dao.saveOrder(paidOrder);

    return paidOrder.successUrl;
  };

  //#endregion
};
