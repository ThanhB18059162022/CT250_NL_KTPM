// Xử lý xác thực người dùng
class AuthenticationController {
  constructor(dao, validator, jwt) {
    this.dao = dao;
    this.validator = validator;
    this.jwt = jwt;
  }

  login = async (req, res) => {
    const loginModel = req.body;

    const result = this.validateModel(loginModel);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const success = await this.loginSuccess(loginModel);
    if (!success) {
      return res.status(401).json({});
    }

    const user = await this.getUserByUsername(loginModel.username);

    const token = this.getToken(user);

    return res.status(201).json({ token });
  };
  validateModel = (loginModel) => this.validator.validateLoginModel(loginModel);

  loginSuccess = async (loginModel) => this.dao.login(loginModel);

  getUserByUsername = async (username) => this.dao.getByUsername(username);

  getToken = (user) => this.jwt.getToken(user);
}

module.exports = AuthenticationController;
