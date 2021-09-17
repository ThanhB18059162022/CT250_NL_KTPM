const PayPalPaymentController = require("../../../../app/controllers/payments_controller/paypal_payments/PayPalPaymentController");
const { ResponseMock } = require("../../controllerTestHelper");

// Kiểm tra các end-points của paypal controller

//#region  Init

class PayPalValidatorMock {
  validateCart = (cart) => {
    return { hasAnyError: cart.products === undefined };
  };

  validateOrderID = (id) => {
    return { hasAnyError: id === undefined };
  };
}

class PayPalServiceMock {
  static clientId = "id đây";

  static order = {
    id: "id đơn hàng đây",
    details: {},
  };

  existOrder = jest.fn(async (id) => PayPalServiceMock.order.id === id);

  getOrderById = jest.fn(async () => PayPalServiceMock.order);

  createOrder = jest.fn(async (body) => {
    return {
      id: body.products.length,
      body,
    };
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

function getController() {
  return new PayPalPaymentController(validatorMock, payPalServiceMock);
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

// Paypal có api sẵn r
// 200 - 404
describe("Lấy ra order theo id", () => {
  beforeEach(() => {
    payPalServiceMock = new PayPalServiceMock();
  });

  test("Lấy order theo id - 200", async () => {
    //Arrange
    const controller = getController();
    const order = PayPalServiceMock.order;

    const reqMock = {
      params: { id: order.id },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: order };
    const actRes = await controller.getOrderById(reqMock, resMock);

    //Expect
    expect(payPalServiceMock.getOrderById).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Lấy order theo id - 404", async () => {
    //Arrange
    const controller = getController();

    const reqMock = {
      params: { id: "aa" },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.getOrderById(reqMock, resMock);

    //Expect
    expect(payPalServiceMock.getOrderById).toBeCalledTimes(0);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 201 - 400 - 404
describe("Tạo order", () => {
  beforeEach(() => {
    validatorMock = new PayPalValidatorMock();
    payPalServiceMock = new PayPalServiceMock();
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
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Tạo đơn hàng thành công - 201", async () => {
    //Arrange
    const products = [{ id: 1 }];

    const controller = getController();
    const body = { products };
    const reqMock = {
      body,
    };
    const resMock = new ResponseMock();

    const order = await payPalServiceMock.createOrder(body);

    payPalServiceMock.createOrder.mockClear();

    //Act
    const expRes = { statusCode: 201, body: order };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(payPalServiceMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 200 - 404
describe("Thanh toán order", () => {
  beforeEach(() => {
    validatorMock = new PayPalValidatorMock();
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
    expect(payPalServiceMock.existOrder).toBeCalledTimes(0);
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
    expect(payPalServiceMock.existOrder).toBeCalledTimes(1);
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

    //Act
    const expRes = { statusCode: 200, body: { orderID, order } };
    const actRes = await controller.captureOrder(reqMock, resMock);

    //Expect
    expect(payPalServiceMock.existOrder).toBeCalledTimes(1);
    expect(payPalServiceMock.captureOrder).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});
