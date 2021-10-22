const {
  ZaloPayPaymentController,
} = require("../../../../app/controllers/controllersContainer");
const { ResponseMock } = require("../../controllerTestHelper");
const {
  NotValidError,
  NotExistError,
} = require("../../../../app/errors/errorsContainer");

//#region INIT

class ZaloPaymentProcessorMock {
  checkValidateUrl = jest.fn((url) => {
    if (url == undefined) {
      throw new NotValidError();
    }
  });

  createOrder = jest.fn((cart) => {
    if (cart == undefined) {
      throw new NotValidError();
    }
  });

  checkoutOrder = jest.fn((id, url = {}) => {
    if (
      id == undefined ||
      url.successUrl == undefined ||
      url.cancelUrl == undefined ||
      url.data == undefined
    ) {
      throw new NotValidError();
    }

    if (id != 1) {
      throw new NotExistError();
    }
  });
}

//#endregion

// Test cái api end-point của Thanh toán Zalo

let processorMock;

function getController() {
  return new ZaloPayPaymentController(processorMock);
}

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Url của client khi thành công
// Url khi thất bại
// 201 - 400

describe("Ctrlr Tạo đơn hàng", () => {
  beforeEach(() => {
    processorMock = new ZaloPaymentProcessorMock();
  });

  test("Tạo thành công - 201", async () => {
    //Arrange
    const cart = {};
    const controller = getController();

    const reqMock = {
      body: cart,
      headers: {},
      query: { successUrl: "url", cancelUrl: "url" },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201 };
    const actRes = await controller.createOrder(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.checkValidateUrl).toBeCalledTimes(2);
    expect(processorMock.createOrder).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 301 - 400 - 404
describe("Ctrlr Lưu đơn hàng đã thanh toán", () => {
  beforeEach(() => {
    processorMock = new ZaloPaymentProcessorMock();
  });

  test("Thành công về trang client  - 301", async () => {
    //Arrange
    const id = 1;
    const controller = getController();

    const reqMock = {
      params: { id },
      query: { successUrl: "", cancelUrl: "wtf", data: {} },
    };
    const resMock = new ResponseMock();

    //Act
    await controller.checkoutOrder(reqMock, resMock);

    //Expect
    expect(processorMock.checkoutOrder).toBeCalledTimes(1);
    expect(resMock.redirect).toBeCalledTimes(1);
  });
});
