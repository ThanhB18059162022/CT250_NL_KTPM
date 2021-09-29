const jwt = require("jsonwebtoken");
const JwtService = require("../../../app/services/jwt_services/JwtService");

// Test hàm tạo và xác nhận jwt token
const secretKey = "Bí mật";
const options = { expiresIn: "1h" };
function getService() {
  return new JwtService(secretKey);
}

function getJwtToken(user) {
  return jwt.sign({ user }, secretKey, options);
}
function getDataFromToken(token) {
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
    const expRes = getDataFromToken(token);
    const actRes = service.getData(token);

    //Expect
    expect(actRes).toEqual(expRes);
  });

  test("Token hết hạn", () => {
    //Arrange
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjMwOTA1NDgwLCJleHAiOjE2MzA5MDU1NDB9.rFZeP3a51_0lfCbPbMxhRtnlv1mwF4XratiOBTBiw5U";

    const service = getService();

    //Act
    //Expect
    expect(() => service.getData(token)).toThrowError("jwt expired");
  });

  test("Token undefined", () => {
    //Arrange
    const token = undefined;

    const service = getService();

    //Act
    //Expect
    expect(() => service.getData(token)).toThrowError("jwt must be provided");
  });

  test("Token rỗng", () => {
    //Arrange
    const token = " ";

    const service = getService();

    //Act
    //Expect
    expect(() => service.getData(token)).toThrowError("jwt malformed");
  });
});
