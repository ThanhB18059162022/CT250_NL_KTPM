const FeedbackValidator = require("../../../app/controllers/feedback_controllers/FeedbackValidator");

function getValidator() {
  return new FeedbackValidator();
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
