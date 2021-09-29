const AuthenticationValidator = require("../../../app/validators/authentication_validators/AuthenticationValidator");
// Test các hàm xác thực dữ liệu của lớp AuthenticationValidator

function getValidator() {
  return new AuthenticationValidator();
}

describe("Val Xác thực model đăng nhập", () => {
  test("Model hợp lệ", () => {
    //Arrange
    const loginModel = {
      username: "valid",
      password: "valid",
    };

    const failed = false;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Model undefined", () => {
    //Arrange
    const loginModel = undefined;

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Model null", () => {
    //Arrange
    const loginModel = null;

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Model empty", () => {
    //Arrange
    const loginModel = {};

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });
});

describe("Val Xác thực model đăng nhập - tài khoản", () => {
  test("Tài khoản undefined", () => {
    //Arrange
    const loginModel = {
      username: undefined,
      password: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Tài khoản bỏ trống", () => {
    //Arrange
    const loginModel = {
      username: "  ",
      password: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Tài khoản ngắn hơn 5", () => {
    //Arrange
    const loginModel = {
      username: "tk",
      password: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Tài khoản dài hơn 70", () => {
    //Arrange
    const loginModel = {
      username:
        "aaaaaaaaaaa8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af4293956375465",
      password: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Tài khoản alphanum - không có khoảng trắng", () => {
    //Arrange
    const loginModel = {
      username: "tk tk1",
      password: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });
});

describe("Val Xác thực model đăng nhập - mật khẩu", () => {
  test("Mật khẩu undefined", () => {
    //Arrange
    const loginModel = {
      password: undefined,
      username: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Mật khẩu bỏ trống", () => {
    //Arrange
    const loginModel = {
      password: "  ",
      username: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Mật khẩu ngắn hơn 5", () => {
    //Arrange
    const loginModel = {
      password: "tk",
      username: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Mật khẩu dài hơn 64", () => {
    //Arrange
    const loginModel = {
      password:
        "aaaaa8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af4293956375465",
      username: "valid",
    };

    const failed = true;

    const validator = getValidator();

    //Act
    const expRes = failed;
    const actRes = validator.validateLoginModel(loginModel).hasAnyError;

    //Expect
    expect(actRes).toEqual(expRes);
  });
});

describe("Val Xác thực token", () => {
  test("Token undefined", () => {
    //Arrange
    const token = undefined;
    const failed = true;
    const validator = getValidator();

    //Act
    const expRs = failed;
    const actRs = validator.validateToken(token).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Token không có Beaerer", () => {
    //Arrange
    const token = "";
    const failed = true;
    const validator = getValidator();

    //Act
    const expRs = failed;
    const actRs = validator.validateToken(token).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Token Beaerer và jwt không có khoảng trắng", () => {
    //Arrange
    const token = "Beareraa";
    const failed = true;
    const validator = getValidator();

    //Act
    const expRs = failed;
    const actRs = validator.validateToken(token).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Token hợp lệ", () => {
    //Arrange
    const token = "Bearer token";
    const failed = false;
    const validator = getValidator();

    //Act
    const expRs = failed;
    const actRs = validator.validateToken(token).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
