// Abstract class
module.exports = class PaymentController {
  constructor(dao, exchangeService) {
    if (this.constructor === PaymentController) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.dao = dao;
    this.exchangeService = exchangeService;
  }

  // Lấy ra danh sách sản phẩm đặt hàng
  // Có giá tiền trong CSDL
  getOrderProducts = async (products) => {
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      const { prod_no, prod_quantity } = products[i];
      // Lấy giá theo mã
      const prod = await this.dao.getOrderProduct(prod_no);

      orderProducts.push({
        ...prod,
        prod_quantity,
      });
    }

    return orderProducts;
  };

  // Tính tổng tiền trong mảng mà client gửi
  // Tiền * số lượng
  // Làm tròn 2 số sau dấu phẩy
  // Paypal chỉ lấy 2 số sau dấu phẩy
  getTotalPrice = (products) => {
    const total = products.reduce((sum, prod) => {
      return sum + prod.prod_price * prod.prod_quantity;
    }, 0); // Số 0 là giá trị khởi tạo của sum

    // Lấy 2 số sau số 0
    return this.exchangeService.roundTakeTwo(total);
  };

  // Lưu đơn hàng
  saveOrder = async (order) => {
    const paidOrder = {
      ...order,
      payTime: new Date(), // Thời gian thanh toán đơn
      paid: true,
    };

    // Lưu vào CSDL
    await this.dao.saveOrder(paidOrder);

    return paidOrder;
  };
};
