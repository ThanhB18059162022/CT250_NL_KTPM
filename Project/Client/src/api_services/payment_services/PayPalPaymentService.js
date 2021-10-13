export default class PayPalPaymentService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  getClientId = async () => {
    const { clientId } = await this.apiCaller.get("payments/paypal/clientid");

    return clientId;
  };

  // Tạo đơn hàng theo danh sách sản phẩm
  createOrder = async (cart) => {
    const { orderID } = await this.apiCaller.post("payments/paypal/createOrder", cart);

    return orderID;
  };

  // Thanh toán đơn hàng
  captureOrder = async (orderID) => {
    const { saveOrderId } = await this.apiCaller.get(
      `payments/paypal/captureOrder/${orderID}`
    );

    return saveOrderId;
  };
}
