// Facade

const UnKnownError = require("./UnKnownError");
const NotValidError = require("./NotValidError");
const InstantiateAbstractClassError = require("./InstantiateAbstractClassError");
const NotExistError = require("./NotExistError");
const ExistError = require("./ExistError");

module.exports = {
  UnKnownError,
  NotValidError,
  InstantiateAbstractClassError,
  NotExistError,
  ExistError,
};
