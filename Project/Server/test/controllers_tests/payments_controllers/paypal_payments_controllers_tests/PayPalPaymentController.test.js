const {
  PayPalPaymentController,
} = require("../../../../app/controllers/controllersContainer");
const { ResponseMock } = require("../../controllerTestHelper");
const {
  NotValidError,
  NotExistError,
} = require("../../../../app/errors/errorsContainer");

// Kiểm tra các end-points của paypal controller

//#region  Init

class PayPalPaymentProcessorMock {
  getClientId = jest.fn(() => 1);

  createOrder = jest.fn((cart) => {
    if (cart == undefined) {
      throw new NotValidError();
    }

    return 1;
  });

  captureOrder = jest.fn((id) => {
    if (id == undefined) {
      throw new NotValidError();
    }

    if (id != 1) {
      throw new NotExistError();
    }

    return 1;
  });
}

//#endregion

let processorMock;

function getController() {
  return new PayPalPaymentController(processorMock);
}

// 200
describe("Lấy ra paypal id client để gửi cho client", () => {
  beforeEach(() => {
    processorMock = new PayPalPaymentProcessorMock();
  });
  test("Lấy client id - 200", async () => {
    //Arrange
    const controller = getController();
    const clientId = 1;
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { clientId } };
    const actRes = await controller.getClientId(null, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 201 - 400
describe("Tạo đơn hàng", () => {
  beforeEach(() => {
    processorMock = new PayPalPaymentProcessorMock();
  });

  test("Thiếu thông tin giỏ hàng - 400", async () => {
    //Arrange
    const cart = undefined;
    const controller = getController();

    const reqMock = {
      body: cart,
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Tạo thành công - 201", async () => {
    //Arrange
    const cart = {};
    const orderID = 1;
    const controller = getController();

    const reqMock = {
      body: cart,
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201, body: { orderID } };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 200 - 404 - 400
describe("Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    processorMock = new PayPalPaymentProcessorMock();
  });

  test("Id đơn hàng không hợp lệ - 400", async () => {
    //Arrange
    const id = undefined;
    const controller = getController();

    const reqMock = {
      params: { id },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.captureOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Order không tồn tại - 404", async () => {
    //Arrange
    const id = 404;
    const controller = getController();

    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404 };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.captureOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Thành công về trang client  - 301", async () => {
    //Arrange
    const id = 1;
    const controller = getController();
    const saveOrderId = 1;
    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { saveOrderId } };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.captureOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});
