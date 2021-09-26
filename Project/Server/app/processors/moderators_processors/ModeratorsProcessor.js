const Processor = require("../Processor");
const {
  NotValidError,
  NotExistError,
  ExistError,
} = require("../../errors/errorsContainer");

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
    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const moderators = await this.dao.getModerators(startIndex, endIndex);

    const moderatorsPage = this.getPaginatedResults(moderators, page, limit);

    return moderatorsPage;
  };

  // Lấy ra quản trị viên theo mã
  getModeratorByNo = async (mod_noParam) => {
    const mod_no = this.checkMod_No(mod_noParam);

    const moderator = await this.dao.getModeratorByNo(mod_no);
    if (this.dao.emptyModerator(moderator)) {
      throw new NotExistError();
    }

    return moderator;
  };

  // Lấy quản trị viên theo số điện thoại
  getModeratorByPhoneNumber = async (mod_phoneNumber) => {
    const result = this.validator.validatePhoneNumber(mod_phoneNumber);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    const moderator = await this.dao.getModeratorByPhoneNumber(mod_phoneNumber);
    if (this.dao.emptyModerator(moderator)) {
      throw new NotExistError();
    }

    return moderator;
  };

  // Lấy quản trị viên theo CMND
  getModeratorByMod_Id = async (mod_id) => {
    const result = this.validator.validateMod_Id(mod_id);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    const moderator = await this.dao.getModeratorByMod_Id(mod_id);
    if (this.dao.emptyModerator(moderator)) {
      throw new NotExistError();
    }

    return moderator;
  };

  // Lấy quản trị viên theo tài khoản
  getModeratorByUsername = async (mod_username) => {
    const result = this.validator.validateUsername(mod_username);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    const moderator = await this.dao.getModeratorByUsername(mod_username);
    if (this.dao.emptyModerator(moderator)) {
      throw new NotExistError();
    }

    return moderator;
  };

  //#endregion

  //#region  ADD

  // Thêm quản trị viên
  addModerator = async (newModerator) => {
    const result = this.validator.validateAddModerator(newModerator);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    // Số điện thoại tồn tại
    await this.existPhoneNumber(newModerator.mod_phoneNumber);

    // Số CMND tồn tại
    await this.existMod_Id(newModerator.mod_id);

    // Tài khoản tồn tại
    await this.existUsername(newModerator.mod_username);

    // Thêm mod mới
    const moderator = await this.dao.addModerator(newModerator);

    return moderator;
  };

  //#endregion

  //#region UPDATE

  // Cập nhật thông tin quản trị viên
  updateModerator = async (mod_noParam, newInfo) => {
    // Thông tin sửa
    const result = this.validator.validateUpdateModerator(newInfo);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    //Quản trị viên có tồn tại
    const oldInfo = await this.getModeratorByNo(mod_noParam);

    // Số điện thoại tồn tại
    await this.existPhoneNumberNotOldData(
      newInfo.mod_phoneNumber,
      newInfo.mod_no,
      oldInfo.mod_no
    );

    // Số CMND tồn tại
    await this.existMod_IdNotOldData(
      newInfo.mod_id,
      newInfo.mod_no,
      oldInfo.mod_no
    );

    // Cập nhật
    await this.dao.updateModerator(oldInfo.mod_no, newInfo);
  };

  //#endregion

  //#region LOCK

  // Khóa tài khoản quản trị viên
  lockModerator = async (req, res) => {
    const { mod_no: mod_noParam } = req.params;
    const mod_no = Number(mod_noParam);

    const result = this.validator.validateNo(mod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const moderator = await this.dao.getModeratorByNo(mod_no);
    if (this.dao.emptyModerator(moderator)) {
      return res.status(404).json({});
    }

    await this.dao.lockModerator(mod_no);

    return res.status(204).json({});
  };

  //#endregion

  checkMod_No = (mod_noParam) => {
    const mod_no = Number(mod_noParam);
    const result = this.validator.validateNo(mod_no);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    return mod_no;
  };

  // Kiểm tra tồn tại SDT
  existPhoneNumber = async (phoneNumber) => {
    await this.existData(
      async () => await this.getModeratorByPhoneNumber(phoneNumber)
    );
  };

  // Tồn tại SDT nhưng không phải số cũ
  existPhoneNumberNotOldData = async (phoneNumber, newId, oldId) => {
    await this.existDataNotOldData(
      async () => await this.existPhoneNumber(phoneNumber),
      newId,
      oldId
    );
  };

  // Tồn tại CMND
  existMod_Id = async (mod_id) => {
    await this.existData(async () => await this.getModeratorByMod_Id(mod_id));
  };

  // Không phải CMND cũ
  existMod_IdNotOldData = async (mod_id, newId, oldId) => {
    await this.existDataNotOldData(
      async () => await this.existMod_Id(mod_id),
      newId,
      oldId
    );
  };

  existUsername = async (mod_username) => {
    await this.existData(
      async () => await this.getModeratorByUsername(mod_username)
    );
  };

  // Quăng lỗi khi exist - notvalid
  existData = async (asyncFunc) => {
    try {
      await asyncFunc();

      throw new ExistError();
    } catch (error) {
      if (!(error instanceof NotExistError)) {
        throw error;
      }
    }
  };

  // Kiểm tra thông tin tồn tại và không phải thông tin cũ
  existDataNotOldData = async (existAsyncFunc, newId, oldId) => {
    try {
      await existAsyncFunc();
    } catch (error) {
      // Không phải thông tin cũ quăng lỗi
      if (
        !(error instanceof ExistError && this.oldModeratorInfo(newId, oldId))
      ) {
        throw error;
      }
    }
  };

  // Kiểm tra khi cập nhật lại thông tin cũ
  oldModeratorInfo = (newId, oldId) => {
    return newId === oldId;
  };
};
