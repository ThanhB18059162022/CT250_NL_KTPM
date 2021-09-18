// Danh sách sp tượng trưng cho CSDL
const PRODUCTS = [
  { prod_no: 1, prod_name: "product1", prod_price: 0.01 },
  { prod_no: 2, prod_name: "sản phẩm 2", prod_price: 0.01 },
];

module.exports = class CustomersOrdersDAO {
  getOrderProduct = async (prod_no) => {
    const prod = PRODUCTS.filter((p) => p.prod_no === prod_no)[0];

    return prod;
  };

  saveOrder = async (order) => {
    console.log("Đã save", order);
  };
};
