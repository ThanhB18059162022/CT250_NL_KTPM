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

    const moderator = this.checkExistAsync(
      async () => await this.dao.getModeratorByNo(mod_no),
      this.dao.emptyData,
      `mod_no: ${mod_no}`
    );

    return moderator;
  };

  // Lấy quản trị viên theo số điện thoại
  getModeratorByPhoneNumber = async (mod_phoneNumber) => {
    this.checkValidate(() =>
      this.validator.validatePhoneNumber(mod_phoneNumber)
    );

    const moderator = this.checkExistAsync(
      async () => await this.dao.getModeratorByPhoneNumber(mod_phoneNumber),
      this.dao.emptyData,
      `mod_phoneNumber: ${mod_phoneNumber}`
    );

    return moderator;
  };

  // Lấy quản trị viên theo CMND
  getModeratorByMod_Id = async (mod_id) => {
    this.checkValidate(() => this.validator.validateMod_Id(mod_id));

    const moderator = await this.checkExistAsync(
      async () => await this.dao.getModeratorByMod_Id(mod_id),
      this.dao.emptyData,
      `mod_id: ${mod_id}`
    );

    return moderator;
  };

  // Lấy quản trị viên theo tài khoản
  getModeratorByUsername = async (mod_username) => {
    this.checkValidate(() => this.validator.validateUsername(mod_username));

    const moderator = await this.checkExistAsync(
      async () => await this.dao.getModeratorByUsername(mod_username),
      this.dao.emptyData,
      `mod_username: ${mod_username}`
    );

    return moderator;
  };

  //#endregion

  //#region  ADD

  // Thêm quản trị viên
  addModerator = async (newModerator) => {
    this.checkValidate(() => this.validator.validateAddModerator(newModerator));

    // Số điện thoại tồn tại
    await this.existPhoneNumber(
      newModerator.mod_phoneNumber,
      `mod_phoneNumber: ${newModerator.mod_phoneNumber}`
    );

    // Số CMND tồn tại
    await this.existMod_Id(
      newModerator.mod_id,
      `mod_id: ${newModerator.mod_id}`
    );

    // Tài khoản tồn tại
    await this.existUsername(
      newModerator.mod_username,
      `mod_username: ${newModerator.mod_username}`
    );

    // Thêm mod mới
    const moderator = await this.dao.addModerator(newModerator);

    return moderator;
  };

  //#endregion

  //#region UPDATE

  // Cập nhật thông tin quản trị viên
  updateModerator = async (mod_noParam, newInfo) => {
    this.checkValidate(() => this.validator.validateUpdateModerator(newInfo));

    //Quản trị viên có tồn tại
    const oldInfo = await this.getModeratorByNo(mod_noParam);

    // Số điện thoại tồn tại
    await this.existPhoneNumberNotOldData(
      newInfo.mod_phoneNumber,
      newInfo.mod_no,
      oldInfo.mod_no,
      `mod_phoneNumber: ${newInfo.mod_phoneNumber}`
    );

    // Số CMND tồn tại
    await this.existMod_IdNotOldData(
      newInfo.mod_id,
      newInfo.mod_no,
      oldInfo.mod_no,
      `mod_id: ${newInfo.mod_id}`
    );

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

  //#region  EX

  // Kiểm tra tồn tại SDT
  existPhoneNumber = async (phoneNumber, message) => {
    await this.existData(
      async () => await this.getModeratorByPhoneNumber(phoneNumber),
      message
    );
  };

  // Tồn tại SDT nhưng không phải số cũ
  existPhoneNumberNotOldData = async (phoneNumber, newId, oldId, message) => {
    await this.existDataNotOldData(
      async () => await this.existPhoneNumber(phoneNumber, message),
      newId,
      oldId
    );
  };

  // Tồn tại CMND
  existMod_Id = async (mod_id, message) => {
    await this.existData(
      async () => await this.getModeratorByMod_Id(mod_id),
      message
    );
  };

  // Không phải CMND cũ
  existMod_IdNotOldData = async (mod_id, newId, oldId, message) => {
    await this.existDataNotOldData(
      async () => await this.existMod_Id(mod_id, message),
      newId,
      oldId
    );
  };

  existUsername = async (mod_username, message) => {
    await this.existData(
      async () => await this.getModeratorByUsername(mod_username),
      message
    );
  };

  //#endregion
};
