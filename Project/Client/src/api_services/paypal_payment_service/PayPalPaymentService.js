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
    const order = await this.apiCaller.post("paypal/createOrder", products);

    return order.id;
  };

  // Thanh toán đơn hàng
  captureOrder = async (orderId) => {
    const order = await this.apiCaller.get(`paypal/captureOrder/${orderId}`);

    return order;
  };
}
