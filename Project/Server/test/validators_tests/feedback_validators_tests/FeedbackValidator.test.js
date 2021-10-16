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

describe("Val Kiểm tra mã phản hồi", () => {
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

describe("Val Kiểm tra phản hồi model", () => {
  test("Undefined", () => {
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

  test("Thiếu customer", () => {
    // Arrange
    const fb = {};
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedback(fb).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Thiếu content", () => {
    // Arrange
    const fb = {
      customer: {
        cus_name: "Alexander",
        cus_email: "alex@gmail.com",
        cus_sex: true,
        cus_phoneNumber: "0000000000",
      },
    };
    const validator = getValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedback(fb).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Hợp lệ", () => {
    // Arrange
    const fb = {
      customer: {
        cus_name: "Alexander",
        cus_email: "alex@gmail.com",
        cus_sex: true,
        cus_phoneNumber: "0000000000",
      },
      fb_content: "aaaaaaaa",
    };
    const validator = getValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateFeedback(fb).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
