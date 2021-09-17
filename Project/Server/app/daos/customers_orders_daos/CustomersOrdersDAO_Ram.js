// Danh sách sp tượng trưng cho CSDL
const PRODUCTS = [
  { prod_no: 1, prod_name: "product1", prod_price: 0.01 },
  { prod_no: 2, prod_name: "sản phẩm 2", prod_price: 0.01 },
];

module.exports = class CustomersOrdersDAO {
  getOrderProducts = async (products) => {
    const orderProducts = [];

    for (const prod of products) {
      const product = PRODUCTS.filter((p) => p.prod_no == prod.prod_no)[0];

      if (product?.prod_price === undefined) {
        throw Error("Chả có cái nào z hết");
      }

      orderProducts.push({
        prod_price: product.prod_price,
        prod_quantity: prod.prod_quantity,
      });
    }

    return orderProducts;
  };

  saveOrder = async (order) => {
    console.log("Đã save", order);
  };
};
