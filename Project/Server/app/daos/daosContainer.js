// Facade Lớp lưu export
// Sẽ require thông qua lớp này

import MysqlDAOFake from "./MysqlDAOFake.js";
import MysqlDAO from "./MysqlDAO.js";
import ThuongHieuDAO from "./ThuongHieuDAO.js";

export {
  MysqlDAO as DAO, // Xài mysql
  ThuongHieuDAO,
  // DAO: MysqlConnectionFake, // Xài mysql fake
};
