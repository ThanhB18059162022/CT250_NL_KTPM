const { NotExistError } = require("../../errors/errorsContainer");
const ModelDAO = require("../ModelDAO");

module.exports = class PaymentsDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  // Mã sản phẩm và mã chi tiết
  getOrderProduct = async ({ prod_no, pd_no, prod_quantity, prod_color }) => {
    const sql = `SELECT p.prod_no, p.prod_name, pd.pd_price, pd.pd_no
                 FROM Products AS p, Products_Details AS pd 
                 WHERE p.prod_no = pd.prod_no AND p.prod_no = ? 
                 AND pd.pd_no = ?;`;

    const product = (await this.sqldao.query(sql, [prod_no, pd_no]))[0];

    if (this.emptyData(product)) {
      throw new NotExistError(`prod_no: ${prod_no}, pd_no: ${pd_no}`);
    }

    return {
      ...product,
      prod_price: product.pd_price,
      prod_quantity,
      prod_color,
    };
  };

  //#region INSERT

  saveOrder = async (order) => {
    await this.sqldao.beginTrans();

    try {
      const dbOrder = this.toDbOrder(order);

      const dbParams = this.extractParams(dbOrder);
      const cus_no = await this.saveCustomer(order.customer);
      dbParams.push(cus_no);

      const sql = `INSERT INTO Orders(order_id, order_total, order_create, order_pay, order_payment, cus_no)
      VALUES (?, ?, ?, ?, ?, ?);`;

      await this.sqldao.execute(sql, dbParams);

      const { order_no } = (
        await this.sqldao.query(`SELECT * FROM Orders WHERE order_id=?`, [
          order.id,
        ])
      )[0];

      await this.saveOrderDetails(order_no, order.orderProducts);

      await this.sqldao.commit();

      return order_no;
    } catch (error) {
      await this.sqldao.rollBack();

      throw error;
    }
  };

  toDbOrder = (order) => {
    const { id, total, payment, createTime, payTime } = order;

    return {
      id,
      total,
      createTime,
      payTime,
      payment,
    };
  };

  saveCustomer = async (customer) => {
    const dbCustomer = this.toDbCustomer(customer);
    const dbParmas = this.extractParams(dbCustomer);

    const sqlIn = `INSERT INTO Customers(cus_name, cus_id, cus_email, cus_sex, cus_location, cus_phoneNumber)
    VALUES (?, ?, ?, ?, ?, ?);`;

    await this.sqldao.execute(sqlIn, dbParmas);

    const sqlOut = `SELECT cus_no FROM Customers
    WHERE cus_name = ? 
    AND cus_id = ?
    AND cus_email  = ?
    AND cus_sex = ?
    AND cus_location = ?
    AND cus_phoneNumber = ?
    ORDER BY cus_no DESC LIMIT 1;`;

    const { cus_no } = (await this.sqldao.query(sqlOut, dbParmas))[0];

    return cus_no;
  };

  toDbCustomer = (customer) => {
    const {
      cus_name,
      cus_id,
      cus_email,
      cus_sex,
      cus_address,
      cus_phoneNumber,
    } = customer;

    return {
      cus_name,
      cus_id,
      cus_email,
      cus_sex,
      cus_address,
      cus_phoneNumber,
    };
  };

  saveOrderDetails = async (order_no, details) => {
    console.log(details);
    const sql = `INSERT INTO Orders_Details(order_no, pd_no, od_quantity, prod_color) 
    VALUES(?, ?, ?, ?);`;

    for (let i = 0; i < details.length; i++) {
      const { pd_no, prod_quantity, prod_color } = details[i];

      await this.sqldao.execute(sql, [
        order_no,
        pd_no,
        prod_quantity,
        prod_color,
      ]);
    }
  };

  //#endregion

  //#region READ

  getSaveOrder = async (id) => {
    const sql = `SELECT * FROM Orders WHERE order_no = ?;`;

    const order = (await this.sqldao.query(sql, [id]))[0];
    if (this.emptyData(order)) {
      throw new NotExistError(`Order id: ${id}`);
    }

    const products = await this.getSaveOrderProducts(id);
    order.products = products;

    const customer = await this.getSaveOrderCustomer(order.cus_no);
    order.customer = customer;

    return order;
  };

  getAllSaveOrder = async () => {
    const sql = `SELECT * FROM Orders ORDER BY order_no DESC`;
    const orders = await this.sqldao.query(sql, []);
    const orders_info = await Promise.all(
      orders.map(async (order) => {
        const products = await this.getSaveOrderProducts(order.order_no);
        order.orderProducts = products;

        const customer = await this.getSaveOrderCustomer(order.cus_no);
        order.customer = customer;
        return order;
      })
    );
    return orders_info;
  };

  getSaveOrderProducts = async (id) => {
    const sql = `SELECT p.prod_name, pd.pd_price AS prod_price, od.od_quantity AS prod_quantity, od.pd_no as pd_no, pd.prod_no as prod_no, od.prod_color as prod_color
    FROM Orders_Details AS od, Products_Details AS pd, Products AS p 
    WHERE od.pd_no = pd.pd_no AND p.prod_no = pd.prod_no 
    AND od.order_no = ?;`;

    const products = await this.sqldao.query(sql, [id]);

    return products;
  };

  getSaveOrderCustomer = async (cus_no) => {
    const sql = `SELECT * FROM Customers WHERE cus_no = ?`;

    const customer = (await this.sqldao.query(sql, [cus_no]))[0];

    return customer;
  };

  //#endregion
};
