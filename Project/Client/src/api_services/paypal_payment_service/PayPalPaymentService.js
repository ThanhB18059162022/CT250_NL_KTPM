export default class PayPalPaymentService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  getClientId = async () => {
    const { clientId } = await this.apiCaller.get("paypal/clientid");

    return clientId;
  };

  // Tạo đơn hàng theo danh sách sản phẩm
  createOrder = async (products) => {
    const { orderID } = await this.apiCaller.post("paypal/createOrder", {
      customer: {},
      products,
    });

    return orderID;
  };

  // Thanh toán đơn hàng
  captureOrder = async (orderID) => {
    const order = await this.apiCaller.get(`paypal/captureOrder/${orderID}`);

    return order;
  };
}
