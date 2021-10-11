const {
  NotValidError,
  NotExistError,
  ExistError,
} = require("../../../app/errors/errorsContainer");
const {
  ModeratorsProcessor,
} = require("../../../app/processors/processorsContainer");

// Kiểm tra các api end-points của quản trị viên

//#region  Init
const MODERATORS = [
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

  validateAddModerator = jest.fn((mod) => {
    return { hasAnyError: mod === undefined };
  });

  validateUpdateModerator = jest.fn((mod) => {
    return { hasAnyError: mod === undefined };
  });
}

class ModeratorDAOMock {
  emptyData = jest.fn((m) => {
    return m === undefined;
  });

  getModerators = jest.fn(async () => {
    return MODERATORS;
  });

  getModeratorByNo = jest.fn(async (mod_no) => {
    const m = MODERATORS.filter((m) => m.mod_no == mod_no)[0];
    if (m == undefined) {
      throw new NotExistError();
    }

    return m;
  });

  getModeratorByPhoneNumber = jest.fn(async (mod_phoneNumber) => {
    const m = MODERATORS.filter(
      (m) => m.mod_phoneNumber === mod_phoneNumber
    )[0];

    if (m == undefined) {
      throw new NotExistError();
    }

    return m;
  });

  getModeratorByMod_Id = jest.fn(async (mod_id) => {
    const m = MODERATORS.filter((m) => m.mod_id == mod_id)[0];

    if (m == undefined) {
      throw new NotExistError();
    }

    return m;
  });

  getModeratorByUsername = jest.fn(async (mod_username) => {
    const m = MODERATORS.filter((m) => m.mod_username === mod_username)[0];

    if (m == undefined) {
      throw new NotExistError();
    }

    return m;
  });

  addModerator = jest.fn(async (mod) => {
    const m_p = MODERATORS.filter(
      (m) => m.mod_phoneNumber == mod.mod_phoneNumber
    )[0];
    if (m_p != undefined) {
      throw new ExistError();
    }

    const m_id = MODERATORS.filter((m) => m.mod_id == mod.mod_id)[0];
    if (m_id != undefined) {
      throw new ExistError();
    }

    const m_usr = MODERATORS.filter(
      (m) => m.mod_username == mod.mod_username
    )[0];
    if (m_usr != undefined) {
      throw new ExistError();
    }

    return mod;
  });

  updateModerator = jest.fn(async (mod_no, mod) => {
    const m_p = MODERATORS.filter(
      (m) => m.mod_phoneNumber == mod.mod_phoneNumber
    )[0];
    if (m_p != undefined && mod_no != m_p.mod_no) {
      throw new ExistError();
    }

    const m_id = MODERATORS.filter((m) => m.mod_id == mod.mod_id)[0];
    if (m_id != undefined && mod_no != m_id.mod_no) {
      throw new ExistError();
    }
  });

  lockModerator = jest.fn();
}
//#endregion

let daoMock;
let validatorMock;

function getProcessor() {
  return new ModeratorsProcessor(validatorMock, daoMock);
}

//#region  GET

describe("Proc Lấy ra danh sách quản trị viên", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Lấy ra danh sách quản trị viên ", async () => {
    //Arrange
    const processor = getProcessor();
    const query = {};
    //Act
    const expRs = { items: MODERATORS };
    const actRs = await processor.getModerators(query);

    //Assert
    expect(actRs).toEqual(expRs);
    expect(daoMock.getModerators).toBeCalledTimes(1);
  });
});

describe("Proc Lấy chi tiết quản trị viên theo mã", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Theo mã không hợp lệ - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_no = -1;

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getModeratorByNo(mod_no);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Mã không tồn tại - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_no = 666;

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getModeratorByNo(mod_no);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Lấy ra quản trị viên theo mã ", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_no = 1;

    const mod = await daoMock.getModeratorByNo(mod_no);
    // Xóa để lời gọi hàm trong processor còn 1
    daoMock.getModeratorByNo.mockClear();

    //Act
    const expRs = mod;
    const actRs = await processor.getModeratorByNo(mod_no);

    //Assert
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
  });
});

describe("Proc Lấy quản trị viên theo số điện thoại", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_phoneNumber = "";

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getModeratorByPhoneNumber(mod_phoneNumber);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validatePhoneNumber).toBeCalledTimes(1);
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_phoneNumber = "0000000002";

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getModeratorByPhoneNumber(mod_phoneNumber);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validatePhoneNumber).toBeCalledTimes(1);
  });

  test("Lấy ra quản trị viên theo số điện thoại ", async () => {
    //Arrange
    const processor = getProcessor();
    const mod = MODERATORS[0];
    const { mod_phoneNumber } = mod;

    //Act
    const expRs = mod;
    const actRs = await processor.getModeratorByPhoneNumber(mod_phoneNumber);

    //Assert
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validatePhoneNumber).toBeCalledTimes(1);
    expect(daoMock.getModeratorByPhoneNumber).toBeCalledTimes(1);
  });
});

describe("Proc Lấy quản trị viên theo CMND", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_id = "";

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getModeratorByMod_Id(mod_id);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateMod_Id).toBeCalledTimes(1);
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_id = "0000000000";

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getModeratorByMod_Id(mod_id);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateMod_Id).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
  });

  test("Lấy ra quản trị viên theo CMND hợp lệ ", async () => {
    //Arrange
    const processor = getProcessor();
    const mod = MODERATORS[0];
    const { mod_id } = mod;

    //Act
    const expRs = mod;
    const actRs = await processor.getModeratorByMod_Id(mod_id);

    //Assert
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateMod_Id).toBeCalledTimes(1);
    expect(daoMock.getModeratorByMod_Id).toBeCalledTimes(1);
  });
});

describe("Proc Lấy ra quản trị viên theo tài khoản", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("không hợp lệ - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_username = "";

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getModeratorByUsername(mod_username);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateUsername).toBeCalledTimes(1);
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const mod_username = "wtf";

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getModeratorByUsername(mod_username);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateUsername).toBeCalledTimes(1);
    expect(daoMock.getModeratorByUsername).toBeCalledTimes(1);
  });

  test("Tài khoản hợp lệ ", async () => {
    //Arrange
    const processor = getProcessor();
    const mod = MODERATORS[0];
    const { mod_username } = mod;

    //Act
    const expRs = mod;
    const actRs = await processor.getModeratorByUsername(mod_username);

    //Assert
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateUsername).toBeCalledTimes(1);
    expect(daoMock.getModeratorByUsername).toBeCalledTimes(1);
  });
});

//#endregion

describe("Proc Thêm quản trị viên", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const moderator = undefined;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.addModerator(moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateAddModerator).toBeCalledTimes(1);
  });

  test("Trùng số điện thoại - EX", async () => {
    //Arrange
    const moderator = MODERATORS[0];

    const processor = getProcessor();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await processor.addModerator(moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateAddModerator).toBeCalledTimes(1);
  });

  test("Trùng số CMND - EX", async () => {
    //Arrange
    const moderator = {
      ...MODERATORS[0],
      mod_phoneNumber: "555555555",
      mod_username: "aaa",
    };

    const processor = getProcessor();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await processor.addModerator(moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateAddModerator).toBeCalledTimes(1);
  });

  test("Trùng tài khoản - EX", async () => {
    //Arrange
    const moderator = {
      ...MODERATORS[0],
      mod_phoneNumber: "555555555",
      mod_id: "11",
    };

    const processor = getProcessor();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await processor.addModerator(moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateAddModerator).toBeCalledTimes(1);
  });

  test("Thêm thành công ", async () => {
    //Arrange
    const moderator = {
      mod_id: "111111119",
      mod_phoneNumber: "5555555555",
      mod_username: "Alex",
    };

    const processor = getProcessor();

    //Act
    const expRs = moderator;
    const actRs = await processor.addModerator(moderator);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateAddModerator).toBeCalledTimes(1);
  });
});

describe("Proc Sửa thông tin quản trị viên", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Thông tin không hợp lệ - EX", async () => {
    //Arrange
    const mod_no = 1;
    const moderator = undefined;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;

    let actRs;
    try {
      await processor.updateModerator(mod_no, moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateUpdateModerator).toBeCalledTimes(1);
  });

  test("Mã quản trị không hợp lệ - EX", async () => {
    //Arrange
    const mod_no = -1;
    const moderator = {};

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;

    let actRs;
    try {
      await processor.updateModerator(mod_no, moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Mã quản trị không tồn tại - EX", async () => {
    //Arrange
    const mod_no = 666;
    const moderator = {};

    const processor = getProcessor();

    //Act
    const expRs = NotExistError;

    let actRs;
    try {
      await processor.updateModerator(mod_no, moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
  });

  test("Số điện thoại đã tồn tại - EX", async () => {
    //Arrange
    const mod_no = 2;
    const moderator = { ...MODERATORS[0], mod_id: "aa" };

    const processor = getProcessor();

    //Act
    const expRs = ExistError;

    let actRs;
    try {
      await processor.updateModerator(mod_no, moderator);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
  });

  test("Số CMND đã tồn tại - EX", async () => {
    //Arrange
    const mod_no = 2;
    const { mod_phoneNumber } = MODERATORS[1];
    const newInfo = { ...MODERATORS[0], mod_phoneNumber };
    const processor = getProcessor();

    //Act
    const expRs = ExistError;

    let actRs;
    try {
      await processor.updateModerator(mod_no, newInfo);
    } catch (error) {
      actRs = error;
    }

    //Expect
    console.log(actRs);
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
  });

  test("Cập nhật thông tin cũ", async () => {
    //Arrange
    const mod_no = 1;
    const moderator = {
      ...MODERATORS[0],
    };

    const processor = getProcessor();

    //Act
    await processor.updateModerator(mod_no, moderator);

    //Expect
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateUpdateModerator).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
    expect(daoMock.updateModerator).toBeCalledTimes(1);
  });
});

// 204 - EX - EX
describe("Proc Khóa tài khoản quản trị viên theo mã", () => {
  beforeEach(() => {
    validatorMock = new ModeratorValidatorMock();
    daoMock = new ModeratorDAOMock();
  });

  test("Mã quản trị không hợp lệ - EX", async () => {
    //Arrange
    const mod_no = -1;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.lockModerator(mod_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Quản trị viên không tồn tại - EX", async () => {
    //Arrange
    const mod_no = 666;

    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.lockModerator(mod_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Khóa thành công", async () => {
    //Arrange
    const mod_no = 1;

    const processor = getProcessor();

    //Act
    await processor.lockModerator(mod_no);

    //Expect
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getModeratorByNo).toBeCalledTimes(1);
    expect(daoMock.lockModerator).toBeCalledTimes(1);
  });
});
