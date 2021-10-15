const { NotExistError } = require("../../errors/errorsContainer");
const ModelDAO = require("../ModelDAO");

module.exports = class ModeratorsDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  //#region GET

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
        `SELECT * FROM Moderators WHERE mod_username = ?`,
        [mod_username]
      )
    )[0];

    if (this.emptyData(moderator)) {
      throw new NotExistError(`mod_username: ${mod_username}`);
    }

    return moderator;
  };

  //#endregion

  addModerator = async (newModerator) => {
    const dbModerator = this.toDbModerator(newModerator);
    const dbParams = this.extractParams(dbModerator);

    const sql = `INSERT INTO Moderators (mod_name, mod_id, mod_phoneNumber, mod_sex, mod_address, mod_role, mod_username, mod_password) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    await this.handleExeError(
      async () => await this.sqldao.execute(sql, dbParams)
    );

    const moderator = (
      await this.sqldao.query("SELECT * FROM Moderators WHERE mod_username=?", [
        dbModerator.mod_username,
      ])
    )[0];

    return moderator;
  };

  updateModerator = async (mod_no, moderator) => {
    const dbModerator = this.toDbModerator(moderator);
    delete dbModerator["mod_username"]; // Không cập nhật tài khoản
    const dbParams = this.extractParams(dbModerator);
    dbParams.push(mod_no);

    const sql = `UPDATE Moderators 
      SET mod_name=?, 
          mod_id=?, 
          mod_phoneNumber=?, 
          mod_sex=?, 
          mod_address=?, 
          mod_role=?, 
          mod_password=? 
      WHERE mod_no=?`;

    await this.handleExeError(
      async () => await this.sqldao.execute(sql, dbParams)
    );
  };

  lockModerator = async (mod_no) => {
    const sql = `UPDATE Moderators SET mod_password='' WHERE mod_no=?`;

    await this.sqldao.execute(sql, [mod_no]);
  };

  toDbModerator = (moderator) => {
    const {
      mod_name,
      mod_id,
      mod_phoneNumber,
      mod_sex,
      mod_address,
      mod_role,
      mod_username,
      mod_password,
    } = moderator;

    return {
      mod_name,
      mod_id,
      mod_phoneNumber,
      mod_sex,
      mod_address,
      mod_role,
      mod_username,
      mod_password,
    };
  };
};
