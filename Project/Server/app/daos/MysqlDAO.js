const mysql = require("mysql");
const config = require("../config.json");
const { promisify } = require("util");

module.exports = class MysqlDAO {
  constructor() {
    this.connection = mysql.createConnection(config.dbConnection);
  }

  //Trả về các dòng
  query = async (sql, params = []) => {
    const promQuery = this.getPromsieQuery();

    const rows = await promQuery(sql, params);

    return rows;
  };

  //Trả về số dòng affected
  execute = async (sql, params = []) => {
    const promQuery = this.getPromsieQuery();

    const { affectedRows } = await promQuery(sql, params);

    return affectedRows;
  };

  //Chuyển callback sang promise
  getPromsieQuery = () =>
    promisify(this.connection.query.bind(this.connection));

  //Tạo giao dịch
  beginTrans = () => this.connection?.beginTransaction();

  //Kết thúc truy vấn
  done = () => this.connection?.end();
};