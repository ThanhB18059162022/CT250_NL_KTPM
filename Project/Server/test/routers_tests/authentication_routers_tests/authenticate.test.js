const config = require("../../../app/config");
const authenticate = require("../../../app/routers/authentication_routers/authenticate");
const JwtService = require("../../../app/routers/authentication_routers/JwtService");
const {
  ResponseMock,
} = require("../../controllers_tests/controllerTestHelper");

// Test middleware xác nhận đăng nhập bằng jwt
const key = config.secretKey;
const auth = authenticate;
const service = new JwtService(key);
const nextMock = jest.fn();

describe("Kiểm tra bearer jwt có trong req", () => {
  beforeEach(() => {
    nextMock.mockClear();
  });

  test("Token hợp lệ", async () => {
    //Arrange
    const user = {};
    const token = service.getToken(user);

    const reqMock = { headers: { authorization: "Bearer " + token } };
    const resMock = new ResponseMock();

    //Act
    await auth(reqMock, resMock, nextMock);

    //Expect
    expect(nextMock).toBeCalledTimes(1);
  });

  test("Token hết hạn", async () => {
    //Arrange
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjMwOTA3NDQwLCJleHAiOjE2MzA5MDc1MDB9.FjAnXDE62V9G69beVaGNyDgXYvihYGmZTHhEJTZxfkY";

    const response = {
      statusCode: 401,
    };
    const reqMock = { headers: { authorization: "Bearer " + token } };
    const resMock = new ResponseMock();

    //Act
    const expRes = response;
    const actRes = await auth(reqMock, resMock, nextMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(nextMock).toBeCalledTimes(0);
  });

  test("Không có token", async () => {
    //Arrange
    const reqMock = { headers: {} };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await auth(reqMock, resMock, nextMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(resMock.json).toBeCalledTimes(1);
    expect(nextMock).toBeCalledTimes(0);
  });

  test("Token không hợp lệ", async () => {
    //Arrange
    const reqMock = { headers: { authorization: "abc" } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await auth(reqMock, resMock, nextMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(resMock.json).toBeCalledTimes(1);
    expect(nextMock).toBeCalledTimes(0);
  });
});
