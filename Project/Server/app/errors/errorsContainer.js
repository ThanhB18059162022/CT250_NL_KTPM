// Facade

// Common
const NotValidError = require("./common/NotValidError");
const NotExistError = require("./common/NotExistError");
const ExistError = require("./common/ExistError");

// Abstract
const UnKnownError = require("./abstract/UnKnownError");
const InstantiateAbstractClassError = require("./abstract/InstantiateAbstractClassError");

// Login
const LoginNotSuccessError = require("./auth/LoginNotSuccessError");
const JwtTokenError = require("./auth/JwtTokenError");

module.exports = {
  UnKnownError,
  NotValidError,
  InstantiateAbstractClassError,
  NotExistError,
  ExistError,
  LoginNotSuccessError,
  JwtTokenError,
};
