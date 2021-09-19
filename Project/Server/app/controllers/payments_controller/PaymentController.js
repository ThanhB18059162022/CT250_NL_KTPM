// Abstract class
module.exports = class PaymentController {
  constructor(dao) {
    if (this.constructor === PaymentController) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.dao = dao;
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
    const total =
      Math.round(
        100 *
          products.reduce((sum, prod) => {
            return sum + prod.prod_price * prod.prod_quantity;
          }, 0) // Số 0 là giá trị khởi tạo của sum
      ) / 100;

    return total;
  };

  // Lưu đơn hàng
  saveOrder = async (order) => {
    const paidOrder = { ...order, paid: true };

    // Lưu vào CSDL
    await this.dao.saveOrder(paidOrder);

    return paidOrder;
  };
};
