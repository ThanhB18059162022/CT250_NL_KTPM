const { getPaginatedResults } = require("../controllerHelper");

module.exports = class ModeratorsControllers {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao) {
    this.validator = validator;
    this.dao = dao;
  }
  getModerators = async () => {};
};
