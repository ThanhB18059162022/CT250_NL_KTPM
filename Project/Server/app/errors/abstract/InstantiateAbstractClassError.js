module.exports = class InstantiateAbstractClassError extends Error {
  constructor() {
    super("Abstract classes can't be instantiated.");
    this.name = this.constructor.name;
  }
};
