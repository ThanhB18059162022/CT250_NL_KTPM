const AuthenticationValidator = require("../../../app/controllers/authentication_controllers/AuthenticationValidator");

// Test các hàm xác thực dữ liệu của lớp AuthenticationValidator

function getValidator() {
  return new AuthenticationValidator();
}

describe("Xác thực model đăng nhập", () => {
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
});
