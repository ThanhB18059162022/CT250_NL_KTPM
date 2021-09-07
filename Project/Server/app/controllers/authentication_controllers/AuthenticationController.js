// Xử lý xác thực người dùng
class AuthenticationController {
  constructor(validator, jwt, dao) {
    this.validator = validator;
    this.jwt = jwt;
    this.dao = dao;
  }

  //#region Login
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

  loginSuccess = async (loginModel) => await this.dao.login(loginModel);

  getUserByUsername = async (username) =>
    await this.dao.getByUsername(username);

  getToken = (user) => this.jwt.getToken(user);

  //#endregion

  //#region Authenticate

  //Middleware xác thực đăng nhập bằng bearer jwt
  authenticate = async (req, res, next) => {
    // Token = Bearer + jwtToken (ex: Bearer ecadawdwa...)
    const token = req.headers?.authorization;

    const result = this.validateToken(token);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    try {
      //Tách jwtToken ra khỏi Bearer
      const jwtToken = token.split(" ")[1];

      const { user } = this.jwt.getData(jwtToken);

      //Thêm người dùng hiện tại
      req.user = user;

      return next();
    } catch (error) {
      return res.status(401).json(error);
    }
  };

  validateToken = (token) => this.validator.validateToken(token);

  //#endregion

  //#region Authorize phải đăng nhập trước mới xài cái này

  // Closure function
  authorize = (roles) => async (req, res, next) => {
    const role = req.user?.role;

    const exist = this.roleInRoles(role, roles);
    if (exist) {
      return next();
    }

    return res.status(403).json();
  };

  roleInRoles = (role, roles) => {
    return roles.filter((r) => r.toLowerCase() === role.toLowerCase())[0];
  };

  //#endregion

  //#region GetLoginUser

  getLoginUser = async (req, res) => {
    const { user } = req;

    return res.json({ user });
  };

  //#endregion
}

module.exports = AuthenticationController;
