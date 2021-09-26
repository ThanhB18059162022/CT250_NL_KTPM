// Tham khảo https://developer.paypal.com/docs/business/checkout/server-side-api-calls/capture-order/
// https://developer.paypal.com/docs/business/checkout/server-side-api-calls/set-up-sdk/
// https://www.youtube.com/watch?v=AtZGoueL4Vs
// https://www.youtube.com/watch?v=DNM9FdFrI1k
const PayPalCheckout = require("@paypal/checkout-server-sdk");

// Adapter cho PayPalCheckout
module.exports = class PayPalService {
  constructor(config) {
    const { clientId, secretId, env, currency_code } = config;

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

  //#region CREATE ORDER

  // Tạo đơn hàng theo tổng tiền
  createOrder = async (total) => {
    // Tạo request paypal để gọi paypal api
    const createRequest = new PayPalCheckout.orders.OrdersCreateRequest();

    // Có 2 loại minimum và representation
    createRequest.prefer("return=representation");

    const orderBody = this.createOrderBody(total);
    createRequest.requestBody(orderBody);

    // Gọi api paypal để tạo order - có exception khi không hợp lệ body
    const {
      result: { id }, //Lấy ra id
    } = await this.payPalClient.execute(createRequest);

    return id;
  };

  // Tính tiền theo giá và số lượng trong mảng
  createOrderBody = (total) => {
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

  //#endregion

  //#region  CAPTURE ORDER

  // Thanh toán
  captureOrder = async (orderID) => {
    const captureRequest = new PayPalCheckout.orders.OrdersCaptureRequest(
      orderID
    );
    captureRequest.requestBody({});

    // Cái này gọi để thanh toán tiền
    await this.payPalClient.execute(captureRequest);
  };

  //#endregion
};
