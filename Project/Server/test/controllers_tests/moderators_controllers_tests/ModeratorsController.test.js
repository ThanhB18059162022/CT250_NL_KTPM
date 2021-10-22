const {
  ModeratorsController,
} = require("../../../app/controllers/controllersContainer");
const {
  NotExistError,
  NotValidError,
  ExistError,
} = require("../../../app/errors/errorsContainer");
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
class ModeratorsProcessorMock {
  getModerators = jest.fn(async () => {
    return { items: moderators };
  });

  getModeratorByNo = jest.fn(async (mod_no) => {
    if (mod_no == undefined) {
      throw new NotValidError();
    }
    if (mod_no != 1) {
      throw new NotExistError();
    }

    return moderators[0];
  });

  getModeratorByPhoneNumber = jest.fn(async (mod_phoneNumber) => {
    if (mod_phoneNumber == undefined) {
      throw new NotValidError();
    }
    if (mod_phoneNumber != "0000000000") {
      throw new NotExistError();
    }

    return moderators[0];
  });

  getModeratorByMod_Id = jest.fn(async (mod_id) => {
    if (mod_id == undefined) {
      throw new NotValidError();
    }
    if (mod_id != moderators[0].mod_id) {
      throw new NotExistError();
    }
  });

  getModeratorByUsername = jest.fn(async (mod_username) => {
    if (mod_username == undefined) {
      throw new NotValidError();
    }
    if (mod_username != moderators[0].mod_username) {
      throw new NotExistError();
    }

    return moderators[0];
  });

  addModerator = jest.fn(async (mod) => {
    const { mod_phoneNumber, mod_id, mod_username } = moderators[0];
    if (
      mod == undefined ||
      mod.mod_phoneNumber == mod_phoneNumber ||
      mod.mod_id == mod_id ||
      mod.mod_username == mod_username
    ) {
      throw new NotValidError();
    }

    return mod;
  });

  updateModerator = jest.fn(async (m_no, mod) => {
    const { mod_phoneNumber, mod_id, mod_username } = moderators[0];
    if (m_no == -1 || mod == undefined) {
      throw new NotValidError();
    }

    if (
      (mod.mod_phoneNumber == mod_phoneNumber ||
        mod.mod_id == mod_id ||
        mod.mod_username == mod_username) &&
      m_no != moderators[0].mod_no
    ) {
      throw new ExistError();
    }

    const rs = moderators.find((x) => x.mod_no == m_no);
    if (rs == undefined) {
      throw new NotExistError();
    }
  });

  lockModerator = jest.fn(async (m_no) => {
    await this.getModeratorByNo(m_no);
  });
}
//#endregion

let processorMock;

function getController() {
  return new ModeratorsController(processorMock);
}

//#region  GET

// 200 - 400 - 404
describe("Ctrlr Lấy ra danh sách quản trị viên", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
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
});

// 200 - 400 - 404
describe("Ctrlr Lấy ra quản trị viên theo mã", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
  });

  test("Lấy ra quản trị viên theo mã - 200", async () => {
    //Arrange
    const controller = getController();
    const mod = moderators[0];
    const { mod_no } = mod;
    const reqMock = { params: { mod_no } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: mod };
    const actRes = await controller.getModeratorByNo(reqMock, resMock);

    //Assert
    expect(actRes).toEqual(expRes);
    expect(resMock.json).toBeCalledTimes(1);
    expect(processorMock.getModeratorByNo).toBeCalledTimes(1);
  });
});

// 200 - 400 - 404
describe("Ctrlr Lấy ra quản trị viên theo số điện thoại", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
  });

  test("Lấy ra theo số điện thoại - 200", async () => {
    //Arrange
    const controller = getController();
    const mod = moderators[0];
    const { mod_phoneNumber } = mod;
    const reqMock = { params: { mod_phoneNumber } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: mod };
    const actRes = await controller.getModeratorByPhoneNumber(reqMock, resMock);

    //Assert
    expect(actRes).toEqual(expRes);
    expect(processorMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 200 - 400 - 404
describe("Ctrlr Lấy ra quản trị viên theo CMND", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
  });

  test("CMND hợp lệ - 200", async () => {
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
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getModeratorByMod_Id).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 200 - 400 - 404
describe("Ctrlr Lấy ra quản trị viên theo tài khoản", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
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
    expect(actRes).toEqual(expRes);
    expect(processorMock.getModeratorByUsername).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

//#endregion

// 201 - 400
describe("Ctrlr Thêm quản trị viên", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
  });

  test("Thêm thành công - 201", async () => {
    //Arrange
    const moderator = {
      ...moderators[0],
      mod_id: "111111119",
      mod_phoneNumber: "5555555555",
      mod_username: "wtf",
      mod_id: "33",
    };

    const controller = getController();

    const reqMock = { body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201, body: moderator };
    const actRes = await controller.addModerator(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.addModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 204 - 400 - 404
describe("Ctrlr Sửa thông tin quản trị viên", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
  });

  test("Cập nhật thành công - 204", async () => {
    //Arrange
    const moderator = moderators[0];
    const { mod_no } = moderator;
    const controller = getController();

    const reqMock = { params: { mod_no }, body: moderator };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 204, body: {} };
    const actRes = await controller.updateModerator(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.updateModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

describe("Ctrlr Khóa tài khoản quản trị viên", () => {
  beforeEach(() => {
    processorMock = new ModeratorsProcessorMock();
  });

  test("Khóa thành công - 204", async () => {
    //Arrange
    const mod_no = 1;
    const controller = getController();

    const reqMock = { params: { mod_no } };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 204, body: undefined };
    const actRes = await controller.lockModerator(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.lockModerator).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});
