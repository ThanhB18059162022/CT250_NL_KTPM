const ModeratorsControllers = require("../../../app/controllers/moderators_controllers/ModeratorsControllers");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các api end-points của quản trị viên

//#region  Init
const moderators = [
  {
    mod_no: 1,
    mod_name: "alex",
    mod_phoneNumber: "0000000000",
    mod_id: "111111111",
    mod_username: "alexand",
  },
  {
    mod_no: 2,
    mod_name: "alexa",
    mod_phoneNumber: "0000000001",
    mod_id: "222222222",
    mod_username: "alexand",
  },
];
class ModeratorValidatorMock {
  validateNo = jest.fn((mod_no) => {
    return {
      hasAnyError: Number(mod_no) < 0,
    };
  });

  validatePhoneNumber = jest.fn((p) => {
    return { hasAnyError: p === "" };
  });

  validateMod_Id = jest.fn((id) => {
    return { hasAnyError: id === "" };
  });

  validateUsername = jest.fn((un) => {
    return { hasAnyError: un === "" };
  });

  existModerator = jest.fn((m) => {
    return m !== undefined;
  });

  validateAddModerator = jest.fn((mod) => {
    return { hasAnyError: mod === undefined };
  });

  validateUpdateModerator = jest.fn((mod) => {
    return { hasAnyError: mod === undefined };
  });
}

class ModeratorDAOMock {
  getModerators = jest.fn(async () => {
    return moderators;
  });

  getModeratorByNo = jest.fn(async (mod_no) => {
    return moderators.filter((m) => m.mod_no === mod_no)[0];
  });

  getModeratorByPhoneNumber = jest.fn(async (mod_phoneNumber) => {
    return moderators.filter((m) => m.mod_phoneNumber === mod_phoneNumber)[0];
  });

  getModeratorByMod_Id = jest.fn(async (mod_id) => {
    return moderators.filter((m) => m.mod_id === mod_id)[0];
  });

  getModeratorByUsername = jest.fn(async (mod_username) => {
    return moderators.filter((m) => m.mod_username === mod_username)[0];
  });

  addModerator = jest.fn(async (mod) => mod);

  updateModerator = jest.fn();

  lockModerator = jest.fn();
}
//#endregion

let daoMock;
let validateMock;

function getController() {
  return new ModeratorsControllers(validateMock, daoMock);
}

// 200 - 400 - 404
describe("Lấy ra quản trị viên", () => {
  beforeEach(() => {
    validateMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Lấy ra danh sách quản trị viên - 200", async () => {
    //Arrange
    const controller = getController();
    const reqMock = { query: {} };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { items: moderators } };
    const actRes = await controller.getModerators(reqMock, resMock);

    //Assert
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  //#region Theo mã

  test("Lấy ra quản trị viên theo mã không hợp lệ - 400", async () => {
    //Arrange
    const controller = getController();
    const mod_no = -1;
    const reqMock = { params: { mod_no } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.getModeratorByNo(reqMock, resMock);

    //Assert
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Lấy ra quản trị viên theo mã không tồn tại - 404", async () => {
    //Arrange
    const controller = getController();
    const mod_no = 666;
    const reqMock = { params: { mod_no } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.getModeratorByNo(reqMock, resMock);

    //Assert
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
  });

  test("Lấy ra quản trị viên theo mã - 200", async () => {
    //Arrange
    const controller = getController();
    const mod_no = 1;
    const reqMock = { params: { mod_no } };
    const resMock = new ResponseMock();

    const mod = await daoMock.getModeratorByNo(mod_no);
    // Xóa để lời gọi hàm trong controller còn 1
    daoMock.getModeratorByNo.mockClear();

    //Act
    const expRes = { statusCode: 200, body: mod };
    const actRes = await controller.getModeratorByNo(reqMock, resMock);

    //Assert
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
  });

  //#endregion

  //#region Theo số điện thoại

  test("Lấy ra quản trị viên theo số điện thoại không hợp lệ - 400", async () => {
    //Arrange
    const controller = getController();
    const mod_phoneNumber = "";
    const reqMock = { params: { mod_phoneNumber } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.getModeratorByPhoneNumber(reqMock, resMock);

    //Assert
    expect(validateMock.validatePhoneNumber).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Lấy ra quản trị viên theo số điện thoại không tồn tại - 404", async () => {
    //Arrange
    const controller = getController();
    const mod_phoneNumber = "0000000002";
    const reqMock = { params: { mod_phoneNumber } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.getModeratorByPhoneNumber(reqMock, resMock);

    //Assert
    expect(validateMock.validatePhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Lấy ra quản trị viên theo số điện thoại - 200", async () => {
    //Arrange
    const controller = getController();
    const mod_phoneNumber = "0000000000";
    const reqMock = { params: { mod_phoneNumber } };
    const resMock = new ResponseMock();

    const mod = moderators.filter(
      (m) => m.mod_phoneNumber === mod_phoneNumber
    )[0];

    //Act
    const expRes = { statusCode: 200, body: mod };
    const actRes = await controller.getModeratorByPhoneNumber(reqMock, resMock);

    //Assert
    expect(validateMock.validatePhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  //#endregion

  //#region Theo CMND

  test("Lấy ra quản trị viên theo CMND không hợp lệ - 400", async () => {
    //Arrange
    const controller = getController();
    const mod_id = "";
    const reqMock = { params: { mod_id } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.getModeratorByMod_Id(reqMock, resMock);

    //Assert
    expect(validateMock.validateMod_Id).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Lấy ra quản trị viên theo CMND không tồn tại - 404", async () => {
    //Arrange
    const controller = getController();
    const mod_id = "000000000";
    const reqMock = { params: { mod_id } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.getModeratorByMod_Id(reqMock, resMock);

    //Assert
    expect(validateMock.validateMod_Id).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Lấy ra quản trị viên theo CMND hợp lệ - 200", async () => {
    //Arrange
    const controller = getController();
    const mod = moderators[0];
    const { mod_id } = mod;
    const reqMock = { params: { mod_id } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: mod };
    const actRes = await controller.getModeratorByMod_Id(reqMock, resMock);

    //Assert
    expect(validateMock.validateMod_Id).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  //#endregion

  //#region Theo tài khoản

  test("Tài khoản không hợp lệ - 400", async () => {
    //Arrange
    const controller = getController();
    const mod_username = "";
    const reqMock = { params: { mod_username } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.getModeratorByUsername(reqMock, resMock);

    //Assert
    expect(validateMock.validateUsername).toBeCalledTimes(1);

    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Tài khoản không tồn tại - 404", async () => {
    //Arrange
    const controller = getController();
    const mod_username = "wtfaa";
    const reqMock = { params: { mod_username } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.getModeratorByUsername(reqMock, resMock);

    //Assert
    expect(validateMock.validateUsername).toBeCalledTimes(1);
    expect(daoMock.getModeratorByUsername).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Tài khoản hợp lệ - 200", async () => {
    //Arrange
    const controller = getController();
    const mod = moderators[0];
    const { mod_username } = mod;
    const reqMock = { params: { mod_username } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: mod };
    const actRes = await controller.getModeratorByUsername(reqMock, resMock);

    //Assert
    expect(validateMock.validateUsername).toBeCalledTimes(1);
    expect(daoMock.getModeratorByUsername).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  //#endregion
});

// 201 - 400
describe("Thêm quản trị viên", () => {
  beforeEach(() => {
    validateMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Thông tin không hợp lệ các trường undefined - 400", async () => {
    //Arrange
    const moderator = undefined;

    const controller = getController();

    const reqMock = { body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: moderator };
    const actRes = await controller.addModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateAddModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Trùng số điện thoại - 400", async () => {
    //Arrange
    const moderator = { mod_phoneNumber: "0000000000" };

    const controller = getController();

    const reqMock = { body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.addModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateAddModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(validateMock.existModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Trùng số CMND - 400", async () => {
    //Arrange
    const moderator = { mod_id: "111111111", mod_phoneNumber: "5555555555" };

    const controller = getController();

    const reqMock = { body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.addModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateAddModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(validateMock.existModerator).toBeCalledTimes(2);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Thêm thành công - 201", async () => {
    //Arrange
    const moderator = { mod_id: "111111119", mod_phoneNumber: "5555555555" };

    const controller = getController();

    const reqMock = { body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201, body: moderator };
    const actRes = await controller.addModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateAddModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(validateMock.existModerator).toBeCalledTimes(2);
    expect(daoMock.addModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 204 - 400 - 404
describe("Sửa thông tin quản trị viên", () => {
  beforeEach(() => {
    validateMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Mã quản trị không hợp lệ - 400", async () => {
    //Arrange
    const mod_no = -1;
    const moderator = {};

    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Thông tin không hợp lệ các trường undefined - 400", async () => {
    //Arrange
    const mod_no = 1;
    const moderator = undefined;

    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: moderator };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(validateMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Mã quản trị không tồn tại - 404", async () => {
    //Arrange
    const mod_no = 666;
    const moderator = {};

    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(validateMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Số điện thoại đã tồn tại - 400", async () => {
    //Arrange
    const mod_no = 2;
    const moderator = { ...moderators[0], mod_no };

    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(validateMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Số CMND đã tồn tại - 400", async () => {
    //Arrange
    const mod_no = 2;
    const moderator = {
      ...moderators[0],
      mod_no,
      mod_phoneNumber: "0000000009",
    };

    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(validateMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes.statusCode).toEqual(expRes.statusCode);
  });

  test("Cập nhật thành công - 204", async () => {
    //Arrange
    const mod_no = 1;
    const moderator = {
      ...moderators[0],
    };

    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 204, body: {} };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(validateMock.validateNo).toBeCalledTimes(1);
    expect(validateMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(daoMock.updateModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});

// 204 - 400 - 404
describe("Khóa tài khoản quản trị viên theo mã", () => {
  test("Mã quản trị không hợp lệ", async () => {
    //Arrange
    const mod_no = -1;

    const controller = getController();

    const reqMock = {
      params: { mod_no },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400, body: undefined };
    const actRes = await controller.lockModerator(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Quản trị viên không tồn tại", async () => {
    //Arrange
    const mod_no = 666;

    const controller = getController();

    const reqMock = {
      params: { mod_no },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.lockModerator(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  test("Khóa thành công", async () => {
    //Arrange
    const mod_no = 1;

    const controller = getController();

    const reqMock = {
      params: { mod_no },
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 204, body: {} };
    const actRes = await controller.lockModerator(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(daoMock.lockModerator).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });
});
