const PayPalPaymentController = require("../../../app/controllers/payments_controller/PayPalPaymentController");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các end-points của paypal controller

//#region  Init

class ValidatorMock {
  validateProducts = jest.fn((products) => {
    return { hasAnyError: products === undefined };
  });
}

class PayPalServiceMock {
  static clientId = "id đây";

  static order = {
    id: "id đơn hàng đây",
    details: {},
  };

  existOrder = jest.fn(async (id) => PayPalServiceMock.order.id === id);

  getOrderById = jest.fn(async () => PayPalServiceMock.order);

  createOrder = jest.fn(async (products) => {
    return {
      id: products.length,
      products,
    };
  });
}

class OrderDAOMock {
  allProductsExist = jest.fn(async (products) => {
    return products.length !== 0;
  });
}

//#endregion

let validatorMock;
let payPalServiceMock;
let daoMock;

function getController() {
  return new PayPalPaymentController(validatorMock, payPalServiceMock, daoMock);
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
    validatorMock = new ValidatorMock();
    payPalServiceMock = new PayPalServiceMock();
    daoMock = new OrderDAOMock();
  });

  test("Danh sách sản phẩm không hợp lệ - 400", async () => {
    //Arrange
    const products = undefined;

    const controller = getController();
    const reqMock = {
      body: products,
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Không tin thấy sản phẩm trong danh sách - 404", async () => {
    //Arrange
    const products = [];

    const controller = getController();
    const reqMock = {
      body: products,
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateProducts).toBeCalledTimes(1);
    expect(daoMock.allProductsExist).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Tạo đơn hàng thành công - 201", async () => {
    //Arrange
    const products = [{ id: 1 }];

    const controller = getController();
    const reqMock = {
      body: products,
    };
    const resMock = new ResponseMock();

    const order = await payPalServiceMock.createOrder(products);
    payPalServiceMock.createOrder.mockClear();

    //Act
    const expRes = { statusCode: 201, body: order };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateProducts).toBeCalledTimes(1);
    expect(daoMock.allProductsExist).toBeCalledTimes(1);
    expect(payPalServiceMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});
