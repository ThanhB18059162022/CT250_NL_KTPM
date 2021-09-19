const PaymentController = require("../../../app/controllers/payments_controller/PaymentController");

class DAOMock {
  getOrderProduct = jest.fn((prod_no) => {
    return {
      prod_no,
    };
  });

  saveOrder = jest.fn();
}

// Test lớp cha của payment
class PaymentControllerObject extends PaymentController {}

let daoMock;
function getController() {
  return new PaymentControllerObject(daoMock);
}

describe("Abstract Test", () => {
  beforeEach(() => {
    daoMock = new DAOMock();
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
    expect(actRs).toEqual(expRs);
  });
});
