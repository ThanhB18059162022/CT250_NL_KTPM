const ModeratorsValidator = require("../../../app/controllers/moderators_controllers/ModeratorsValidator");

// Kiểm tra hàm xác nhận dữ liệu của lớp quản trị viên ModeratorsController

function getModeratorsValidator() {
  return new ModeratorsValidator();
}

describe("Kiểm tra mã quản trị mod_no", () => {
  test("Mã quản trị undefined", () => {
    //Arrange
    const mod_no = undefined;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateNo(mod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã quản trị âm", () => {
    //Arrange
    const mod_no = -1;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateNo(mod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã quản trị không phải số", () => {
    //Arrange
    const mod_no = "wtf";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateNo(mod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã quản trị lớn hơn int max", () => {
    //Arrange
    const mod_no = Number.MAX_SAFE_INTEGER + 1;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateNo(mod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mã quản trị hợp lệ", () => {
    //Arrange
    const mod_no = 1;
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateNo(mod_no).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra số điện thoại quản trị mod_phoneNumber", () => {
  test("Số điện thoại undefined", () => {
    //Arrange
    const mod_phoneNumber = undefined;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validatePhoneNumber(mod_phoneNumber).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại < 10 số", () => {
    //Arrange
    const mod_phoneNumber = "0000";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validatePhoneNumber(mod_phoneNumber).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại > 10 số", () => {
    //Arrange
    const mod_phoneNumber = "0000111100001111";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validatePhoneNumber(mod_phoneNumber).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại không phải số", () => {
    //Arrange
    const mod_phoneNumber = "aaaaaaaaaa";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validatePhoneNumber(mod_phoneNumber).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại hợp lệ", () => {
    //Arrange
    const mod_phoneNumber = "0900000000";
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validatePhoneNumber(mod_phoneNumber).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
