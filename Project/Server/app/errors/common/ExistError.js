module.exports = class ExistError extends Error {
  constructor(value = "Data") {
    super(`${value} has existed`);
    this.name = this.constructor.name;
  }
};
