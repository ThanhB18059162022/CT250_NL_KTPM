const ModeratorsDAO = require("../../../app/daos/moderators_daos/ModeratorsDAO");
const {
  NotExistError,
  ExistError,
} = require("../../../app/errors/errorsContainer");

class ModeratorsDAOFake extends ModeratorsDAO {
  toDbModerator = jest.fn((p) => p);
}

//#region INIT
const MORDERATORS = [
  {
    mod_id: "555555550",
    mod_name: "Alexa",
    mod_phoneNumber: "0000000005",
    mod_sex: true,
    mod_address: "3/2 NK CT",
    mod_role: 0,
    mod_username: "alexader",
    mod_password: "123456",
    mod_no: 1,
  },
  {
    mod_id: "111111111",
    mod_name: "Alexa",
    mod_phoneNumber: "1111111111",
    mod_sex: true,
    mod_address: "3/2 NK CT",
    mod_role: 1,
    mod_username: "alexader",
    mod_password: "123456",
    mod_no: 2,
  },
];
class MySQLDAOMock {
  query = jest.fn(async (sql, params) => {
    if (sql.includes("SELECT * FROM Moderators WHERE mod_no = ?;")) {
      return MORDERATORS.filter((m) => m.mod_no == params[0]);
    }

    if (sql.includes("SELECT * FROM Moderators WHERE mod_phoneNumber = ?;")) {
      return MORDERATORS.filter((m) => m.mod_phoneNumber == params[0]);
    }

    if (sql.includes("SELECT * FROM Moderators WHERE mod_id = ?;")) {
      return MORDERATORS.filter((m) => m.mod_id == params[0]);
    }

    if (sql.includes("WHERE mod_username = ?")) {
      return MORDERATORS.filter((m) => m.mod_username == params[0]);
    }

    if (sql.includes("SELECT * FROM Moderators")) {
      return MORDERATORS;
    }
  });

  execute = jest.fn(async (sql, params) => {
    if (sql.includes("INSERT INTO Moderators")) {
      const m_p = MORDERATORS.filter((m) => m.mod_phoneNumber == params[2])[0];
      if (m_p != undefined) {
        throw new ExistError("Phone");
      }

      const m_id = MORDERATORS.filter((m) => m.mod_id == params[0])[0];
      if (m_id != undefined) {
        throw new ExistError("CMND");
      }

      const m_usr = MORDERATORS.filter((m) => m.mod_username == params[6])[0];
      if (m_usr != undefined) {
        throw new ExistError("User");
      }
    }

    if (sql.includes("UPDATE Moderators")) {
      const m_p = MORDERATORS.filter((m) => m.mod_phoneNumber == params[2])[0];
      if (m_p != undefined && params[params.length - 1] != m_p.mod_no) {
        throw new ExistError("Phone");
      }

      const m_id = MORDERATORS.filter((m) => m.mod_id == params[0])[0];
      if (m_id != undefined && params[params.length - 1] != m_id.mod_no) {
        throw new ExistError("CMND");
      }
    }
  });
}

//#endregion

let sqldao;
function getDAO() {
  return new ModeratorsDAOFake(sqldao);
}

function getDAONoEngine() {
  return new ModeratorsDAO();
}

describe("DAO Lấy ra danh sách quản trị", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Mặc định", async () => {
    //Arrange
    const dao = getDAO();

    //Act
    const expRs = MORDERATORS;
    const actRs = await dao.getModerators();

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra quản trị theo mã", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const mod_no = undefined;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getModeratorByNo(mod_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const mod = MORDERATORS[0];
    const dao = getDAO();

    //Act
    const expRs = mod;
    const actRs = await dao.getModeratorByNo(mod.mod_no);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra quản trị theo số điện thoại", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const mod_phoneNumber = undefined;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getModeratorByPhoneNumber(mod_phoneNumber);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const mod = MORDERATORS[0];
    const dao = getDAO();

    //Act
    const expRs = mod;
    const actRs = await dao.getModeratorByPhoneNumber(mod.mod_phoneNumber);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra quản trị theo số cmnd", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const mod_id = undefined;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getModeratorByMod_Id(mod_id);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const mod = MORDERATORS[0];
    const dao = getDAO();

    //Act
    const expRs = mod;
    const actRs = await dao.getModeratorByMod_Id(mod.mod_id);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra quản trị theo tài khoản", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const mod_username = undefined;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getModeratorByUsername(mod_username);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const mod = MORDERATORS[0];
    const dao = getDAO();

    //Act
    const expRs = mod;
    const actRs = await dao.getModeratorByUsername(mod.mod_username);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Thêm quản trị", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Trùng số điện thoại", async () => {
    //Arrange
    const mod = { ...MORDERATORS[0], mod_id: "AA", mod_username: "AA" };
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.addModerator(mod);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Trùng CMND", async () => {
    //Arrange
    const mod = {
      ...MORDERATORS[0],
      mod_phoneNumber: "No test",
      mod_username: "No test",
    };
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.addModerator(mod);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Trùng tài khoản", async () => {
    //Arrange
    const mod = {
      ...MORDERATORS[0],
      mod_phoneNumber: "No test",
      mod_id: "No test",
    };
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.addModerator(mod);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Thành công", async () => {
    //Arrange
    const mod = {
      ...MORDERATORS[0],
      mod_phoneNumber: "No test",
      mod_id: "No test",
      mod_username: "No test",
    };
    const dao = getDAO();

    //Act
    await dao.addModerator(mod);

    //Expect
    expect(sqldao.execute).toBeCalledTimes(1);
  });
});

describe("DAO Cập nhật quản trị", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Trùng số điện thoại", async () => {
    //Arrange
    const mod_no = 2;
    const mod = { ...MORDERATORS[0], mod_id: "AA", mod_username: "AA" };
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.updateModerator(mod_no, mod);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Trùng số CMND", async () => {
    //Arrange
    const mod_no = 2;
    const mod = {
      ...MORDERATORS[0],
      mod_phoneNumber: "AA",
      mod_username: "AA",
    };
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.updateModerator(mod_no, mod);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Hợp lệ", async () => {
    //Arrange
    const mod = MORDERATORS[0];

    const dao = getDAO();

    //Act
    await dao.updateModerator(mod.mod_no, mod);

    //Expect
    expect(sqldao.execute).toBeCalledTimes(1);
  });
});

describe("DAO Chuyển đổi", () => {
  test("Sang dbModerator", async () => {
    //Arrange
    const mod = {};
    const dao = getDAONoEngine();

    //Act
    dao.toDbModerator(mod);

    //Expect
  });
});
