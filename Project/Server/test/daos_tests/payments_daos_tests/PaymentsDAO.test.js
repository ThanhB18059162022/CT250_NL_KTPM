const PaymentsDAO = require("../../../app/daos/payments_daos/PaymentsDAO");
const { NotExistError } = require("../../../app/errors/errorsContainer");

//#region INIT

class MySQLDAOMock {
  query = jest.fn(async (sql, params) => {
    if (sql.includes("WHERE p.prod_no = pd.prod_no AND p.prod_no = ?")) {
      if (params[0] == 1 && params[1] == 1) {
        return [{}];
      }
    }

    if (sql.includes("SELECT * FROM Orders")) {
      if (params[0] == 1) {
        return [{}];
      }
    }

    return [];
  });

  excute = jest.fn();
}

//#region

let sqldao;
function getDAO() {
  return new PaymentsDAO(sqldao);
}

describe("DAO Lấy ra sản phẩm với giá", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const prod_no = 1;
    const pd_no = 3;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getOrderProduct({ prod_no, pd_no });
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const prod_no = 1;
    const pd_no = 1;
    const dao = getDAO();

    //Act
    const expRs = {
      prod_price: undefined,
      prod_quantity: undefined,
    };
    const actRs = await dao.getOrderProduct({ prod_no, pd_no });

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Lưu đơn hàng CSDL", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Thành công", async () => {
    //Arrange
    const order = {};
    const dao = getDAO();

    //Act
    const expRs = order;
    const actRs = await dao.saveOrder(order);

    //Expect
    // expect(actRs).toEqual(expRs);
    // expect(sqldao.excute).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra đơn hàng trong CSDL", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const id = 404;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getSaveOrder(id);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const id = 1;
    const dao = getDAO();

    //Act
    const expRs = {};
    const actRs = await dao.getSaveOrder(id);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});
