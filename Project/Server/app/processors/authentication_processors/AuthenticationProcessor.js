const Processor = require("../Processor");
const { LoginNotSuccessError } = require("../../errors/errorsContainer");

// Xử lý xác thực người dùng
class AuthenticationProcessor extends Processor {
  constructor(validator, jwt, dao) {
    super();
    this.validator = validator;
    this.jwt = jwt;
    this.dao = dao;
  }

  // Đăng nhập
  // Model có tk - mk
  login = async (loginModel) => {
    this.checkValidate(() => this.validator.validateLoginModel(loginModel));

    const success = await this.dao.login(loginModel);
    if (!success) {
      throw new LoginNotSuccessError();
    }

    const user = await this.dao.getByUsername(loginModel.username);

    const token = this.jwt.getToken(user);

    return token;
  };

  // Authenticate
  // Xác thực đăng nhập bằng bearer jwt token
  authenticate = async (token) => {
    this.checkValidate(() => this.validator.validateToken(token));

    //Tách jwtToken ra khỏi Bearer
    const jwtToken = token.split(" ")[1];

    const user = this.jwt.getData(jwtToken);

    //Trả về người dùng hiện tại
    return user;
  };
}

module.exports = AuthenticationProcessor;
