const Validator = require("../../app/controllers/Validator");

describe("Abstract", () => {
  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new Validator()).toThrowError();
  });
});
