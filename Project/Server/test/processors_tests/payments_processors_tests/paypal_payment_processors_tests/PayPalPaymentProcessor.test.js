const {
  PayPalPaymentProcessor,
} = require("../../../../app/processors/processorsContainer");
const {
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
} = require("../paymentsProcessorHelper");
const {
  NotValidError,
  NotExistError,
} = require("../../../../app/errors/errorsContainer");

//#region  INIT

class PayPalServiceMock {
  constructor() {
    this.clientId = 1;
  }

  createOrder = jest.fn(() => "pp1");

  captureOrder = jest.fn();
}

//#endregion

// Test cái api end-point của Thanh toán Zalo

let validatorMock;
let serviceMock;
let daoMock;
let exServiceMock;

function getProcessor() {
  return new PayPalPaymentProcessor(
    validatorMock,
    daoMock,
    exServiceMock,
    serviceMock
  );
}

describe("Lấy ra client Id", () => {
  beforeEach(() => {
    serviceMock = new PayPalServiceMock();
  });

  test("Ok", async () => {
    //Arrange
    const processor = getProcessor();

    //Act
    const expRs = 1;
    const actRs = await processor.getClientId();

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Url của client khi thành công
// Url khi thất bại
// 201 - 400
describe("Tạo đơn hàng", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    serviceMock = new PayPalServiceMock();
    daoMock = new PaymentDAOMock();
    exServiceMock = new CurrencyExchangeServiceMock();
  });

  jest.useFakeTimers();

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const cart = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.createOrder(cart);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateCart).toBeCalledTimes(1);
  });

  test("Tạo thành công trả về paypal id", async () => {
    //Arrange
    const cart = { products: [{ prod_pice: 2000 }] };
    const processor = getProcessor();

    //Act
    const expRs = "pp1";
    const actRs = await processor.createOrder(cart);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(serviceMock.createOrder).toBeCalledTimes(1);
    expect(daoMock.getOrderProduct).toBeCalledTimes(1);
  });

  test("Tạo thành công order hết hạng sau 1 ngày", async () => {
    //Arrange
    const cart = { products: [{ prod_pice: 2000 }] };
    const processor = getProcessor();

    //Act
    const expRs = "pp1";
    const actRs = await processor.createOrder(cart);

    // Gia tốc bỏ qua 1 ngày
    jest.advanceTimersByTime(86400000);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(serviceMock.createOrder).toBeCalledTimes(1);
    expect(daoMock.getOrderProduct).toBeCalledTimes(1);
  });
});

// 301 - 400 - 404
describe("Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    serviceMock = new PayPalServiceMock();
    daoMock = new PaymentDAOMock();
  });

  test("Id đơn hàng không hợp lệ - EX", async () => {
    //Arrange
    const id = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.captureOrder(id);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validatePayPalOrderID).toBeCalledTimes(1);
  });

  test("Order không tồn tại - EX", async () => {
    //Arrange
    const id = "";
    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.captureOrder(id);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validatePayPalOrderID).toBeCalledTimes(1);
  });

  test("Thành công trả về save id", async () => {
    //Arrange
    const id = "";
    const processor = getProcessor();

    const { storedOrders } = PayPalPaymentProcessor;
    storedOrders.set(id, {});

    //Act
    const expRs = 1;
    const actRs = await processor.captureOrder(id);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validatePayPalOrderID).toBeCalledTimes(1);
    expect(daoMock.saveOrder).toBeCalledTimes(1);
    expect(serviceMock.captureOrder).toBeCalledTimes(1);
  });
});
