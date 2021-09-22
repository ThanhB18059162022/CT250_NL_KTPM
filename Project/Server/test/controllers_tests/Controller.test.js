const Controller = require("../../app/controllers/Controller");

// Test các hàm của controller

class ControllerImp extends Controller {}

function getController() {
  return new ControllerImp();
}

async function getArr() {
  return [1, 2, 3, 4];
}

describe("Khởi tạo lớp trừu tượng", () => {
  test("Lỗi khi khởi tạo lớp trừu tượng", () => {
    expect(() => new Controller()).toThrowError();
  });
});
