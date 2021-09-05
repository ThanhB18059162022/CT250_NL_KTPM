const AuthenticationController = require("../../../app/controllers/authentication_controllers/AuthenticationController");
const { ResponseMock } = require("../controllerTestHelper");

// Test xác thực người dùng

//#region Init

class LoginDaoMock {
  static user = { username: "valid", password: "valid" };

  login = jest.fn(async (loginModel) => loginModel === LoginDaoMock.user);

  getByUsername = jest.fn(async (username) => {
    return { id: 1, name: "alex", username };
  });
}

class AuthenticationValidatorMock {
  validateLoginModel = jest.fn((loginModel) => {
    return {
      hasAnyError:
        loginModel.username === undefined || loginModel.password === undefined,
    };
  });
}

class JwtMock {
  getToken = jest.fn((user) => {
    return user.username + " token đây";
  });
}
//#endregion

let daoMock;
let validatorMock;
let jwtMock;

function getController() {
  return new AuthenticationController(daoMock, validatorMock, jwtMock);
}

// 201 - 400 - 401
describe("Kiểm tra đăng nhập bằng jwt", () => {
  beforeEach(() => {
    daoMock = new LoginDaoMock();
    validatorMock = new AuthenticationValidatorMock();
    jwtMock = new JwtMock();
  });

  test("Đăng nhập thành công", async () => {
    //Arrange
    const loginModel = LoginDaoMock.user;
    const secretKey = "Key nè";

    const user = await daoMock.getByUsername(loginModel.username);
    const token = jwtMock.getToken(user);
    // Cái này mock nên gọi 1 lần thành 2 lần
    jwtMock.getToken.mockClear();

    const response = { statusCode: 201, body: { token } };

    const controller = getController();
    controller.secretKey = secretKey;

    const reqMock = {
      body: loginModel,
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await controller.login(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);

    expect(daoMock.login).toBeCalledTimes(1);
    expect(daoMock.login).toBeCalledWith(loginModel);

    expect(jwtMock.getToken).toBeCalledTimes(1);
    expect(jwtMock.getToken).toBeCalledWith(user);
  });

  test("Đăng nhập tài khoản không hợp lệ 400", async () => {
    //Arrange
    const loginModel = {
      username: undefined,
      password: "awda",
    };

    const response = { statusCode: 400 };

    const controller = getController();

    const reqMock = {
      body: loginModel,
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await controller.login(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);
  });

  test("Đăng nhập mật khẩu không hợp lệ 400", async () => {
    //Arrange
    const loginModel = {
      username: "awdaw",
      password: undefined,
    };

    const response = { statusCode: 400 };

    const controller = getController();

    const reqMock = {
      body: loginModel,
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await controller.login(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);
  });

  test("Đăng nhập thất bại 401", async () => {
    //Arrange
    const loginModel = {
      username: "awdaw",
      password: "awdaw",
    };

    const response = { statusCode: 401, body: {} };

    const controller = getController();

    const reqMock = {
      body: loginModel,
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await controller.login(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);

    expect(daoMock.login).toBeCalledTimes(1);
    expect(daoMock.login).toBeCalledWith(loginModel);
  });
});
