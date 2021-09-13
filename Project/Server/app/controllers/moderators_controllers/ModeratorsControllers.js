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
    const { body: newModerator } = req;

    const result = this.validator.validateAddModerator(newModerator);
    if (result.hasAnyError) {
      return res.status(400).json();
    }

    // Số điện thoại tồn tại
    const existPhoneNumber = await this.existPhoneNumber(
      newModerator.mod_phoneNumber
    );
    if (existPhoneNumber) {
      return res.status(400).json();
    }

    // Số CMND tồn tại
    const existMod_Id = await this.existMod_Id(newModerator.mod_id);
    if (existMod_Id) {
      return res.status(400).json();
    }

    const moderator = await this.dao.addModerator(newModerator);

    return res.status(201).json(moderator);
  };

  existPhoneNumber = async (phoneNumber) => {
    const moderatorHasPhoneNumber = await this.dao.getModeratorByPhoneNumber(
      phoneNumber
    );

    return this.validator.existModerator(moderatorHasPhoneNumber);
  };

  existMod_Id = async (mod_id) => {
    const moderatorHasMod_Id = await this.dao.getModeratorByMod_Id(mod_id);

    return this.validator.existModerator(moderatorHasMod_Id);
  };

  //#endregion

  //#region UPDATE

  // Cập nhật thông tin quản trị viên
  updateModerator = async (req, res) => {
    //#region Xác thực thông tin

    // Mã quản trị
    const { mod_no: mod_noParam } = req.params;

    const mod_no = Number(mod_noParam);

    const valNoResult = this.validator.validateNo(mod_no);
    if (valNoResult.hasAnyError) {
      return res.status(400).json(valNoResult.error);
    }

    // Thông tin sửa
    const { body: newModeratorInfo } = req;

    const valUpResult =
      this.validator.validateUpdateModerator(newModeratorInfo);
    if (valUpResult.hasAnyError) {
      return res.status(400).json(valNoResult.error);
    }

    //#endregion

    //#region Kiểm tra tồn tại

    //Quản trị viên
    const moderator = await this.dao.getModeratorByNo(mod_no);
    if (!this.validator.existModerator(moderator)) {
      return res.status(404).json({});
    }

    // Số điện thoại tồn tại
    const moderatorHasPhoneNumber = await this.dao.getModeratorByPhoneNumber(
      newModeratorInfo.mod_phoneNumber
    );
    const existPhoneNumber = this.validator.existModerator(
      moderatorHasPhoneNumber
    );

    // Tồn tại số điện thoại và số điện thoại của mod khác
    if (
      existPhoneNumber &&
      this.notOldModeratorInfo(moderator, moderatorHasPhoneNumber)
    ) {
      return res.status(400).json();
    }

    // Số CMND tồn tại
    const moderatorHasMod_Id = await this.dao.getModeratorByMod_Id(
      newModeratorInfo.mod_id
    );
    const existMod_Id = this.validator.existModerator(moderatorHasMod_Id);

    // Tồn tại số CMND và của mod khác
    if (
      existMod_Id &&
      this.notOldModeratorInfo(moderator, moderatorHasMod_Id)
    ) {
      return res.status(400).json();
    }

    //#endregion

    // Cập nhật
    await this.dao.updateModerator(mod_no, newModeratorInfo);

    return res.status(204).json({});
  };

  // Kiểm tra khi cập nhật lại thông tin cũ
  notOldModeratorInfo(newInfo, oldInfo) {
    return newInfo.mod_no !== oldInfo.mod_no;
  }

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
