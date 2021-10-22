const PaymentsController = require("../../../app/controllers/payments_controllers/PaymentsController");
const {
  NotValidError,
  NotExistError,
} = require("../../../app/errors/errorsContainer");
const { ResponseMock } = require("../controllerTestHelper");

class PaymentsControllerImp extends PaymentsController {}

//#region INIT

class ProcessorMock {
  getStoreOrders = jest.fn(async () => []);

  deleteStoreOrder = jest.fn();

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

describe("Ctrlr Đơn hàng đã đặt", () => {
  beforeEach(() => {
    processorMock = new ProcessorMock();
  });

  test("Lấy ra các đơn hàng đã đặt", async () => {
    //Arrange
    const controller = getController();

    const reqMock = {};
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: [] };
    const actRes = await controller.getStoreOrders(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.getStoreOrders).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Xóa đơn hàng đã đặt", async () => {
    //Arrange
    const id = "";
    const controller = getController();

    const reqMock = { params: { id } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 204, body: {} };
    const actRes = await controller.deleteStoreOrder(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.deleteStoreOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 301 - 400 - 404
describe("Ctrlr Lấy ra đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    processorMock = new ProcessorMock();
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
