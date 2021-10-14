const {
  DefaultPaymentProcessor,
} = require("../../../../app/processors/processorsContainer");
const {
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
  StorageServiceMock,
} = require("../paymentsProcessorHelper");
const {
  NotValidError,
  NotExistError,
} = require("../../../../app/errors/errorsContainer");

class DefaultPaymentProcessorFake extends DefaultPaymentProcessor {
  getOrderId = () => "1";
}

let validatorMock;
let daoMock;
let exServiceMock;
let strgServiceMock;

function getProcessor() {
  return new DefaultPaymentProcessorFake(
    validatorMock,
    daoMock,
    exServiceMock,
    strgServiceMock
  );
}

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Trả về id dơn hàng
describe("Proc Tạo đơn hàng", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();
    daoMock = new PaymentDAOMock();
    exServiceMock = new CurrencyExchangeServiceMock();
    strgServiceMock = new StorageServiceMock();
  });

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

  test("Tạo thành công trả về order id", async () => {
    //Arrange
    const cart = { products: [{ prod_pice: 2000 }] };
    const processor = getProcessor();

    //Act
    const expRs = "1";
    const actRs = await processor.createOrder(cart);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateCart).toBeCalledTimes(1);

    expect(daoMock.getOrderProduct).toBeCalledTimes(1);
  });
});

describe("Proc Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    validatorMock = new PaymentValidatorMock();

    daoMock = new PaymentDAOMock();
    strgServiceMock = new StorageServiceMock();
  });

  test("Id đơn hàng không hợp lệ - EX", async () => {
    //Arrange
    const id = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.checkoutOrder(id, {});
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateId).toBeCalledTimes(1);
  });

  test("Order không tồn tại - EX", async () => {
    //Arrange
    const id = "";
    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
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

  test("Thành công trả về id", async () => {
    //Arrange
    const id = "1";
    const processor = getProcessor();

    //Act
    const expRs = 1;
    const actRs = await processor.checkoutOrder(id);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateId).toBeCalledTimes(1);
    expect(daoMock.saveOrder).toBeCalledTimes(1);
  });
});
