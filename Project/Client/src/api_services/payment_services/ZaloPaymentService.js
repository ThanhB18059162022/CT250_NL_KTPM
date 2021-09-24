export default class ZaloPaymentService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  // Tạo đơn hàng theo danh sách sản phẩm
  createOrder = async (cart) => {
    const successUrl = "http://localhost:3000";
    const cancelUrl = "http://localhost:3000";

    const { url } = await this.apiCaller.post(
      `zalo/createOrder?successUrl=${successUrl}&cancelUrl=${cancelUrl}`,
      cart
    );

    return url;
  };
}
