const ModelDAO = require("../ModelDAO");

module.exports = class CustomersOrdersDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  // Mã sản phẩm và mã chi tiết
  getOrderProduct = async ({ prod_no, pd_no, prod_quantity }) => {
    const sql = `SELECT p.prod_no, p.prod_name, pd.pd_price
                 FROM Products AS p, Products_Details AS pd 
                 WHERE p.prod_no = pd.prod_no AND p.prod_no = ? 
                 AND pd.pd_no = ?;`;

    const product = (await this.sqldao.query(sql, [prod_no, pd_no]))[0];

    return { ...product, prod_price: product.pd_price, prod_quantity };
  };

  saveOrder = async (order) => {
    console.log("Đã save", order);

    return order.id;
  };

  getSaveOrder = async (id) => {
    if (id === 1) {
      return {
        id,
        product: PRODUCTS.map((m) => ({
          ...m,
          prod_quantity: 3,
        })),
        customer: "alexander",
        time: Date.now(),
        payment: "Paypal",
        total: 6666666666,
      };
    }
  };
};
