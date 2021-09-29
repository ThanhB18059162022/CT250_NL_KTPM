const FeedbackValidator = require("../../../app/validators/feedback_validators/FeedbackValidator");

//#region INIT

class ProductValidatorMock {
  validateNo = jest.fn((prod_no) => ({ hasAnyError: isNaN(prod_no) }));
}

//#endregion

let prodValidator;
function getValidator() {
  return new FeedbackValidator(prodValidator);
}

describe("Kiểm tra mã phản hồi", () => {
  test("Mã phản hồi undefined", () => {
    // Arrange
    const fb_no = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedbackNo(fb_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã phản hồi không phải số", () => {
    // Arrange
    const fb_no = "wtf";
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedbackNo(fb_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã phản hồi < 0", () => {
    // Arrange
    const fb_no = -1;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedbackNo(fb_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã phản hồi > int max", () => {
    // Arrange
    const fb_no = Number.MAX_SAFE_INTEGER + 1;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedbackNo(fb_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra phản hồi model", () => {
  test("OK - mẫu", () => {
    // Arrange
    const fb = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedback(fb).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra mã sản phẩm", () => {
  beforeEach(() => {
    prodValidator = new ProductValidatorMock();
  });

  test("Mã sản phẩm gọi hàm xác thực mã", () => {
    // Arrange
    const pro_no = undefined;
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateProductNo(pro_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
