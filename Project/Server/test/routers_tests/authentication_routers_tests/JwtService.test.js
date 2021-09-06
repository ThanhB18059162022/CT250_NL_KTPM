const jwt = require("jsonwebtoken");
const JwtService = require("../../../app/routers/authentication_routers/JwtService");

// Test hàm tạo và xác nhận jwt token
const secretKey = "Bí mật";
const options = { expiresIn: "1h" };
function getService() {
  return new JwtService(secretKey);
}

function getJwtToken(user) {
  return jwt.sign({ user }, secretKey, options);
}
function getUserFromToken(token) {
  return jwt.verify(token, secretKey);
}

// Vẫn tạo nếu có rỗng hay undefined
describe("Kiểm tra hàm tạo jwt", () => {
  test("User undefined", () => {
    //Arrange
    const user = undefined;
    const token = getJwtToken(user);

    const service = getService();

    //Act
    const expRes = token;
    const actRes = service.getToken(user);

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("User rỗng", () => {
    //Arrange
    const user = {};
    const token = getJwtToken(user);

    const service = getService();

    //Act
    const expRes = token;
    const actRes = service.getToken(user);

    //Expect
    expect(actRes).toEqual(expRes);
  });
});

describe("Kiểm tra hàm xác nhận jwt token", () => {
  test("Token hợp lệ", () => {
    //Arrange
    const user = {};
    const token = getJwtToken(user);

    const service = getService();

    //Act
    const expRes = getUserFromToken(token);
    const actRes = service.getUser(token);

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Token undefined", () => {
    //Arrange
    const token = undefined;

    const service = getService();

    //Act
    //Expect
    expect(() => service.getUser(token)).toThrowError("jwt must be provided");
  });

  test("Token rỗng", () => {
    //Arrange
    const token = " ";

    const service = getService();

    //Act
    //Expect
    expect(() => service.getUser(token)).toThrowError("jwt malformed");
  });
});
