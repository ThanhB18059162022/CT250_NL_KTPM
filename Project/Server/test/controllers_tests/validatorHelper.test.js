const validatorHelper = require("../../app/controllers/validatorHelper");

// Kiểm tra các hàm helper trong validatorHelper

describe("Kiểm tra tạo báo cáo lỗi", () => {
  const getRs = validatorHelper.getValidationResult;

  test("Không có lỗi", () => {
    //Arrange
    const schema = {
      validate: () => {
        return {};
      },
    };
    const error = false;

    //Act
    const expRs = { hasAnyError: error };
    const actRs = getRs(schema);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Có lỗi", () => {
    //Arrange
    const schema = {
      validate: () => {
        return { error: { details: [{ message: "", context: {} }] } };
      },
    };
    const error = true;

    //Act
    const expRs = error;
    const actRs = getRs(schema).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
