module.exports = class LoginNotSuccessError extends Error {
  constructor() {
    super("The username or password is incorrect");
    this.name = this.constructor.name;
  }
};
