const PRODUCTS = [
  { id: 1, name: "product1", price: 0.01 },
  { id: 2, name: "sản phẩm 2", price: 0.01 },
];

module.exports = class PaymentSerivce {
  constructor(dao, currency_code = "USD") {
    this.dao = dao;
    this.currency_code = currency_code;
  }

  // Lấy danh sách sản phẩm
  // Mỗi phần tử trong danh sách phải có 3 phần
  // Tên - Giá tiền - Số lượng
  // name - price - quantity
  createOrderBody = async (orderProducts) => {
    const products = [];

    // Lấy ra sản phẩm từ CSDL
    for (const op of orderProducts) {
      // const product = await this.dao.getProductById(op.prod_no);
      const product = PRODUCTS.filter((p) => p.id == op.id)[0];
      products.push({ ...product, quantity: op.quantity });
    }

    // Tính tổng tiền trong mảng mà client gửi
    // Tiền * số lượng
    // Làm tròn số sau dấu phẩy
    // Paypal chỉ lấy 2 số sau dấu phẩy
    const total =
      Math.round(
        100 *
          products.reduce((sum, p) => {
            return sum + p.price * p.quantity;
          }, 0)
      ) / 100; // Số 0 là giá trị khởi tạo của sum

    const order = {
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
          items: products.map((prod) => {
            // Chi tiết của từng sản phẩm
            return {
              name: prod.name,
              // Giá
              unit_amount: {
                currency_code: this.currency_code,
                value: prod.price,
              },
              // Số lượng
              quantity: prod.quantity,
            };
          }),
        },
      ],
    };

    return order;
  };

  saveOrder = async (order) => {
    console.log(order);
  };
};
