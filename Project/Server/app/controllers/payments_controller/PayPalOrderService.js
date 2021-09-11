const PRODUCTS = [
  { prod_no: 1, prod_name: "product1", prod_price: 0.01 },
  { prod_no: 2, prod_name: "sản phẩm 2", prod_price: 0.01 },
];

module.exports = class PaymentSerivce {
  constructor(dao, currency_code = "USD") {
    this.dao = dao;
    this.currency_code = currency_code;
  }

  // Chưa đụng
  // Lấy danh sách sản phẩm
  // Mỗi phần tử trong danh sách phải có 3 phần
  // Tên - Giá tiền - Số lượng
  // name - price - quantity
  createOrderBody = async (orderProducts) => {
    const products = [];

    // Lấy ra sản phẩm từ CSDL
    for (const op of orderProducts) {
      // const product = await this.dao.getProductById(op.prod_no);
      const product = PRODUCTS.filter((p) => p.prod_no == op.prod_no)[0];
      if (product === undefined) throw Error("Chả có cái nào z hết");
      products.push({ ...product, prod_quantity: op.prod_quantity });
    }

    // Tính tổng tiền trong mảng mà client gửi
    // Tiền * số lượng
    // Làm tròn số sau dấu phẩy
    // Paypal chỉ lấy 2 số sau dấu phẩy
    const total =
      Math.round(
        100 *
          products.reduce((sum, p) => {
            return sum + p.prod_price * p.prod_quantity;
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
              name: prod.prod_name,
              // Giá
              unit_amount: {
                currency_code: this.currency_code,
                value: prod.prod_price,
              },
              // Số lượng
              quantity: prod.prod_quantity,
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
