const ModeratorsControllers = require("../../../app/controllers/moderators_controllers/ModeratorsControllers");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các api end-points của quản trị viên

//#region  Init
const moderators = [
  { mod_no: 1, mod_name: "alex", mod_phoneNumber: "0000000000" },
  { mod_no: 2, mod_name: "alexa", mod_phoneNumber: "0000000001" },
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

  existModerator = jest.fn((m) => {
    return m !== undefined;
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
});