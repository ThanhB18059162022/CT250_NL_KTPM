const PaymentController = require("../../../app/controllers/payments_controller/PaymentController");

const {
  CurrencyExchangeServiceMock,
  ResponseMock,
  PaymentDAOMock,
  PaymentValidatorMock,
} = require("../controllerTestHelper");

// Test lớp cha của payment
class PaymentControllerObject extends PaymentController {}

let validatorMock;
let daoMock;
let serviceMock;

function getController() {
  return new PaymentControllerObject(validatorMock, daoMock, serviceMock);
}

describe("Abstract Test", () => {
  beforeEach(() => {
    daoMock = new PaymentDAOMock();
    serviceMock = new CurrencyExchangeServiceMock();
  });

  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new PaymentController()).toThrowError();
  });

  test("Lấy danh sách sản phẩm", async () => {
    //Arrange
    const products = [{ prod_no: 1, prod_quantity: 1 }];
    const controller = getController();

    //Act
    const expRs = products;
    const actRs = await controller.getOrderProducts(products);

    //Expect
    expect(daoMock.getOrderProduct).toBeCalledTimes(1);
    expect(actRs).toEqual(expRs);
  });

  test("Tính tổng tiền", () => {
    //Arrange
    const products = [{ prod_no: 1, prod_quantity: 1, prod_price: 12 }];
    const controller = getController();

    //Act
    const expRs = 12;
    const actRs = controller.getTotalPrice(products);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Lưu order", async () => {
    //Arrange
    const order = {};
    const controller = getController();

    //Act
    const expRs = { ...order, paid: true };
    const actRs = await controller.saveOrder(order);

    //Expect
    expect(daoMock.saveOrder).toBeCalledTimes(1);
    expect(actRs.paid).toEqual(expRs.paid);
  });
});

// 200 - 400 - 404
describe("Lấy ra order đã thanh toán trong CSDL", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    daoMock = new PaymentDAOMock();
    serviceMock = new CurrencyExchangeServiceMock();
  });

  test("Lấy ra order - id không hợp lệ 400", async () => {
    //Arrange
    const saveOrderId = undefined;
    const controller = getController();

    const reqMock = {
      params: { saveOrderId },
    };
    const resMock = new ResponseMock();

    //Act
    const expRs = { statusCode: 400 };
    const actRs = await controller.getSaveOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateSaveOrderId).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRs.statusCode).toEqual(expRs.statusCode);
  });

  test("Lấy ra order - id không tồn tại 404", async () => {
    //Arrange
    const saveOrderId = -1;
    const controller = getController();

    const reqMock = {
      params: { saveOrderId },
    };
    const resMock = new ResponseMock();

    //Act
    const expRs = { statusCode: 404 };
    const actRs = await controller.getSaveOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateSaveOrderId).toBeCalledTimes(1);
    expect(daoMock.getSaveOrder).toBeCalledTimes(1);
    expect(validatorMock.existSaveOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRs.statusCode).toEqual(expRs.statusCode);
  });

  test("Lấy ra order hợp lệ - 200", async () => {
    //Arrange
    const saveOrderId = 1;
    const controller = getController();

    const reqMock = {
      params: { saveOrderId },
    };
    const resMock = new ResponseMock();

    //Act
    const expRs = { statusCode: 200 };
    const actRs = await controller.getSaveOrder(reqMock, resMock);

    //Expect
    expect(validatorMock.validateSaveOrderId).toBeCalledTimes(1);
    expect(daoMock.getSaveOrder).toBeCalledTimes(1);
    expect(validatorMock.existSaveOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRs.statusCode).toEqual(expRs.statusCode);
  });
});
