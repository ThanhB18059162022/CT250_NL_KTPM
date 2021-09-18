export default class PayPalPaymentService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  // Tạo đơn hàng theo danh sách sản phẩm
  createOrder = async (products) => {
    const order = await this.apiCaller.post("stripe/createOrder", {
      products,
      url: {
        success: "http://localhost:3000",
        cancel: "http://localhost:3000",
      },
    });

    return order.url;
  };
}
