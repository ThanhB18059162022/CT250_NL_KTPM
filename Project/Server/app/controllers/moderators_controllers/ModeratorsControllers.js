const { getPaginatedResults } = require("../controllerHelper");

module.exports = class ModeratorsControllers {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao) {
    this.validator = validator;
    this.dao = dao;
  }

  //#region  GET

  // Lấy ra danh sách quản trị viên
  getModerators = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const moderatorsPage = await getPaginatedResults(
      this.dao.getModerators,
      page,
      limit
    );

    return res.json(moderatorsPage);
  };

  // Lấy ra quản trị viên theo mã
  getModeratorByNo = async (req, res) => {
    const { mod_no: mod_noParam } = req.params;

    const mod_no = Number(mod_noParam);

    const result = this.validator.validateNo(mod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const moderator = await this.dao.getModeratorByNo(mod_no);
    if (!this.validator.existModerator(moderator)) {
      return res.status(404).json({});
    }

    return res.json(moderator);
  };

  // Lấy quản trị viên theo số điện thoại
  getModeratorByPhoneNumber = async (req, res) => {
    const { mod_phoneNumber } = req.params;

    const result = this.validator.validatePhoneNumber(mod_phoneNumber);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const moderator = await this.dao.getModeratorByPhoneNumber(mod_phoneNumber);
    if (!this.validator.existModerator(moderator)) {
      return res.status(404).json({});
    }

    return res.json(moderator);
  };

  //#endregion

  //#region  ADD

  // Thêm quản trị viên
  addModerator = async (req, res) => {
    const { body: moderator } = req;

    const result = this.validator.validateModerator(moderator);
    if (result.hasAnyError) {
      return res.status(400).json();
    }

    if (this.existPhoneNumber(moderator.mod_phoneNumber)) {
      return res.status(400).json();
    }
  };

  existPhoneNumber = async (phoneNumber) => {
    const moderatorHasPhoneNumber = await this.dao.getModeratorByPhoneNumber(
      phoneNumber
    );

    return this.validator.existModerator(moderatorHasPhoneNumber);
  };
  //#endregion

  //#region LOCK

  // Khóa tài khoản quản trị viên
  lockModerator = async (req, res) => {
    const { mod_no: mod_noParam } = req.params;
    const mod_no = Number(mod_noParam);

    const result = this.validator.validateNo(mod_no);
    if (result.hasAnyError) {
      return res.status(400).json();
    }

    const moderator = await this.dao.getModeratorByNo(mod_no);
    if (!this.validator.existModerator(moderator)) {
      return res.status(404).json({});
    }

    await this.dao.lockModerator(mod_no);

    return res.status(204).json({});
  };

  //#endregion
};
