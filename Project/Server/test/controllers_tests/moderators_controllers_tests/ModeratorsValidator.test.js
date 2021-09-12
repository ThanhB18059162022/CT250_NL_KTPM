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

// Thông tin hợp lệ
const validModeratorModel = {
  mod_name: "alexander",
  mod_id: "000000001",
  // mod_phoneNumber: "0000000011",
  // mod_sex: "male",
  // mod_address: "3/2 NK CT",
  // mod_role: "admin",
};

describe("Thêm quản trị viên MOR Kiểm tra thông tin quản trị viên hợp lệ", () => {
  test("Quản trị viên undefined", () => {
    // Arrange
    const moderator = undefined;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#region  Tên

  test("Tên quản trị viên undefined", () => {
    // Arrange
    const mod_name = undefined;
    const moderator = { ...validModeratorModel, mod_name };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên quản trị viên ngắn hơn 5", () => {
    // Arrange
    const mod_name = "wtf";
    const moderator = { ...validModeratorModel, mod_name };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên quản trị viên dài hơn 70", () => {
    // Arrange
    const mod_name =
      "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4f";
    const moderator = { ...validModeratorModel, mod_name };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên quản trị viên hợp lệ", () => {
    // Arrange
    const moderator = { ...validModeratorModel };
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  // Từ đây tên sẽ hợp lệ

  //#region CMND

  test("CMND quản trị viên undefined", () => {
    // Arrange
    const mod_name = "alexander";
    const mod_id = undefined;
    const moderator = { mod_name, mod_id };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND quản trị viên không đủ 9 số", () => {
    // Arrange
    const mod_name = "alexander";
    const mod_id = "77887777";
    const moderator = { mod_name, mod_id };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND quản trị viên hợp lệ", () => {
    // Arrange
    const mod_name = "alexander";
    const mod_id = "778877777";
    const moderator = { mod_name, mod_id };
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion
});

describe("Kiểm tra quản trị viên tồn tại", () => {
  test("Quản trị viên không tồn tại", () => {
    // Arrange
    const moderator = undefined;
    const validator = getModeratorsValidator();
    const valid = true;

    //Act
    const expRs = !valid;
    const actRs = validator.existModerator(moderator);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Quản trị viên tồn tại", () => {
    // Arrange
    const moderator = {};
    const validator = getModeratorsValidator();
    const valid = true;

    //Act
    const expRs = valid;
    const actRs = validator.existModerator(moderator);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
