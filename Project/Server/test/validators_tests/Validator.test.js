const Validator = require("../../app/validators/Validator");

describe("Abstract", () => {
  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new Validator()).toThrowError();
  });
});
