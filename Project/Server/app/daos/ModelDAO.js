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

  extractParams = (product) => Object.entries(product).map((en) => en[1]);

  emptyData = (data) => data === undefined;

  handleExeError = async (asyncFunc) => {
    try {
      await asyncFunc();
    } catch (error) {
      if (
        error.code == "ER_DUP_ENTRY" &&
        error.sqlMessage.includes("prod_name")
      ) {
        const regex = /\'.*.\'/;

        const content = regex.exec(error.sqlMessage)[0];
        const src = content.split(" for key ");

        throw new ExistError(`${src[1]}: ${src[0]}`);
      }

      throw error;
    }
  };
};
