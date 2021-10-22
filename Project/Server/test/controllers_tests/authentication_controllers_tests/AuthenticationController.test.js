const {
  AuthenticationController,
} = require("../../../app/controllers/controllersContainer");
const { ResponseMock } = require("../controllerTestHelper");
const {
  NotValidError,
  LoginNotSuccessError,
  JwtTokenError,
  UnKnownError,
} = require("../../../app/errors/errorsContainer");

// Test xác thực người dùng

//#region Init

class AuthenticationProcessorMock {
  login = jest.fn(async (loginModel) => {
    if (loginModel == undefined) {
      throw new NotValidError();
    }

    if (loginModel == "wtf") {
      throw new UnKnownError();
    }

    if (loginModel.username != "ad" || loginModel.password != "ad") {
      throw new LoginNotSuccessError();
    }

    return "token";
  });

  authenticate = jest.fn(async (token) => {
    if (token == undefined) {
      throw new NotValidError();
    }
    if (token == "wtf") {
      throw new UnKnownError();
    }
    if (token == "Hết-hạn") {
      throw new JwtTokenError();
    }
  });
}

//#endregion

let processorMock;

function getController() {
  return new AuthenticationController(processorMock);
}

// 201 - 400 - 401
describe("Ctrlr Kiểm tra đăng nhập bằng jwt", () => {
  beforeEach(() => {
    processorMock = new AuthenticationProcessorMock();
  });

  test("Trả về token - 201", async () => {
    //Arrange
    const loginModel = { username: "ad", password: "ad" };

    const response = { statusCode: 201, body: { token: "token" } };

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
    expect(processorMock.login).toBeCalledTimes(1);
  });

  test("Lỗi server", async () => {
    //Arrange
    const loginModel = "wtf";

    const controller = getController();

    const reqMock = {
      body: loginModel,
    };

    //Act
    const expRs = UnKnownError;
    let actRs;
    try {
      await controller.login(reqMock);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(processorMock.login).toBeCalledTimes(1);
  });
});

// 400 - 401
describe("Ctrlr Kiểm tra bearer jwt có trong req", () => {
  beforeEach(() => {
    processorMock = new AuthenticationProcessorMock();
  });

  test("Token hết hạn - 401", async () => {
    //Arrange
    const token = "Hết-hạn";

    const controller = getController();
    const response = {
      statusCode: 401,
    };
    const reqMock = { headers: { authorization: token } };
    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await controller.authenticate(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.authenticate).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
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
    expect(processorMock.authenticate).toBeCalledTimes(1);
  });

  test("Lỗi server", async () => {
    //Arrange
    const token = "wtf";

    const controller = getController();

    const reqMock = { headers: { authorization: token } };
    const resMock = new ResponseMock();
    const nextMock = jest.fn();

    //Act
    const expRs = UnKnownError;
    let actRs;
    try {
      await controller.authenticate(reqMock, resMock, nextMock);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(processorMock.authenticate).toBeCalledTimes(1);
  });
});

// 200 - Phải có jwt
describe("Ctrlr Lấy ra người dùng đăng nhập trong jwt", () => {
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
describe("Ctrlr Chuyển hướng người dùng theo quyền - mod_role", () => {
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

  test("Người dùng hợp lệ - nhiều mod_role", async () => {
    //Arrange
    const mod_roles = ["admin", "emp"];
    const controller = getController();
    const resMock = new ResponseMock();

    for (let i = 0; i < mod_roles.length; i++) {
      const role = mod_roles[i];

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
      await controller.authorize(mod_roles)(reqMock, resMock, nextMock);

      //Expect
      expect(nextMock).toBeCalledTimes(1);
    }
  });

  test("Người dùng không có thẩm quyền - 403", async () => {
    //Arrange
    const mod_role = "admin";
    const user = {
      id: 1,
      username: "valid",
      name: "valid",
      mod_role: "nv",
    };
    const controller = getController();

    const reqMock = {
      user,
    };
    const resMock = new ResponseMock();
    const nextMock = jest.fn();

    //Act
    const expRes = { statusCode: 403, body: undefined };

    const actRes = await controller.authorize([mod_role])(
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

  test("Người dùng không có mod_role - 403", async () => {
    //Arrange
    const mod_role = "user";
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
    const nextMock = jest.fn();

    //Act
    const expRes = { statusCode: 403, body: undefined };

    const actRes = await controller.authorize([mod_role])(
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
