const {
  ZaloPayPaymentProcessor,
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

class ZaloPayServiceMock {
  createOrder = jest.fn(() => "wtf");

  validRedirectQuery = jest.fn(({ data }) => {
    return data !== undefined;
  });
}

//#endregion

// Test cái api end-point của Thanh toán Zalo

let validatorMock;
let serviceMock;
let daoMock;
let exServiceMock;

function getProcessor() {
  return new ZaloPayPaymentProcessor(
    validatorMock,
    daoMock,
    exServiceMock,
    serviceMock
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
    serviceMock = new ZaloPayServiceMock();
    daoMock = new PaymentDAOMock();
    exServiceMock = new CurrencyExchangeServiceMock();
  });

  jest.useFakeTimers();

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const cart = {};
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

  test("Thiếu successUrl - EX", async () => {
    //Arrange
    const cart = { products: [] };
    const successUrl = "//";

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.createOrder(cart, { successUrl });
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(1);
  });

  test("Thiếu cancelUrl - 400", async () => {
    //Arrange
    const cart = { products: [] };
    const successUrl = "";
    const cancelUrl = "//";

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.createOrder(cart, { successUrl, cancelUrl });
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(2);
  });

  test("Lấy id", async () => {
    //Arrange
    const processor = new getProcessor();

    //Act
    const id = processor.getOrderId();

    //Expect
    expect(id).toBeDefined();
    expect(id).toHaveLength(64);
  });

  test("Tạo thành công trả về zalo url", async () => {
    //Arrange
    const cart = { products: [{ prod_pice: 2000 }] };
    const url = "yes";
    const processor = getProcessor();

    //Act
    const expRs = "wtf";
    const actRs = await processor.createOrder(cart, url);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateCart).toBeCalledTimes(1);
    expect(serviceMock.createOrder).toBeCalledTimes(1);
    expect(daoMock.getOrderProduct).toBeCalledTimes(1);
  });

  test("Tạo thành công order hết hạng sau 1 ngày", async () => {
    //Arrange
    const cart = { products: [{ prod_pice: 2000 }] };
    const url = "yes";
    const processor = getProcessor();

    //Act
    const expRs = "wtf";
    const actRs = await processor.createOrder(cart, url);

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
    serviceMock = new ZaloPayServiceMock();
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
      await processor.checkoutOrder(id);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateId).toBeCalledTimes(1);
  });

  test("Thiếu url - EX", async () => {
    //Arrange
    const id = "id";
    const processor = getProcessor();
    const query = {};

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.checkoutOrder(id, query);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateId).toBeCalledTimes(1);
  });

  test("Thiếu successUrl - EX", async () => {
    //Arrange
    const id = "id";
    const successUrl = "//";
    const processor = getProcessor();
    const query = { url: `${successUrl}` };

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.checkoutOrder(id, query);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(1);
  });

  test("Thiếu cancelUrl - EX", async () => {
    //Arrange
    const id = "id";
    const successUrl = " ";
    const cancelUrl = "//";
    const processor = getProcessor();
    const query = { url: successUrl + "-" + cancelUrl };

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.checkoutOrder(id, query);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(2);
  });

  test("Sửa query của zalo - EX", async () => {
    //Arrange
    const id = "";
    const successUrl = "suc";
    const cancelUrl = "cancel";
    const processor = getProcessor();
    const query = { url: successUrl + "-" + cancelUrl };

    //Act
    const expRs = NotValidError;

    let actRs;
    try {
      await processor.checkoutOrder(id, query);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(2);
  });

  test("Chưa thanh toán - EX", async () => {
    //Arrange
    const id = "";
    const successUrl = "suc";
    const cancelUrl = "cancel";
    const processor = getProcessor();
    const query = { url: successUrl + "-" + cancelUrl, data: {} };

    //Act
    const expRs = cancelUrl;
    const actRs = await processor.checkoutOrder(id, query);

    //Expect

    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(2);
  });

  test("Thành công trả về successUrl/id", async () => {
    //Arrange
    const id = "";
    const successUrl = "suc";
    const cancelUrl = "cancel";
    const processor = getProcessor();
    const query = { url: successUrl + "-" + cancelUrl, data: {}, status: 1 };

    const { storedOrders } = ZaloPayPaymentProcessor;
    storedOrders.set(id, {});

    //Act
    const expRs = `${successUrl}/1`;
    const actRs = await processor.checkoutOrder(id, query);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateId).toBeCalledTimes(1);
    expect(validatorMock.validateUrl).toBeCalledTimes(2);
    expect(daoMock.saveOrder).toBeCalledTimes(1);
  });
});
