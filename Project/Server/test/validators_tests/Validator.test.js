const Validator = require("../../app/validators/Validator");

describe("Val Abstract", () => {
  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new Validator()).toThrowError();
  });
});
