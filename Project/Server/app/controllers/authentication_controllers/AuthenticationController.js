const {
  LoginNotSuccessError,
  JwtTokenError,
} = require("../../errors/errorsContainer");
const Controller = require("../Controller");

// Xử lý xác thực người dùng
class AuthenticationController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  // Đăng nhập
  login = async (req, res) => {
    try {
      const { body: loginModel } = req;

      const token = await this.processor.login(loginModel);

      return this.created(res, { token });
    } catch (error) {
      return this.checkLoginFailedError(res, error);
    }
  };

  checkLoginFailedError = (res, error) => {
    try {
      return this.checkError(res, error);
    } catch (error) {
      if (error instanceof LoginNotSuccessError) {
        return this.unauthorized(res, error);
      }

      throw error;
    }
  };

  // Authenticate
  // Middleware xác thực đăng nhập bằng bearer jwt
  authenticate = async (req, res, next) => {
    try {
      // Token = Bearer + jwtToken (ex: Bearer ecadawdwa...)
      const token = req.headers?.authorization;

      const user = await this.processor.authenticate(token);

      //Thêm người dùng hiện tại
      req.user = user;

      return next();
    } catch (error) {
      return this.checkExpiredToken(res, error);
    }
  };

  checkExpiredToken = (res, error) => {
    try {
      return this.checkError(res, error);
    } catch (error) {
      if (error instanceof JwtTokenError) {
        return this.unauthorized(res, error);
      }

      throw error;
    }
  };

  // Authorize phải đăng nhập trước mới xài cái này
  // Closure function
  authorize = (roles) => async (req, res, next) => {
    const { mod_role = "" } = req.user;

    const exist = this.roleInRoles(mod_role, roles);
    if (exist) {
      return next();
    }

    return res.status(403).json();
  };

  roleInRoles = (role, roles) => {
    return (
      roles.find((r) => r.toLowerCase() === role.toLowerCase()) !== undefined
    );
  };

  // Lấy ra người dùng gửi req
  getLoginUser = async (req, res) => {
    const { user } = req;

    return res.json({ user });
  };
}

module.exports = AuthenticationController;
