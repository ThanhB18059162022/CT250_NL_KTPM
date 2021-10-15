const mysql = require("mysql");
const { promisify } = require("util");

module.exports = class MysqlDAO {
  constructor(config) {
    this.connection = mysql.createConnection(config);
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

  //#region Trans

  //Tạo giao dịch
  beginTrans = async () => {
    const promTrans = promisify(
      this.connection.beginTransaction.bind(this.connection)
    );

    return await promTrans();
  };

  //Dành khi bị lỗi
  rollBack = async () => {
    const promRoll = promisify(this.connection.rollback.bind(this.connection));

    await promRoll();
  };

  //Kết thúc trans
  commit = async () => {
    const promCom = promisify(this.connection.commit.bind(this.connection));

    await promCom();
  };

  //#endregion

  //Chuyển callback sang promise
  getPromsieQuery = () =>
    promisify(this.connection.query.bind(this.connection));
};
