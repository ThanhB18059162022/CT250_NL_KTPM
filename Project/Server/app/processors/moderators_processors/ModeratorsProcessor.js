const Processor = require("../Processor");

module.exports = class ModeratorsProcessor extends Processor {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao) {
    super();
    this.validator = validator;
    this.dao = dao;
  }

  //#region  GET

  // Lấy ra danh sách quản trị viên
  getModerators = async ({ page = 1, limit = 10 }) => {
    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );

    const moderators = await this.dao.getModerators(startIndex, endIndex);

    const moderatorsPage = this.getPaginatedResults(
      moderators,
      pageIndex,
      limitIndex
    );

    return moderatorsPage;
  };

  // Lấy ra quản trị viên theo mã
  getModeratorByNo = async (mod_noParam) => {
    const mod_no = Number(mod_noParam);
    this.checkValidate(() => this.validator.validateNo(mod_no));

    const moderator = await this.dao.getModeratorByNo(mod_no);

    return moderator;
  };

  // Lấy quản trị viên theo số điện thoại
  getModeratorByPhoneNumber = async (mod_phoneNumber) => {
    this.checkValidate(() =>
      this.validator.validatePhoneNumber(mod_phoneNumber)
    );

    const moderator = await this.dao.getModeratorByPhoneNumber(mod_phoneNumber);

    return moderator;
  };

  // Lấy quản trị viên theo CMND
  getModeratorByMod_Id = async (mod_id) => {
    this.checkValidate(() => this.validator.validateMod_Id(mod_id));

    const moderator = await this.dao.getModeratorByMod_Id(mod_id);

    return moderator;
  };

  // Lấy quản trị viên theo tài khoản
  getModeratorByUsername = async (mod_username) => {
    this.checkValidate(() => this.validator.validateUsername(mod_username));

    const moderator = await this.dao.getModeratorByUsername(mod_username);

    return moderator;
  };

  //#endregion

  //#region  ADD

  // Thêm quản trị viên
  addModerator = async (newModerator) => {
    this.checkValidate(() => this.validator.validateAddModerator(newModerator));

    // Thêm mod mới
    const moderator = await this.dao.addModerator(newModerator);

    return moderator;
  };

  //#endregion

  //#region UPDATE

  // Cập nhật thông tin quản trị viên
  updateModerator = async (mod_no, newInfo) => {
    this.checkValidate(() => this.validator.validateUpdateModerator(newInfo));

    //Quản trị viên có tồn tại
    const oldInfo = await this.getModeratorByNo(mod_no);

    // Cập nhật
    await this.dao.updateModerator(oldInfo.mod_no, newInfo);
  };

  //#endregion

  //#region LOCK

  // Khóa tài khoản quản trị viên
  lockModerator = async (mod_noParam) => {
    const moderator = await this.getModeratorByNo(mod_noParam);

    await this.dao.lockModerator(moderator.mod_no);
  };

  //#endregion
};
