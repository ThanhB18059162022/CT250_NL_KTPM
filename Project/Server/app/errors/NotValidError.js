module.exports = class NotValidError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
