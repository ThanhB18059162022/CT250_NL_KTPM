const ProductValidator = require("../../../app/controllers/products_controllers/ProductsValidator");

// Test các hàm xác thực dữ liệu của lớp ProductsValidator

function getValidator() {
  return new ProductValidator();
}

describe("Kiểm tra sản phẩm tồn tại", () => {
  test("Sản phẩm không tồn tại", () => {
    //Arrange
    const product = undefined;
    const validator = getValidator();
    const exist = true;

    //Act
    const expRs = !exist;
    const actRs = validator.existProduct(product);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Sản phẩm rỗng", () => {
    //Arrange
    const product = {};
    const validator = getValidator();
    const exist = true;

    //Act
    const expRs = !exist;
    const actRs = validator.existProduct(product);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Sản phẩm hợp lệ", () => {
    //Arrange
    const product = { prod_no: 1 };
    const validator = getValidator();
    const exist = false;

    //Act
    const expRs = !exist;
    const actRs = validator.existProduct(product);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra mã sản phẩm hợp lệ", () => {
  test("Mã sản phẩm hợp lệ", () => {
    //Arrange
    const prod_no = 1;
    const hasError = false;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateNo(prod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã sản phẩm < 0", () => {
    //Arrange
    const prod_no = -1;
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateNo(prod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã sản phẩm không phải số", () => {
    //Arrange
    const prod_no = "wtf";
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateNo(prod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã sản phẩm lớn hơn max int", () => {
    //Arrange
    const prod_no = Number.MAX_SAFE_INTEGER + 1;
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateNo(prod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra tên sản phẩm hợp lệ", () => {
  test("Tên sản phẩm hợp lệ", () => {
    //Arrange
    const prod_name = "Xiaomi";
    const hasError = false;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateName(prod_name).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên sản phẩm undefined", () => {
    //Arrange
    const prod_name = undefined;
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateName(prod_name).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên sản phẩm khoản trắng", () => {
    //Arrange
    const prod_name = "  ";
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateName(prod_name).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên sản phẩm ngắn hơn 5", () => {
    //Arrange
    const prod_name = "DT";
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateName(prod_name).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên sản phẩm lớn hơn 50", () => {
    //Arrange
    // 51 ký tự
    const prod_name = "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429a";
    const hasError = true;

    const validator = getValidator();

    //Act
    const expRs = hasError;
    const actRs = validator.validateName(prod_name).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
