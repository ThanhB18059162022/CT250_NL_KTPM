const ProductValidator = require("../../../app/validators/products_validators/ProductsValidator");

// Test các hàm xác thực dữ liệu của lớp ProductsValidator

function getValidator() {
  return new ProductValidator();
}

describe("Val Kiểm tra mã sản phẩm hợp lệ", () => {
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

describe("Val Kiểm tra tên sản phẩm hợp lệ", () => {
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

describe("Val Kiểm tra sản phẩm hợp lệ", () => {
  test("Sản phẩm undefiend", () => {
    //Arrange
    const product = undefined;
    const validator = getValidator();
    const valid = true;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProduct(product);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

const validDetail = {
  pd_ram: "8G",
  pd_storage: "124",
  pd_storageAvailable: "223",
  pd_amount: 12,
  pd_sold: 10,
  pd_price: 12000,
  pd_discount: 10,
};

// Mảng chứa các chi tiết
describe("Val Kiểm tra chi tiết sản phẩm hợp lệ", () => {
  test("Chi tiết undefiend", () => {
    //Arrange
    const details = undefined;
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Chi tiết rỗng", () => {
    //Arrange
    const details = [];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  // Không có ram pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold,
  test("Không có ram", () => {
    //Arrange
    const details = [{ ...validDetail, pd_ram: undefined }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Không có bộ nhớ", () => {
    //Arrange
    const details = [{ ...validDetail, pd_storage: undefined }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Không có tổng", () => {
    //Arrange
    const details = [{ ...validDetail, pd_amount: undefined }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tổng < 0", () => {
    //Arrange
    const details = [{ ...validDetail, pd_amount: -1 }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Không có tổng bán", () => {
    //Arrange
    const details = [{ ...validDetail, pd_sold: undefined }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tổng bán < 0", () => {
    //Arrange
    const details = [{ ...validDetail, pd_sold: -1 }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Không có giá", () => {
    //Arrange
    const details = [{ pd_ram: "8G" }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giá < 0", () => {
    //Arrange
    const details = [{ pd_ram: "8G", pd_price: -1 }];
    const validator = getValidator();
    const valid = false;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Hợp lệ", () => {
    //Arrange
    const details = [validDetail];
    const validator = getValidator();
    const valid = true;

    //Act
    const expRs = !valid;
    const actRs = validator.validateProductDetails(details).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
