// Tham khảo https://developer.paypal.com/docs/business/checkout/server-side-api-calls/capture-order/
// https://developer.paypal.com/docs/business/checkout/server-side-api-calls/set-up-sdk/
// https://www.youtube.com/watch?v=AtZGoueL4Vs
// https://www.youtube.com/watch?v=DNM9FdFrI1k
const PayPalCheckout = require("@paypal/checkout-server-sdk");

// Bên client button createOrder vs onApprove để gọi api bên đây
module.exports = class PayPalService {
  // Lưu các order đã đặt mà chưa thanh toán sau 1 ngày sẽ xóa
  static storedOrders = new Map();

  constructor(config, dao) {
    const {
      clientId,
      secretId,
      env = "sandbox",
      currency_code = "USD",
    } = config;

    this.clientId = clientId;
    this.currency_code = currency_code;
    this.payPalClient = this.createClient(clientId, secretId, env);
    this.dao = dao;
  }

  //#region INIT

  // Tạo client theo config đang xài sandbox
  createClient = (clientId, secretId, env) => {
    let Environment = PayPalCheckout.core.SandboxEnvironment;
    if (env === "live") {
      Environment = PayPalCheckout.core.LiveEnvironment;
    }

    return new PayPalCheckout.core.PayPalHttpClient(
      new Environment(clientId, secretId)
    );
  };

  //#endregion

  //#region EXIST

  // Kiểm tra đơn hàng tồn tại
  existOrder = async (orderID) => {
    try {
      await this.getOrderById(orderID);

      return true;
    } catch (error) {
      return false;
    }
  };

  //#endregion

  //#region GET

  // Lấy đơn hàng theo id
  getOrderById = async (id) => {
    const getRequest = new PayPalCheckout.orders.OrdersGetRequest(id);

    const order = await this.payPalClient.execute(getRequest);

    return order.result;
  };

  //#endregion

  //#region CREATE ORDER

  // Tạo đơn hàng theo khách hàng và order body (định dạng theo paypal)
  createOrder = async (cart) => {
    // Lấy ra danh sách sản phẩm trong giỏ
    // Bao gồm giá
    const orderProducts = await this.getOrderProducts(cart.products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

    // Tạo order từ giỏ hàng
    const orderBody = await this.createOrderBody(total);

    // Tạo request paypal để gọi paypal api
    const createRequest = new PayPalCheckout.orders.OrdersCreateRequest();

    // Có 2 loại minimum và representation
    createRequest.prefer("return=representation");
    createRequest.requestBody(orderBody);

    // Gọi api paypal để tạo order - có exception khi không hợp lệ body
    const {
      result: { id }, //Lấy ra id
    } = await this.payPalClient.execute(createRequest);

    //Lưu tạm order
    const tmpOrder = {
      id,
      orderProducts,
      customer: cart.customer,
      total,
      time: new Date(),
      paid: false, // Chưa trả tiền
    };
    this.storeOrder(tmpOrder);

    return { orderID: id };
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

  // Tính tiền theo giá và số lượng trong mảng
  createOrderBody = async (total) => {
    const order = {
      // Capture để thanh toán
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: this.currency_code,
            value: total,
          },
        },
      ],
    };

    return order;
  };

  // Save tạm thông tin order vào ram sẽ xóa sau 1 ngày
  storeOrder = (order) => {
    const { storedOrders } = PayPalService;

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

  //#region  CAPTURE ORDER

  // Thanh toán
  captureOrder = async (orderID) => {
    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = PayPalService;
    const order = storedOrders.get(orderID);
    if (order === undefined) {
      throw new Error("Order expired");
    }

    // Thanh toán
    await this.payPalCaptureOrder(orderID);

    const paidOrder = { ...order, paid: true };

    // Lưu vào CSDL
    await this.dao.saveOrder(paidOrder);

    return paidOrder;
  };

  // Cái này gọi để thanh toán tiền
  payPalCaptureOrder = async (orderID) => {
    const captureRequest = new PayPalCheckout.orders.OrdersCaptureRequest(
      orderID
    );
    captureRequest.requestBody({});

    await this.payPalClient.execute(captureRequest);
  };

  //#endregion
};
