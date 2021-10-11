module.exports = class ExistError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
