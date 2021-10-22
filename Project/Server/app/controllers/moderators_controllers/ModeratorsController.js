const Controller = require("../Controller");

module.exports = class ModeratorsController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  //#region  GET

  // Lấy ra danh sách quản trị viên
  getModerators = async (req, res) => {
    const moderatorsPage = await this.processor.getModerators(req.query);

    return this.ok(res, moderatorsPage);
  };

  // Lấy ra quản trị viên theo mã
  getModeratorByNo = async (req, res) => {
    const { mod_no } = req.params;

    const moderator = await this.processor.getModeratorByNo(mod_no);

    return this.ok(res, moderator);
  };

  // Lấy quản trị viên theo số điện thoại
  getModeratorByPhoneNumber = async (req, res) => {
    const { mod_phoneNumber } = req.params;

    const moderator = await this.processor.getModeratorByPhoneNumber(
      mod_phoneNumber
    );

    return this.ok(res, moderator);
  };

  // Lấy quản trị viên theo CMND
  getModeratorByMod_Id = async (req, res) => {
    const { mod_id } = req.params;

    const moderator = await this.processor.getModeratorByMod_Id(mod_id);

    return this.ok(res, moderator);
  };

  // Lấy quản trị viên theo tài khoản
  getModeratorByUsername = async (req, res) => {
    const { mod_username } = req.params;

    const moderator = await this.processor.getModeratorByUsername(mod_username);

    return this.ok(res, moderator);
  };

  //#endregion

  // Thêm quản trị viên
  addModerator = async (req, res) => {
    const { body: newModerator } = req;

    const moderator = await this.processor.addModerator(newModerator);

    return this.created(res, moderator);
  };

  // Cập nhật thông tin quản trị viên
  updateModerator = async (req, res) => {
    const {
      params: { mod_no },
      body: newModerator,
    } = req;

    await this.processor.updateModerator(mod_no, newModerator);

    return this.noContent(res);
  };

  // Khóa tài khoản quản trị viên
  lockModerator = async (req, res) => {
    const { mod_no } = req.params;

    await this.processor.lockModerator(mod_no);

    return this.noContent(res);
  };
};
