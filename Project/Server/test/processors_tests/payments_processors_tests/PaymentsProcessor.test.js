const PaymentsProcessor = require("../../../app/processors/payments_processors/PaymentsProcessor");
const {
  CurrencyExchangeServiceMock,
  PaymentDAOMock,
  PaymentValidatorMock,
} = require("./paymentsProcessorHelper");
const {
  NotValidError,
  NotExistError,
} = require("../../../app/errors/errorsContainer");

// Test lớp cha của payment
class PaymentsProcessorImp extends PaymentsProcessor {}

let validatorMock;
let daoMock;
let serviceMock;

function getController() {
  return new PaymentsProcessorImp(validatorMock, daoMock, serviceMock);
}

describe("Abstract Test", () => {
  beforeEach(() => {
    daoMock = new PaymentDAOMock();
    serviceMock = new CurrencyExchangeServiceMock();
  });

  test("Khởi tạo lớp trừu tượng", () => {
    expect(() => new PaymentsProcessor()).toThrowError();
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
    const expRs = 1;
    const actRs = await controller.saveOrder(order);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(daoMock.saveOrder).toBeCalledTimes(1);
  });
});

describe("Lấy ra order đã thanh toán trong CSDL", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    daoMock = new PaymentDAOMock();
    serviceMock = new CurrencyExchangeServiceMock();
  });

  test("Id không hợp lệ - EX", async () => {
    //Arrange
    const saveOrderId = undefined;
    const controller = getController();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await controller.getSaveOrder(saveOrderId);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateSaveOrderId).toBeCalledTimes(1);
  });

  test("Id không tồn tại - EX", async () => {
    //Arrange
    const saveOrderId = -1;
    const controller = getController();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await controller.getSaveOrder(saveOrderId);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateSaveOrderId).toBeCalledTimes(1);
    expect(daoMock.getSaveOrder).toBeCalledTimes(1);
  });

  test("Lấy ra order hợp lệ", async () => {
    //Arrange
    const saveOrderId = 1;
    const controller = getController();

    //Act
    const expRs = {};
    const actRs = await controller.getSaveOrder(saveOrderId);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateSaveOrderId).toBeCalledTimes(1);
    expect(daoMock.getSaveOrder).toBeCalledTimes(1);
  });
});
