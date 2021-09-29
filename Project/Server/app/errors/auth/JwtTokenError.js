module.exports = class JwtTokenError extends Error {
  constructor() {
    super("Token has been expired or revoked");
    this.name = this.constructor.name;
  }
};
