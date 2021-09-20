const StripePaymentController = require("../../../app/controllers/payments_controller/stripe_payments/StripePaymentController");
const {
  ResponseMock,
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
} = require("../controllerTestHelper");
// Kiểm tra các api end-points của Stripe Payment

class StripePaymentControllerFake extends StripePaymentController {
  getOrderId = jest.fn(() => {
    return 1;
  });
}

//#region  INIT

class StripeServiceMock {
  createOrder = jest.fn(() => {
    return "wtf";
  });

  saveOrder = jest.fn();
}

//#endregion

let validatorMock;
let serviceMock;
let daoMock;
let exServiceMock;

function getController() {
  return new StripePaymentControllerFake(
    validatorMock,
    serviceMock,
    daoMock,
    exServiceMock
  );
}

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Url của client khi thành công
// Url khi thất bại
// 201 - 400
describe("Tạo đơn hàng", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    serviceMock = new StripeServiceMock();
    daoMock = new PaymentDAOMock();
    exServiceMock = new CurrencyExchangeServiceMock();
  });

  jest.useFakeTimers();

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

  test("Thiếu successUrl - 400", async () => {
    //Arrange
    const cart = { products: [] };
    const controller = getController();

    const reqMock = {
      body: cart,
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Thiếu cancelUrl - 400", async () => {
    //Arrange
    const cart = { products: [] };
    const controller = getController();

    const reqMock = {
      body: cart,
      query: { successUrl: "aaa" },
      headers: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(2);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Lấy id", async () => {
    //Arrange
    const controller = new StripePaymentController();

    //Act
    const id = controller.getOrderId();

    //Expect
    expect(id).toBeDefined();
    expect(id).toHaveLength(64);
  });

  test("Tạo thành công - 201", async () => {
    //Arrange
    const cart = { products: [{ prod_pice: 2000 }] };
    const controller = getController();

    const reqMock = {
      body: cart,
      protocol: "",
      headers: {
        host: "",
      },
      query: {
        successUrl: "yes",
        cancelUrl: "wtf",
      },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(serviceMock.createOrder).toBeCalledTimes(1);
    expect(daoMock.getOrderProduct).toBeCalledTimes(1);
    expect(exServiceMock.convert).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Tạo thành công order hết hạng sau 1 ngày", async () => {
    //Arrange
    const cart = { products: [] };
    const controller = getController();

    const reqMock = {
      body: cart,
      protocol: "",
      headers: {
        host: "",
      },
      query: {
        successUrl: "yes",
        cancelUrl: "wtf",
      },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201 };
    const actRes = await controller.createOrder(reqMock, resMock);

    // Gia tốc bỏ qua 1 ngày
    jest.advanceTimersByTime(86400000);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(serviceMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });
});

describe("Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    serviceMock = new StripeServiceMock();
    daoMock = new PaymentDAOMock();
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
    const actRes = await controller.checkoutOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateStripeOrderId).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test(" Thiếu successUrl - 400", async () => {
    //Arrange
    const id = "";
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
    expect(validatorMock.validateStripeOrderId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Order không tồn tại", async () => {
    //Arrange
    const id = "";
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
    expect(validatorMock.validateStripeOrderId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Về trang chủ khi thanh toán xong", async () => {
    //Arrange
    const id = 1;
    const controller = getController();

    const reqMock = {
      params: { id },
      query: { successUrl: "yes" },
    };
    const resMock = new ResponseMock();
    resMock.writeHead = jest.fn();
    resMock.end = jest.fn();

    const { storedOrders } = StripePaymentController;
    storedOrders.set(id, {});

    //Act
    await controller.checkoutOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateStripeOrderId).toBeCalledTimes(1);
    expect(daoMock.saveOrder).toBeCalledTimes(1);
    expect(resMock.end).toBeCalledTimes(1);
  });
});
