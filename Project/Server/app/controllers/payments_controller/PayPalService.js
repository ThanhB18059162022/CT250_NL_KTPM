// Tham khảo https://developer.paypal.com/docs/business/checkout/server-side-api-calls/capture-order/
// https://developer.paypal.com/docs/business/checkout/server-side-api-calls/set-up-sdk/
// https://www.youtube.com/watch?v=AtZGoueL4Vs
// https://www.youtube.com/watch?v=DNM9FdFrI1k
const PayPalCheckout = require("@paypal/checkout-server-sdk");

// Bên client button createOrder vs onApprove để gọi api bên đây
module.exports = class PayPalService {
  constructor(config, productService) {
    const {
      clientId,
      secretId,
      env = "sandbox",
      currency_code = "USD",
    } = config;

    this.clientId = clientId;
    this.currency_code = currency_code;
    this.payPalClient = this.createClient(clientId, secretId, env);
    this.productService = productService;
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
  orderExist = async (orderId) => {
    try {
      await this.getOrderById(orderId);

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
  createOrder = async (orderBody) => {
    // Tạo request paypal để gọi paypal api
    const createRequest = new PayPalCheckout.orders.OrdersCreateRequest();

    // Có 2 loại minimum và representation
    createRequest.prefer("return=representation");
    createRequest.requestBody(orderBody);

    // Gọi api paypal để tạo order - có exception khi không hợp lệ body
    const newOrder = await this.payPalClient.execute(createRequest);

    return newOrder.result;
  };

  // Lấy danh sách sản phẩm
  // Mỗi phần tử trong danh sách phải có 3 phần
  // Tên - Giá tiền - Số lượng
  // name - price - quantity
  createOrderBody = (products) => {
    const total = this.productService.calculateTotalPrice(products);

    return {
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
              // Ship vs giảm giá
              // shipping: 0,
              // tax_total: 0,
              // discount: 0,
            },
          },
          // Từng sản phẩm, có breakdown mới xài cái này
          //   items: req.body.items.map((item) => {
          //     const storeItem = storedItems.get(item.id);
          //     // Chi tiết của từng sản phẩm
          //     return {
          //       name: storeItem.name,
          //       // Giá
          //       unit_amount: {
          //         currency_code: this.currency_code,
          //         value: storeItem.price,
          //       },
          //       // Số lượng
          //       quantity: item.quantity,
          //     };
          //   }),
        },
      ],
    };
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

    return orderCapture.result;
  };

  //#endregion
};
