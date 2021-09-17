// Tham khảo https://developer.paypal.com/docs/business/checkout/server-side-api-calls/capture-order/
// https://developer.paypal.com/docs/business/checkout/server-side-api-calls/set-up-sdk/
// https://www.youtube.com/watch?v=AtZGoueL4Vs
// https://www.youtube.com/watch?v=DNM9FdFrI1k
const PayPalCheckout = require("@paypal/checkout-server-sdk");

// Bên client button createOrder vs onApprove để gọi api bên đây
module.exports = class PayPalService {
  // Lưu các order đã đặt mà chưa thanh toán sau 1 ngày sẽ xóa
  static tempOrders = []; //TODO

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
  createOrder = async ({ customer, products }) => {
    // Tạo order từ giỏ hàng
    const orderBody = await this.createOrderBody(products);

    // Tạo request paypal để gọi paypal api
    const createRequest = new PayPalCheckout.orders.OrdersCreateRequest();

    // Có 2 loại minimum và representation
    createRequest.prefer("return=representation");
    createRequest.requestBody(orderBody);

    // Gọi api paypal để tạo order - có exception khi không hợp lệ body
    const newOrder = await this.payPalClient.execute(createRequest);

    return newOrder.result;
  };

  // orderProducts mảng đối tượng có 2 phần tử
  // Mã và số lượng
  createOrderBody = async (products = []) => {
    const orderProducts = await this.dao.getOrderProducts(products);

    // Tính tổng tiền
    const total = this.getTotalPrice(orderProducts);

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

  //#endregion

  //#region  CAPTURE ORDER

  // Thanh toán
  captureOrder = async (orderID) => {
    const captureRequest = new PayPalCheckout.orders.OrdersCaptureRequest(
      orderID
    );

    captureRequest.requestBody({});

    // Cái này gọi để thanh toán tiền
    const orderCapture = await this.payPalClient.execute(captureRequest);

    // Lưu vào CSDL
    await this.dao.saveOrder(orderCapture.result);

    return orderCapture.result;
  };

  //#endregion
};
