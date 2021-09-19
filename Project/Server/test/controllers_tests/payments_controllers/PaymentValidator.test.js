const PaymentValidator = require("../../../app/controllers/payments_controller/PaymentValidator");

function getValidator() {
  return new PaymentValidator();
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

const validCustomer = {
  cus_name: "Alexander",
  cus_id: "555555555",
  cus_email: "alex@gmail.com",
  cus_sex: true,
  cus_address: "3/2 Ninh Kiều Cần Thơ",
  cus_phoneNumber: "0000000000",
};
describe("Kiểm tra thông tin khách hàng", () => {
  test("Hợp lệ", () => {
    //Arrange
    const customer = validCustomer;
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Khách hàng undefined", () => {
    //Arrange
    const customer = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#region  Tên

  test("Không có tên", () => {
    //Arrange
    const customer = { ...validCustomer, cus_name: undefined };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên rỗng", () => {
    //Arrange
    const customer = { ...validCustomer, cus_name: "" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên < 5", () => {
    //Arrange
    const customer = { ...validCustomer, cus_name: "aaaa" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên > 70", () => {
    //Arrange
    const customer = {
      ...validCustomer,
      cus_name:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4fa",
    };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region CMND

  test("CMND undefined", () => {
    //Arrange
    const customer = { ...validCustomer, cus_id: undefined };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND rỗng", () => {
    //Arrange
    const customer = { ...validCustomer, cus_id: "" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND < 9", () => {
    //Arrange
    const customer = { ...validCustomer, cus_id: "55555555" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND > 9", () => {
    //Arrange
    const customer = { ...validCustomer, cus_id: "1111111111" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND không phải số", () => {
    //Arrange
    const customer = { ...validCustomer, cus_id: "11111111s" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region  Email

  test("Email undefined", () => {
    //Arrange
    const customer = { ...validCustomer, cus_email: undefined };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Email rỗng", () => {
    //Arrange
    const customer = { ...validCustomer, cus_email: "" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Email không có @", () => {
    //Arrange
    const customer = { ...validCustomer, cus_email: "alexgmail" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Email không có gì sau @", () => {
    //Arrange
    const customer = { ...validCustomer, cus_email: "alex@" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Email không có . tên miền", () => {
    //Arrange
    const customer = { ...validCustomer, cus_email: "alex@gmail" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Giới tính

  test("Giới tính undefined", () => {
    //Arrange
    const customer = { ...validCustomer, cus_sex: undefined };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giới tính không phải bool", () => {
    //Arrange
    const customer = { ...validCustomer, cus_sex: "" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Địa chỉ

  test("Địa chỉ undefined", () => {
    //Arrange
    const customer = { ...validCustomer, cus_address: undefined };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ rỗng", () => {
    //Arrange
    const customer = { ...validCustomer, cus_address: "" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ < 10", () => {
    //Arrange
    const customer = { ...validCustomer, cus_address: "aaaaa" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ > 128", () => {
    //Arrange
    const customer = {
      ...validCustomer,
      cus_address:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4fa1",
    };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Số điện thoại

  test("Số điện thoại undefined", () => {
    //Arrange
    const customer = { ...validCustomer, cus_phoneNumber: undefined };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại rỗng", () => {
    //Arrange
    const customer = { ...validCustomer, cus_phoneNumber: "" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại < 10", () => {
    //Arrange
    const customer = { ...validCustomer, cus_phoneNumber: "111111111" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại > 10", () => {
    //Arrange
    const customer = { ...validCustomer, cus_phoneNumber: "111111111111" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại không phải số", () => {
    //Arrange
    const customer = { ...validCustomer, cus_phoneNumber: "111111111a" };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCustomer(customer).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion
});

const validCart = {
  customer: validCustomer,
  products: [{ prod_no: 1, prod_quantity: 1 }],
};
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
    const cart = { ...validCart, products: [] };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCart(cart).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giỏ hàng thông tin khách hàng không hợp lệ", () => {
    //Arrange
    const cart = { ...validCart, customer: {} };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateCart(cart).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giỏ hàng hợp lệ", () => {
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

describe("Kiểm url hợp lệ", () => {
  test("Url Undefined", () => {
    //Arrange
    const url = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUrl(url).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("Url rỗng", () => {
    //Arrange
    const url = "";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUrl(url).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("Không có protocol http - https", () => {
    //Arrange
    const url = "//localhost";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUrl(url).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("Không có //", () => {
    //Arrange
    const url = "http:";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUrl(url).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });

  test("Hợp lệ", () => {
    //Arrange
    const url = "http://localhost";
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUrl(url).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra PayPal OrderID hợp lệ", () => {
  test("OrderID Undefined", () => {
    //Arrange
    const orderID = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validatePayPalOrderID(orderID).hasAnyError;

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
    const actRs = validator.validatePayPalOrderID(orderID).hasAnyError;

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
    const actRs = validator.validatePayPalOrderID(orderID).hasAnyError;

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
    const actRs = validator.validatePayPalOrderID(orderID).hasAnyError;

    //Assert
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra stripe OrderId hợp lệ", () => {
  test("Không có orderId", () => {
    //Arrange
    const orderId = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateStripeOrderId(orderId).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("OrderId < 64", () => {
    //Arrange
    const orderId = "";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateStripeOrderId(orderId).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("OrderId > 64", () => {
    //Arrange
    const orderId =
      "MFNhdCBTZXAgMTggMjAyMSAxNDoxMDoyNSBHTVQrMDcwMCAoR2nhu50gxJDDtG5nIETGsMahbmcp1";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateStripeOrderId(orderId).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("OrderId hợp lệ", () => {
    //Arrange
    const orderId =
      "7210a5e54e1b47c33073e703f1aac099332400f109432ccc815278b1052efe44";
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateStripeOrderId(orderId).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
