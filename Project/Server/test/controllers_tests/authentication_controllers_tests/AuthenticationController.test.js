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

  validateToken = jest.fn((token) => {
    const tokenRegex = /^Bearer\s/i;
    return {
      hasAnyError: !tokenRegex.test(token),
    };
  });
}

class JwtMock {
  getToken = jest.fn((user) => {
    return user.username + " token đây";
  });

  getData = jest.fn((token) => {
    if (token === "Hết-hạn") throw new Error();
    return "Data đây " + token;
  });
}
//#endregion

let daoMock;
let validatorMock;
let jwtMock;

function getController() {
  return new AuthenticationController(validatorMock, jwtMock, daoMock);
}

// 201 - 400 - 401
describe("Kiểm tra đăng nhập bằng jwt", () => {
  beforeEach(() => {
    daoMock = new LoginDaoMock();
    validatorMock = new AuthenticationValidatorMock();
    jwtMock = new JwtMock();
  });

  test("Đăng nhập thành công trả về token - 201", async () => {
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

// 400 - 401
describe("Kiểm tra bearer jwt có trong req", () => {
  beforeEach(() => {
    validatorMock = new AuthenticationValidatorMock();
    jwtMock = new JwtMock();
  });

  test("Token hợp lệ - sang middleware tiếp theo", async () => {
    //Arrange
    const token = "Hợp lệ";

    const controller = getController();

    const reqMock = { headers: { authorization: "Bearer " + token } };
    const resMock = new ResponseMock();
    const nextMock = jest.fn();

    //Act
    await controller.authenticate(reqMock, resMock, nextMock);

    //Expect
    expect(nextMock).toBeCalledTimes(1);
  });

  test("Không có token - 400", async () => {
    //Arrange
    const reqMock = {};
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.authenticate(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Token không hợp lệ thiếu Bearer - 400", async () => {
    //Arrange
    const reqMock = { headers: { authorization: "abc" } };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.authenticate(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Token hết hạn - 401", async () => {
    //Arrange
    const token = "Hết-hạn";

    const controller = getController();
    const response = {
      statusCode: 401,
    };
    const reqMock = { headers: { authorization: "Bearer " + token } };
    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await controller.authenticate(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(resMock.json).toBeCalledTimes(1);
  });
});


// 200 - Phải có jwt
describe("Lấy ra người dùng đăng nhập trong jwt", () => {
  test("Trả về người dùng", async () => {
    //Arrange
    const user = {
      id: 1,
      username: "valid",
      name: "valid",
    };
    const controller = getController();

    const reqMock = {
      user,
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { user } };
    const actRes = await controller.getLoginUser(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);

    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 403
describe("Chuyển hướng người dùng theo quyền - role", () => {
  test("Người dùng hợp lệ", async () => {
    //Arrange
    const role = "admin";
    const user = {
      id: 1,
      username: "valid",
      name: "valid",
      role,
    };
    const controller = getController();

    const reqMock = {
      user,
    };
    const resMock = new ResponseMock();
    const nextMock = jest.fn();

    //Act
    await controller.authorize([role])(reqMock, resMock, nextMock);

    //Expect
    expect(nextMock).toBeCalledTimes(1);
  });

  test("Người dùng hợp lệ - nhiều role", async () => {
    //Arrange
    const roles = ["admin", "emp"];
    const controller = getController();
    const resMock = new ResponseMock();

    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];

      const user = {
        id: 1,
        username: "valid",
        name: "valid",
        role,
      };

      const nextMock = jest.fn();

      const reqMock = {
        user,
      };

      //Act
      await controller.authorize(roles)(reqMock, resMock, nextMock);

      //Expect
      expect(nextMock).toBeCalledTimes(1);
    }
  });

  test("Người dùng không có thẩm quyền - 403", async () => {
    //Arrange
    role = "admin";
    const user = {
      id: 1,
      username: "valid",
      name: "valid",
      role: "nv",
    };
    const controller = getController();

    const reqMock = {
      user,
    };
    const resMock = new ResponseMock();
    const nextMock = jest.fn();

    //Act
    const expRes = { statusCode: 403, body: undefined };

    const actRes = await controller.authorize([role])(
      reqMock,
      resMock,
      nextMock
    );

    //Expect
    expect(nextMock).toBeCalledTimes(0);
    expect(actRes).toEqual(expRes);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

