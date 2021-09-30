const ModeratorsValidator = require("../../../app/validators/moderators_validators/ModeratorsValidator");

// Kiểm tra hàm xác nhận dữ liệu của lớp quản trị viên ModeratorsController

function getModeratorsValidator() {
  return new ModeratorsValidator();
}

describe("Val Kiểm tra mã quản trị mod_no", () => {
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

describe("Val Kiểm tra số điện thoại quản trị mod_phoneNumber", () => {
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

describe("Val Kiểm tra CMND quản trị mod_phoneNumber", () => {
  test("CMND undefined", () => {
    //Arrange
    const mod_id = undefined;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateMod_Id(mod_id).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND < 9 số", () => {
    //Arrange
    const mod_id = "0000";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateMod_Id(mod_id).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND > 9 số", () => {
    //Arrange
    const mod_id = "0000111100001111";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateMod_Id(mod_id).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND không phải số", () => {
    //Arrange
    const mod_id = "aaaaaaaaaa";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateMod_Id(mod_id).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND hợp lệ", () => {
    //Arrange
    const mod_id = "090000000";
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateMod_Id(mod_id).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Val Username Kiểm tra hợp lệ tài khoản", () => {
  test("Tài khoản undefined", () => {
    //Arrange
    const mod_username = undefined;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUsername(mod_username).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản rỗng", () => {
    //Arrange
    const mod_username = "";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUsername(mod_username).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản < 5", () => {
    //Arrange
    const mod_username = "alex";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUsername(mod_username).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản > 70", () => {
    //Arrange
    const mod_username =
      "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4fa";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUsername(mod_username).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản có khoảng trắng", () => {
    //Arrange
    const mod_username = "alex awdaw";
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUsername(mod_username).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

// Thông tin hợp lệ add
const validAddModeratorModel = {
  mod_name: "alexander",
  mod_id: "000000001",
  mod_phoneNumber: "0000000011",
  mod_sex: true,
  mod_address: "3/2 NK CT",
  mod_role: 0,
  mod_username: "alexander",
  mod_password: "123456",
};

describe("Val Thêm quản trị viên kiểm tra thông tin quản trị viên hợp lệ", () => {
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

    const moderator = { ...validAddModeratorModel, mod_name };
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

    const moderator = { ...validAddModeratorModel, mod_name };

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

    const moderator = { ...validAddModeratorModel, mod_name };

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
    const moderator = { ...validAddModeratorModel };

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region CMND

  test("CMND quản trị viên undefined", () => {
    // Arrange
    const mod_id = undefined;
    const moderator = { ...validAddModeratorModel, mod_id };
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
    const mod_id = "11111111";
    const moderator = { ...validAddModeratorModel, mod_id };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND quản trị viên không phải là số", () => {
    // Arrange
    const mod_id = "a78877777";

    const moderator = { ...validAddModeratorModel, mod_id };

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
    const mod_id = "778877777";

    const moderator = { ...validAddModeratorModel, mod_id };

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region PhoneNumber

  test("Số điện thoại hợp lệ", () => {
    //Arrange
    const moderator = validAddModeratorModel;

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại undefined", () => {
    //Arrange
    const moderator = { ...validAddModeratorModel, mod_phoneNumber: undefined };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại ngắn hơn 10", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,
      mod_phoneNumber: "11111111",
    };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại dài hơn 10", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,
      mod_phoneNumber: "11111111111111111",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại không phải là số", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,
      mod_phoneNumber: "111111111a",
    };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Sex

  test("Giới tính hợp lệ", () => {
    //Arrange
    const moderator = validAddModeratorModel;

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giới tính undefined", () => {
    //Arrange
    const moderator = { ...validAddModeratorModel, mod_sex: undefined };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giới tính không phải bool", () => {
    //Arrange
    const moderator = { ...validAddModeratorModel, mod_sex: "wtf" };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Adrress

  test("Địa chỉ hợp lệ", () => {
    //Arrange

    const moderator = validAddModeratorModel;

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ undefined", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_address: undefined };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ ngắn hơn 5", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_address: "abc" };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ dài hơn 128", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,

      mod_address:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4faa",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Role

  // Kiểu int

  test("Vai trò hợp lệ", () => {
    //Arrange

    const moderator = validAddModeratorModel;

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Vai trò không phải là số", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_role: "wtf" };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Vai trò < 0", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_role: -1 };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Vai trò > int max", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,

      mod_role: Number.MAX_SAFE_INTEGER + 1,
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Username

  test("Tài khoản hợp lệ", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel };

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản undefined", () => {
    //Arrange
    const moderator = { ...validAddModeratorModel, mod_username: undefined };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản ngắn hơn 5", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_username: "abc" };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản dài hơn 70", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,

      mod_username:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4fa",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tài khoản không có khoảng trắng", () => {
    //Arrange
    const moderator = { ...validAddModeratorModel, mod_username: "alex  aw" };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Password

  test("Mật khẩu hợp lệ", () => {
    //Arrange
    const moderator = { ...validAddModeratorModel };

    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mật khẩu undefined", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_password: undefined };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mật khẩu ngắn hơn 5", () => {
    //Arrange

    const moderator = { ...validAddModeratorModel, mod_password: "123" };

    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mật khẩu dài hơn 64", () => {
    //Arrange
    const moderator = {
      ...validAddModeratorModel,

      mod_password:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4fa",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateAddModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion
});

// Thông tin hợp lệ cập nhật
const validUpdateModeratorModel = {
  mod_name: "alexander",
  mod_id: "000000001",
  mod_phoneNumber: "0000000011",
  mod_sex: true,
  mod_address: "3/2 NK CT",
  mod_role: 0,
  mod_password: "123456",
};

describe("Val Cập nhật quản trị viên kiểm tra thông tin quản trị viên hợp lệ", () => {
  test("Quản trị viên undefined", () => {
    // Arrange
    const moderator = undefined;
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#region  Tên

  test("Tên quản trị viên undefined", () => {
    // Arrange
    const mod_name = undefined;
    const moderator = { ...validUpdateModeratorModel, mod_name };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên quản trị viên ngắn hơn 5", () => {
    // Arrange
    const mod_name = "wtf";
    const moderator = { ...validUpdateModeratorModel, mod_name };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên quản trị viên dài hơn 70", () => {
    // Arrange
    const mod_name =
      "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4f";
    const moderator = { ...validUpdateModeratorModel, mod_name };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Tên quản trị viên hợp lệ", () => {
    // Arrange
    const moderator = { ...validUpdateModeratorModel };
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region CMND

  test("CMND quản trị viên undefined", () => {
    // Arrange
    const mod_id = undefined;
    const moderator = { ...validUpdateModeratorModel, mod_id };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND quản trị viên không đủ 9 số", () => {
    // Arrange
    const mod_id = "11111111";
    const moderator = { ...validUpdateModeratorModel, mod_id };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND quản trị viên không phải là số", () => {
    // Arrange
    const mod_id = "a78877777";
    const moderator = { ...validUpdateModeratorModel, mod_id };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("CMND quản trị viên hợp lệ", () => {
    // Arrange
    const mod_id = "778877777";
    const moderator = { ...validUpdateModeratorModel, mod_id };
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region PhoneNumber

  test("Số điện thoại hợp lệ", () => {
    //Arrange
    const moderator = validUpdateModeratorModel;
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại undefined", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_phoneNumber: undefined,
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại ngắn hơn 10", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_phoneNumber: "11111111",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại dài hơn 10", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_phoneNumber: "11111111111111111",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Số điện thoại không phải là số", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_phoneNumber: "111111111a",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Sex

  test("Giới tính hợp lệ", () => {
    //Arrange
    const moderator = validUpdateModeratorModel;
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giới tính undefined", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_sex: undefined };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Giới tính không phải bool", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_sex: "wtf" };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Adrress

  test("Địa chỉ hợp lệ", () => {
    //Arrange
    const moderator = validUpdateModeratorModel;
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ undefined", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_address: undefined };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ ngắn hơn 5", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_address: "abc" };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Địa chỉ dài hơn 128", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_address:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4faa",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Role

  // Kiểu int

  test("Vai trò hợp lệ", () => {
    //Arrange
    const moderator = validUpdateModeratorModel;
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Vai trò không phải là số", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_role: "wtf" };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Vai trò < 0", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_role: -1 };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Vai trò > int max", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_role: Number.MAX_SAFE_INTEGER + 1,
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion

  //#region Password

  test("Mật khẩu hợp lệ", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel };
    const validator = getModeratorsValidator();
    const failed = false;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mật khẩu undefined", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_password: undefined };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mật khẩu ngắn hơn 5", () => {
    //Arrange
    const moderator = { ...validUpdateModeratorModel, mod_password: "123" };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Mật khẩu dài hơn 64", () => {
    //Arrange
    const moderator = {
      ...validUpdateModeratorModel,
      mod_password:
        "a8fad5592ed3d048090aa7d80fc2a4c4207fe936aeda98af429395637546529cbc5c9160c57be308015649a34231353e00f996f1742929e4efd0edb66f24d4fa",
    };
    const validator = getModeratorsValidator();
    const failed = true;

    //Act
    const expRs = failed;
    const actRs = validator.validateUpdateModerator(moderator).hasAnyError;

    //Expect
    expect(actRs).toEqual(expRs);
  });

  //#endregion
});
