export default class ZaloPaymentService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  // Tạo đơn hàng theo danh sách sản phẩm
  createOrder = async (cart) => {
    const successUrl = "http://octopuszyuw.com:3000/success/zalo";
    const cancelUrl = "http://octopuszyuw.com:3000/cart";
    const { url } = await this.apiCaller.post(
      `payments/zalo/createOrder?successUrl=${successUrl}&cancelUrl=${cancelUrl}`,
      cart
    );

    return url;
  };
}
