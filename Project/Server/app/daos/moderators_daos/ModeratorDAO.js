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

    return moderator;
  };

  getModeratorByPhoneNumber = async (mod_phoneNumber) => {
    const moderator = (
      await this.sqldao.query(
        `SELECT * FROM Moderators WHERE mod_phoneNumber = ?;`,
        [mod_phoneNumber]
      )
    )[0];

    return moderator;
  };

  getModeratorByMod_Id = async (mod_id) => {
    const moderator = (
      await this.sqldao.query(`SELECT * FROM Moderators WHERE mod_id = ?;`, [
        mod_id,
      ])
    )[0];

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
