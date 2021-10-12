const {
  InstantiateAbstractClassError,
  ExistError,
} = require("../errors/errorsContainer");

module.exports = class ModelDAO {
  constructor(sqldao) {
    if (this.constructor === ModelDAO) {
      throw new InstantiateAbstractClassError();
    }

    this.sqldao = sqldao;
  }

  extractParams = (model) => Object.entries(model).map((en) => en[1]);

  emptyData = (data) => data === undefined;

  handleExeError = async (asyncFunc) => {
    try {
      await asyncFunc();
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new ExistError(error.sqlMessage);
      }

      throw error;
    }
  };
};
