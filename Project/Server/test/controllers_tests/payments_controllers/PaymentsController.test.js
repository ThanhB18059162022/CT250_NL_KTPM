const PaymentsController = require("../../../app/controllers/payments_controllers/PaymentsController");
const {
  NotValidError,
  NotExistError,
} = require("../../../app/errors/errorsContainer");
const { ResponseMock } = require("../controllerTestHelper");

class PaymentsControllerImp extends PaymentsController {}

//#region INIT

class ProcessorMock {
  getSaveOrder = jest.fn((id) => {
    if (id == undefined) {
      throw new NotValidError();
    }
    if (id != 1) {
      throw new NotExistError();
    }
    return {};
  });
}

//#endregion

let processorMock;
function getController() {
  return new PaymentsControllerImp(processorMock);
}

describe("Ctrlr Abstract class", () => {
  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new PaymentsController()).toThrowError();
  });
});

// 301 - 400 - 404
describe("Ctrlr Lấy ra đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    processorMock = new ProcessorMock();
  });

  test("Id đơn hàng không hợp lệ - 400", async () => {
    //Arrange
    const id = undefined;
    const controller = getController();

    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.getSaveOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getSaveOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Id đơn hàng không tồn tại - 404", async () => {
    //Arrange
    const id = 2;
    const controller = getController();

    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404 };
    const actRes = await controller.getSaveOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getSaveOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy ra thành công", async () => {
    //Arrange
    const id = 1;
    const controller = getController();

    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: {} };
    const actRes = await controller.getSaveOrder(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.getSaveOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});
