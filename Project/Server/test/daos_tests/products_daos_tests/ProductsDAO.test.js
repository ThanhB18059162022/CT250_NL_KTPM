const { ProductsDAO } = require("../../../app/daos/daosContainer");
const {
  NotExistError,
  ExistError,
} = require("../../../app/errors/errorsContainer");

//#region INIT
const PRODUCTS = [
  {
    prod_name: "Xiaomi mi-10",
    prod_mfg: "2021",
    prod_releaseDate: new Date(),
    prod_screen: "blank",
    prod_camera: "32mp",
    prod_no: 1,
  },
];

class MySQLDAOMock {
  query = jest.fn(async (sql, params) => {
    if (sql.includes("SELECT * FROM Products WHERE prod_no = ?;")) {
      if (params[0] == 1) {
        return [PRODUCTS[0]];
      }
    }

    if (sql.includes("SELECT * FROM Products WHERE prod_name = ?;")) {
      return PRODUCTS.filter((p) => p.prod_name == params[0]);
    }

    if (sql.includes("SELECT * FROM Products LIMIT")) {
      return PRODUCTS;
    }

    return [];
  });

  execute = jest.fn((sql, params) => {
    if (sql.includes("INSERT INTO Products")) {
      PRODUCTS.push({ ...PRODUCTS[0], prod_name: params[0] });
    }
  });
}

class ProductConverterServiceMock {
  toProduct = jest.fn((p) => p);

  toProducts = jest.fn((p) => p);

  toDbProduct = jest.fn();
}

//#endregion

let sqldao;
let converter;
const getDAO = () => {
  return new ProductsDAO(sqldao, converter);
};

describe("Lấy ra danh sách sản phẩm", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Theo số lượng", async () => {
    //Arrange
    const dao = getDAO();

    //Act
    const expRs = PRODUCTS;
    const actRs = await dao.getProducts();

    //Assert
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProducts).toBeCalledTimes(1);
  });
});

describe("Lấy ra sản phẩm theo mã", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const prod_no = 404;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getProductByNo(prod_no);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const prod_no = 1;
    const dao = getDAO();

    //Act
    await dao.getProductByNo(prod_no);

    //Assert
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProduct).toBeCalledTimes(1);
  });
});

describe("Lấy ra sản phẩm theo tên", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const prod_name = "";
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.getProductByName(prod_name);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const { prod_name } = PRODUCTS[0];
    const dao = getDAO();

    //Act
    await dao.getProductByName(prod_name);

    //Assert
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProduct).toBeCalledTimes(1);
  });
});

describe("Thêm sản phẩm", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Trùng tên", async () => {
    //Arrange
    const product = PRODUCTS[0];
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.addProduct(product);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Thành công", async () => {
    //Arrange
    const product = { ...PRODUCTS[0], prod_name: "P" };
    const dao = getDAO();

    //Act
    const expRs = product;
    const actRs = await dao.addProduct(product);

    //Assert
    expect(actRs).toEqual(expRs);
  });
});

describe("Thêm chi tiết sản phẩm", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const prod_no = 404;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.addProductDetails(prod_no);
    } catch (error) {
      actRs = error;
    }

    //Assert
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Thêm thành công", async () => {
    //Arrange
    const prod_no = 1;
    const details = [{}, {}];
    const dao = getDAO();

    //Act
    await dao.addProductDetails(prod_no, details);

    //Assert
    expect(sqldao.query).toBeCalledTimes(1);
    expect(sqldao.execute).toHaveBeenCalled();
  });
});
