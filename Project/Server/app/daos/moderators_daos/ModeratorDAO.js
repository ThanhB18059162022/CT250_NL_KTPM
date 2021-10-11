const { NotExistError } = require("../../errors/errorsContainer");
const ModelDAO = require("../ModelDAO");

module.exports = class ModeratorsDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  getModerators = async (startIndex, endIndex) => {
    const moderators = await this.sqldao.query(
      `SELECT * FROM Moderators LIMIT ${startIndex}, ${endIndex - startIndex};`
    );

    return moderators;
  };

  getModeratorByNo = async (mod_no) => {
    const moderator = (
      await this.sqldao.query(`SELECT * FROM Moderators WHERE mod_no = ?;`, [
        mod_no,
      ])
    )[0];

    if (this.emptyData(moderator)) {
      throw new NotExistError(`mod_no: ${mod_no}`);
    }

    return moderator;
  };

  getModeratorByPhoneNumber = async (mod_phoneNumber) => {
    const moderator = (
      await this.sqldao.query(
        `SELECT * FROM Moderators WHERE mod_phoneNumber = ?;`,
        [mod_phoneNumber]
      )
    )[0];

    if (this.emptyData(moderator)) {
      throw new NotExistError(`mod_phoneNumber: ${mod_phoneNumber}`);
    }

    return moderator;
  };

  getModeratorByMod_Id = async (mod_id) => {
    const moderator = (
      await this.sqldao.query(`SELECT * FROM Moderators WHERE mod_id = ?;`, [
        mod_id,
      ])
    )[0];

    if (this.emptyData(moderator)) {
      throw new NotExistError(`mod_id: ${mod_id}`);
    }

    return moderator;
  };

  getModeratorByUsername = async (mod_username) => {
    const moderator = (
      await this.sqldao.query(
        `SELECT m.* FROM Moderators AS m, Accounts as a 
         WHERE m.mod_no = a.mod_no AND a.acc_username = ?`,
        [mod_username]
      )
    )[0];

    if (this.emptyData(moderator)) {
      throw new NotExistError(`mod_username: ${mod_username}`);
    }

    return moderator;
  };

  addModerator = async (moderator) => {
    const { mod_name, mod_phoneNumber, mod_sex, mod_address, mod_role } =
      moderator;

    const dbParams = this.extractParams(moderator);
    console.log(dbParams);
  };

  updateModerator = async () => {};

  lockModerator = async () => {};
};
