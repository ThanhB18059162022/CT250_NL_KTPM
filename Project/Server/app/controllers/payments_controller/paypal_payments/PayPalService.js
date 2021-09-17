// Tham khảo https://developer.paypal.com/docs/business/checkout/server-side-api-calls/capture-order/
// https://developer.paypal.com/docs/business/checkout/server-side-api-calls/set-up-sdk/
// https://www.youtube.com/watch?v=AtZGoueL4Vs
// https://www.youtube.com/watch?v=DNM9FdFrI1k
const PayPalCheckout = require("@paypal/checkout-server-sdk");

// Danh sách sp tượng trưng cho CSDL
const PRODUCTS = [
  { prod_no: 1, prod_name: "product1", prod_price: 0.01 },
  { prod_no: 2, prod_name: "sản phẩm 2", prod_price: 0.01 },
];

// Bên client button createOrder vs onApprove để gọi api bên đây
module.exports = class PayPalService {
  constructor(config) {
    const {
      clientId,
      secretId,
      env = "sandbox",
      currency_code = "USD",
    } = config;

    this.clientId = clientId;
    this.currency_code = currency_code;
    this.payPalClient = this.createClient(clientId, secretId, env);
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

  // Tạo đơn hàng theo order body (định dạng theo paypal)
  createOrder = async ({ products }) => {
    // Tạo order từ giỏ hàng
    const orderBody = await this.createPayPalOrderBody(products);

    // Tạo request paypal để gọi paypal api
    const createRequest = new PayPalCheckout.orders.OrdersCreateRequest();

    // Có 2 loại minimum và representation
    createRequest.prefer("return=representation");
    createRequest.requestBody(orderBody);

    // Gọi api paypal để tạo order - có exception khi không hợp lệ body
    const newOrder = await this.payPalClient.execute(createRequest);

    return newOrder.result;
  };

  // Chưa đụng
  // Lấy danh sách sản phẩm
  // Mỗi phần tử trong danh sách phải có 3 phần
  // Tên - Giá tiền - Số lượng
  // name - price - quantity
  createPayPalOrderBody = async (orderProducts) => {
    const products = [];

    // Lấy ra sản phẩm từ CSDL
    for (const op of orderProducts) {
      // const product = await this.dao.getProductById(op.prod_no);
      const product = PRODUCTS.filter((p) => p.prod_no == op.prod_no)[0];

      if (product === undefined) throw Error("Chả có cái nào z hết");
      products.push({ ...product, prod_quantity: op.prod_quantity });
    }

    // Tính tổng tiền trong mảng mà client gửi
    // Tiền * số lượng
    // Làm tròn số sau dấu phẩy
    // Paypal chỉ lấy 2 số sau dấu phẩy
    const total =
      Math.round(
        100 *
          products.reduce((sum, p) => {
            return sum + p.prod_price * p.prod_quantity;
          }, 0)
      ) / 100; // Số 0 là giá trị khởi tạo của sum

    const order = {
      // Capture để thanh toán
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: this.currency_code,
            value: total, // Tổng tiền

            // Thông tin thêm
            breakdown: {
              item_total: {
                currency_code: this.currency_code,
                value: total, // Tổng tiền
              },
            },
          },
          // Từng sản phẩm, có breakdown mới xài cái này
          items: products.map((prod) => {
            // Chi tiết của từng sản phẩm
            return {
              name: prod.prod_name,
              // Giá
              unit_amount: {
                currency_code: this.currency_code,
                value: prod.prod_price,
              },
              // Số lượng
              quantity: prod.prod_quantity,
            };
          }),
        },
      ],
    };

    return order;
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
    console.log(orderCapture.result);

    return orderCapture.result;
  };

  //#endregion
};
