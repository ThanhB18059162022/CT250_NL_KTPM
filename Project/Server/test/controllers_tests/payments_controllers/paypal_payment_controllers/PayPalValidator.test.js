const PayPalValidator = require("../../../../app/controllers/payments_controller/paypal_payments/PayPalValidator");

function getValidator() {
  return new PayPalValidator();
}

describe("Kiểm tra sản phẩm có đúng định dạng mã - số lượng", () => {
  test("Mảng undefined", () => {
    //Arrange
    const products = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng rỗng", () => {
    //Arrange
    const products = [];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng chỉ có mã sản phẩm", () => {
    //Arrange
    const products = [{ prod_no: 1 }, { prod_no: 2 }];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng chỉ có mã sản phẩm < 0", () => {
    //Arrange
    const products = [{ prod_no: -1 }, { prod_no: 2 }];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng có mã sản phẩm không phải số", () => {
    //Arrange
    const products = [{ prod_no: "wtf" }, { prod_no: "wa" }];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng chỉ có số lượng", () => {
    //Arrange
    const products = [{ prod_quantity: 1 }, { prod_quantity: 2 }];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng có số lượng <= 0", () => {
    //Arrange
    const products = [{ prod_quantity: 0 }, { prod_quantity: -2 }];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng có số lượng không phải số", () => {
    //Arrange
    const products = [{ prod_quantity: "wtf" }, { prod_quantity: "wtf" }];
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mảng hợp lệ", () => {
    //Arrange
    const products = [
      { prod_no: 3, prod_quantity: 1 },
      { prod_no: 1, prod_quantity: 2 },
    ];
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderProducts(products).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

const validCart = { products: [{ prod_no: 1, prod_quantity: 1 }] };
describe("Kiểm tra giỏ hàng đúng định dạng", () => {
  test("Giỏ hàng undefined", () => {
    //Arrange
    const cart = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCart(cart).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giỏ hàng rỗng", () => {
    //Arrange
    const cart = {};
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCart(cart).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giỏ hàng danh sách sản phẩm không hợp lệ", () => {
    //Arrange
    const cart = { validCart, products: [] };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCart(cart).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giỏ hàng danh sách sản phẩm hợp lệ", () => {
    //Arrange
    const cart = validCart;
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateCart(cart).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra OrderID hợp lệ", () => {
  test("OrderID Undefined", () => {
    //Arrange
    const orderID = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderID(orderID).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("OrderID < 17", () => {
    //Arrange
    const orderID = "aaaaaaaaaaaa";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderID(orderID).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("OrderID > 17", () => {
    //Arrange
    const orderID = "6072225628845804W1111";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderID(orderID).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("OrderID hợp lệ", () => {
    //Arrange
    const orderID = "6072225628845804W";
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateOrderID(orderID).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });
});
