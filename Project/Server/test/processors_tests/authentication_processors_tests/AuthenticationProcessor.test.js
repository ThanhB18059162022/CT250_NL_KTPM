const {
  AuthenticationProcessor,
} = require("../../../app/processors/processorsContainer");
const {
  NotValidError,
  LoginNotSuccessError,
} = require("../../../app/errors/errorsContainer");

// Test xác thực người dùng

//#region Init

class LoginDaoMock {
  static user = { username: "valid", password: "valid" };

  login = jest.fn(async (loginModel) => loginModel === LoginDaoMock.user);

  getByUsername = jest.fn(async () => {
    return LoginDaoMock.user;
  });
}

class AuthenticationValidatorMock {
  validateLoginModel = jest.fn((loginModel) => {
    return {
      hasAnyError: loginModel === undefined,
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

function getProcessor() {
  return new AuthenticationProcessor(validatorMock, jwtMock, daoMock);
}

describe("Proc Kiểm tra đăng nhập bằng jwt", () => {
  beforeEach(() => {
    daoMock = new LoginDaoMock();
    validatorMock = new AuthenticationValidatorMock();
    jwtMock = new JwtMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const loginModel = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.login(loginModel);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);
  });

  test("Không tồn tại người dùng - EX", async () => {
    //Arrange
    const loginModel = {};
    const processor = getProcessor();

    //Act
    const expRs = LoginNotSuccessError;
    let actRs;
    try {
      await processor.login(loginModel);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);
  });

  test("Trả về token", async () => {
    //Arrange
    const { user } = LoginDaoMock;
    const loginModel = user;
    const secretKey = "Key nè";

    const token = jwtMock.getToken(user);
    // Cái này mock nên gọi 1 lần thành 2 lần
    jwtMock.getToken.mockClear();

    const processor = getProcessor();
    processor.secretKey = secretKey;

    //Act
    const expRs = token;
    const actRs = await processor.login(loginModel);

    //Expect
    expect(actRs).toEqual(expRs);

    expect(validatorMock.validateLoginModel).toBeCalledTimes(1);
    expect(validatorMock.validateLoginModel).toBeCalledWith(loginModel);

    expect(daoMock.login).toBeCalledTimes(1);
    expect(daoMock.login).toBeCalledWith(loginModel);

    expect(daoMock.getByUsername).toBeCalledTimes(1);

    expect(jwtMock.getToken).toBeCalledTimes(1);
    expect(jwtMock.getToken).toBeCalledWith(user);
  });
});

describe("Proc Kiểm tra bearer jwt có hợp lệ", () => {
  beforeEach(() => {
    validatorMock = new AuthenticationValidatorMock();
    jwtMock = new JwtMock();
  });

  test("Token không hợp lệ - EX", async () => {
    //Arrange
    const token = "Bearer";
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.authenticate(token);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateToken).toBeCalledTimes(1);
  });

  test("Token hết hạng - EX", async () => {
    //Arrange
    const token = "Bearer Hết-hạn";
    const processor = getProcessor();

    //Act
    const expRs = Error;
    let actRs;
    try {
      await processor.authenticate(token);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateToken).toBeCalledTimes(1);
    expect(jwtMock.getData).toBeCalledTimes(1);
  });

  test("Lấy ra người dùng", async () => {
    //Arrange
    const token = "Bearer token";
    const processor = getProcessor();

    //Act
    const expRs = "Data đây token";
    const actRs = await processor.authenticate(token);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateToken).toBeCalledTimes(1);
    expect(jwtMock.getData).toBeCalledTimes(1);
  });
});
