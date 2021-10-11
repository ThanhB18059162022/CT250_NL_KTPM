const { NotExistError } = require("../../errors/errorsContainer");
const ModelDAO = require("../ModelDAO");

module.exports = class PaymentsDAO extends ModelDAO {
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

    if (this.emptyData(product)) {
      throw new NotExistError(`prod_no: ${prod_no}, pd_no: ${pd_no}`);
    }

    return { ...product, prod_price: product.pd_price, prod_quantity };
  };

  saveOrder = async (order) => {
    console.log("Đã save", order);

    return order.id;
  };

  getSaveOrder = async (id) => {
    const sql = `SELECT * FROM Orders WHERE order_no = ?`;

    const order = (await this.sqldao.query(sql, [id]))[0];

    if (this.emptyData(order)) {
      throw new NotExistError(`Order id: ${id}`);
    }

    return order;
  };
};
