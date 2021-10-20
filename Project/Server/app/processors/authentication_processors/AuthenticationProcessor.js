const Processor = require("../Processor");
const {
  LoginNotSuccessError,
  JwtTokenError,
} = require("../../errors/errorsContainer");

// Xử lý xác thực người dùng
class AuthenticationProcessor extends Processor {
  constructor(validator, jwt, dao, pwd) {
    super();
    this.validator = validator;
    this.jwt = jwt;
    this.dao = dao;
    this.pwd = pwd;
  }

  // Đăng nhập
  // Model có tài khoản và mật khẩu
  login = async (loginModel) => {
    this.checkValidate(() => this.validator.validateLoginModel(loginModel));

    const moderator = await this.dao.getModeratorByUsername(
      loginModel.username
    );
    const hashPwd = this.pwd.getHasPassword(loginModel);

    if (moderator.mod_password !== hashPwd) {
      throw new LoginNotSuccessError();
    }

    const user = {
      id: moderator.mod_no,
      role: this.getRole(moderator.mod_role),
    };
    const token = this.jwt.getToken(user);

    return token;
  };

  getRole = (roleIndex) => (roleIndex === 0 ? "emp" : "admin");

  // Authenticate
  // Xác thực đăng nhập bằng bearer jwt token
  authenticate = async (token) => {
    this.checkValidate(() => this.validator.validateToken(token));

    //Tách jwtToken ra khỏi Bearer
    const jwtToken = token.split(" ")[1];

    try {
      const { user } = this.jwt.getData(jwtToken);

      //Trả về người dùng hiện tại
      return user;
    } catch (error) {
      throw new JwtTokenError();
    }
  };
}

module.exports = AuthenticationProcessor;
