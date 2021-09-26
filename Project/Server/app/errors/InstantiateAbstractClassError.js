module.exports = class InstantiateAbstractClassError extends Error {
  constructor() {
    super("Can not instanticate Abstract class");
    this.name = this.constructor.name;
  }
};
