module.exports = class NotExistError extends Error {
  constructor(value = "Data") {
    super(`${value} not exist`);
    this.name = this.constructor.name;
  }
};
