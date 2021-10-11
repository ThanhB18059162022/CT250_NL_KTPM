const { InstantiateAbstractClassError } = require("../errors/errorsContainer");

module.exports = class ModelDAO {
  constructor(sqldao) {
    if (this.constructor === ModelDAO) {
      throw new InstantiateAbstractClassError();
    }

    this.sqldao = sqldao;
  }

  extractParams = (product) => Object.entries(product).map((en) => en[1]);

  emptyData = (data) => data === undefined;
};
