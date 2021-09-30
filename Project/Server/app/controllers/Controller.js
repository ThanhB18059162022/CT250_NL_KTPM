const {
  InstantiateAbstractClassError,
  NotValidError,
  NotExistError,
  ExistError,
} = require("../errors/errorsContainer");

// Lưu các hàm xài chung của các controller
//Abstract class
module.exports = class Controller {
  constructor(config) {
    if (this.constructor === Controller) {
      throw new InstantiateAbstractClassError();
    }

    this.isProduction = config?.isProduction ?? false;
  }

  //#region Error

  checkError = (res, error) => {
    if (error instanceof NotValidError || error instanceof ExistError) {
      return this.badRequest(res, error);
    }

    if (error instanceof NotExistError) {
      return this.notFound(res, error);
    }

    throw error;
  };

  //#endregion

  //#region Res

  // 200
  ok = (res, data) => {
    return res.json(data);
  };

  // 201
  created = (res, data) => {
    return res.status(201).json(data);
  };

  // 204
  noContent = (res) => {
    return res.status(204).json({});
  };

  // 301
  redirect = (res, url) => {
    return res.redirect(301, url);
  };

  // 400
  badRequest = (res, error) => {
    const result = this.getResult(error);

    return res.status(400).json(result);
  };

  // 401
  unauthorized = (res, error) => {
    const result = this.getResult(error);

    return res.status(401).json(result);
  };

  // 404
  notFound = (res, error) => {
    const result = this.getResult(error);

    return res.status(404).json(result);
  };

  getResult = (error) => {
    const { name, message } = error;

    const result = { name, message };

    if (!this.isProduction) {
      result.stack = error.stack;
    }

    return result;
  };

  //#endregion
};
