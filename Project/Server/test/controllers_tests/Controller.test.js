const Controller = require("../../app/controllers/Controller");

class ControllerImp extends Controller {}

function getController(config) {
  return new ControllerImp(config);
}

describe("Abstract class", () => {
  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new Controller()).toThrowError();
  });

  test("Chạy cofign của production", () => {
    const config = {
      isProduction: true,
    };
    const controller = getController(config);

    controller.getResult({});
  });
});
