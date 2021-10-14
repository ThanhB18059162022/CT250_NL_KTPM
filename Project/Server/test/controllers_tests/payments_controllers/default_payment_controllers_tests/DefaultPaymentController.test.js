const {
  DefaultPaymentController,
} = require("../../../../app/controllers/controllersContainer");
const {
  NotValidError,
  NotExistError,
} = require("../../../../app/errors/errorsContainer");
const { ResponseMock } = require("../../controllerTestHelper");

// Kiểm tra các api end-points của Stripe Payment

//#region INIT

class DefaultPaymentProcessorMock {
  createOrder = jest.fn((cart) => {
    if (cart == undefined) {
      throw new NotValidError();
    }
  });

  checkoutOrder = jest.fn((id) => {
    if (id == undefined) {
      throw new NotValidError();
    }

    if (id != 1) {
      throw new NotExistError();
    }
  });
}

//#endregion

let processorMock;

function getController() {
  return new DefaultPaymentController(processorMock);
}

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Url của client khi thành công
// Url khi thất bại
// 201 - 400
describe("Ctrlr Tạo đơn hàng", () => {
  beforeEach(() => {
    processorMock = new DefaultPaymentProcessorMock();
  });

  test("Thiếu thông tin giỏ hàng - 400", async () => {
    //Arrange
    const cart = undefined;
    const controller = getController();

    const reqMock = {
      body: cart,
      headers: {},
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
    const controller = getController();

    const reqMock = {
      body: cart,
      headers: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 301 - 400 - 404
describe("Ctrlr Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    processorMock = new DefaultPaymentProcessorMock();
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
    const actRes = await controller.checkoutOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.checkoutOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Order không tồn tại - 404", async () => {
    //Arrange
    const id = 404;
    const controller = getController();

    const reqMock = {
      params: { id },
      query: { successUrl: "" },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404 };
    const actRes = await controller.checkoutOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.checkoutOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Thành công trả về id save order", async () => {
    //Arrange
    const id = 1;
    const controller = getController();

    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200 };
    const actRes = await controller.checkoutOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.checkoutOrder).toBeCalledTimes(1);
  });
});
