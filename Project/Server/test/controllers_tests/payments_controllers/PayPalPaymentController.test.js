const PayPalPaymentController = require("../../../app/controllers/payments_controller/paypal_payments/PayPalPaymentController");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các end-points của paypal controller

//#region  Init

class PaymentDAOMock {
  getOrderProduct = jest.fn((prod_no) => {});

  saveOrder = jest.fn((order) => {
    return { ...order, paid: true };
  });
}

class PaymentValidatorMock {
  validateCart = jest.fn((cart) => {
    return { hasAnyError: cart.products === undefined };
  });

  validatePayPalOrderID = jest.fn((id) => {
    return { hasAnyError: id === undefined };
  });
}

class PayPalServiceMock {
  static clientId = "id đây";

  static order = {
    id: "id đơn hàng đây",
    details: {},
  };

  createOrder = jest.fn(async (total) => {
    return 1;
  });

  captureOrder = jest.fn(async (orderID) => {
    return {
      orderID,
      order: PayPalServiceMock.order,
    };
  });
}

//#endregion

let validatorMock;
let payPalServiceMock;
let daoMock;

class PayPalPaymentControllerFake extends PayPalPaymentController {
  getOrderProducts = jest.fn();

  getTotalPrice = jest.fn();

  // existOrder = jest.fn((id) => PayPalServiceMock.order.id === id);
}

function getController() {
  return new PayPalPaymentControllerFake(
    validatorMock,
    payPalServiceMock,
    daoMock
  );
}

// 200
describe("Lấy ra paypal id client để gửi cho client", () => {
  beforeEach(() => {
    payPalServiceMock = new PayPalServiceMock();
  });
  test("Lấy client id - 200", async () => {
    //Arrange
    const controller = getController();
    const clientId = payPalServiceMock.clientId;
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { clientId } };
    const actRes = await controller.getClientId(null, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 201 - 400 - 404
describe("Tạo order", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    payPalServiceMock = new PayPalServiceMock();
    daoMock = new PaymentDAOMock();
  });

  test("Danh sách sản phẩm không hợp lệ - 400", async () => {
    //Arrange
    const products = undefined;

    const controller = getController();
    const reqMock = {
      body: { products },
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

  jest.useFakeTimers();

  test("Tạo đơn hàng thành công - 201", async () => {
    //Arrange
    const products = [{ id: 1 }];

    const controller = getController();
    const body = { products };
    const reqMock = {
      body,
    };
    const resMock = new ResponseMock();

    const orderID = await payPalServiceMock.createOrder(1);

    payPalServiceMock.createOrder.mockClear();

    //Act
    const expRes = { statusCode: 201, body: { orderID } };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(payPalServiceMock.createOrder).toBeCalledTimes(1);

    expect(controller.getOrderProducts).toBeCalledTimes(1);
    expect(controller.getTotalPrice).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Xóa đơn hàng sau 1 ngày chưa thanh toán", async () => {
    //Arrange
    const products = [{ id: 1 }];

    const controller = getController();
    const body = { products };
    const reqMock = {
      body,
    };
    const resMock = new ResponseMock();

    const orderID = await payPalServiceMock.createOrder(1);

    payPalServiceMock.createOrder.mockClear();

    //Act
    const expRes = { statusCode: 201, body: { orderID } };
    const actRes = await controller.createOrder(reqMock, resMock);

    // Gia tốc bỏ qua 1 ngày
    jest.advanceTimersByTime(86400000);

    //Expect
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(payPalServiceMock.createOrder).toBeCalledTimes(1);

    expect(controller.getOrderProducts).toBeCalledTimes(1);
    expect(controller.getTotalPrice).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 200 - 404
describe("Thanh toán order", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    payPalServiceMock = new PayPalServiceMock();
  });

  test("OrderID không hợp lệ - 400", async () => {
    //Arrange
    const orderID = undefined;
    const controller = getController();
    const reqMock = { params: { orderID } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: {} };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validatePayPalOrderID).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Order không tồn tại - 404", async () => {
    //Arrange
    const orderID = "";
    const controller = getController();
    const reqMock = { params: { orderID } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validatePayPalOrderID).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Thanh toán thành công - 200", async () => {
    //Arrange
    const order = PayPalServiceMock.order;
    const orderID = order.id;
    const controller = getController();
    const reqMock = { params: { orderID } };
    const resMock = new ResponseMock();
    controller.storeOrder(order);
    //Act
    const expRes = { statusCode: 200 };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(payPalServiceMock.captureOrder).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });
});
