const StripePaymentController = require("../../../app/controllers/payments_controller/stripe_payments/StripePaymentController");
const { ResponseMock } = require("../controllerTestHelper");
// Kiểm tra các api end-points của Stripe Payment

//#region  INIT

class PaymenValidatorMock {
  validateCart = jest.fn((cart) => {
    return { hasAnyError: cart.products === undefined };
  });

  validateStripeOrderId = jest.fn((id) => {
    return { hasAnyError: id === undefined };
  });
}

class StripeServiceMock {
  createOrder = jest.fn();

  saveOrder = jest.fn();
}

//#endregion

let validatorMock;
let serviceMock;

function getController() {
  return new StripePaymentController(validatorMock, serviceMock);
}

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Url của client khi thành công
// Url khi thất bại
// 201 - 400
describe("Tạo đơn hàng", () => {
  beforeEach(() => {
    validatorMock = new PaymenValidatorMock();
    serviceMock = new StripeServiceMock();
  });

  test("Thông tin trong giỏ không hợp lệ - 400", async () => {
    //Arrange
    const cart = {};
    const controller = getController();

    const reqMock = {
      body: cart,
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Tạo thành công - 201", async () => {
    //Arrange
    const cart = { products: [] };
    const controller = getController();

    const reqMock = {
      body: cart,
      protocol: "",
      headers: {
        host: "",
      },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(serviceMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });
});

describe("Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    validatorMock = new PaymenValidatorMock();
    serviceMock = new StripeServiceMock();
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
    const actRes = await controller.saveOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateStripeOrderId).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Về trang chủ khi thanh toán xong", async () => {
    //Arrange
    const id = "";
    const controller = getController();

    const reqMock = {
      params: { id },
    };
    const resMock = new ResponseMock();
    resMock.writeHead = jest.fn();
    resMock.end = jest.fn();

    //Act
    await controller.saveOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateStripeOrderId).toBeCalledTimes(1);
    expect(serviceMock.saveOrder).toBeCalledTimes(1);
    expect(resMock.end).toBeCalledTimes(1);
  });
});
