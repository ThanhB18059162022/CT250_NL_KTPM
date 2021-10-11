const ProductsDAO = require("../../../app/daos/products_daos/ProductsDAO");
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
  {
    prod_name: "Sam sung",
    prod_mfg: "2021",
    prod_releaseDate: new Date(),
    prod_screen: "blank",
    prod_camera: "32mp",
    prod_no: 2,
  },
];

class MySQLDAOMock {
  query = jest.fn(async (sql, params) => {
    if (sql.includes("SELECT * FROM Products WHERE prod_no = ?;")) {
      return PRODUCTS.filter((p) => p.prod_no == params[0]);
    }

    if (sql.includes("SELECT * FROM Products_Details WHERE prod_no = ?")) {
      if (params[0] == PRODUCTS[0].prod_no) {
        return [{}];
      }
    }

    if (sql.includes("SELECT * FROM Products WHERE prod_name = ?;")) {
      return PRODUCTS.filter((p) => p.prod_name == params[0]);
    }

    if (sql.includes(`pd.pd_price`)) {
      return PRODUCTS;
    }

    if (sql.includes("SELECT * FROM Products LIMIT")) {
      return PRODUCTS;
    }

    return [];
  });

  execute = jest.fn((sql, params) => {
    if (params[0] == "error đây") {
      throw new Error();
    }

    if (sql.includes("INSERT INTO Products")) {
      const nameP = PRODUCTS.filter((p) => p.prod_name == params[0])[0];
      if (nameP != undefined) {
        const mysqlError = new Error();
        mysqlError.code = "ER_DUP_ENTRY";
        mysqlError.sqlMessage = "`prod_name`";

        throw mysqlError;
      }
      PRODUCTS.push({ ...PRODUCTS[0], prod_name: params[0] });
    }

    if (sql.includes("UPDATE Products")) {
      const nameP = PRODUCTS.filter((p) => p.prod_name == params[0])[0];
      if (nameP != undefined && params[params.length - 1] != nameP.prod_no) {
        const mysqlError = new Error();
        mysqlError.code = "ER_DUP_ENTRY";
        mysqlError.sqlMessage = "prod_name";

        throw mysqlError;
      }
    }
  });
}

class ProductConverterServiceMock {
  toProduct = jest.fn((p) => p);

  toProducts = jest.fn((p) => p);

  toDbProduct = jest.fn((p) => p);
}

//#endregion

let sqldao;
let converter;
const getDAO = () => {
  return new ProductsDAO(sqldao, converter);
};

describe("DAO Lấy ra danh sách sản phẩm", () => {
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

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProducts).toBeCalledTimes(1);
  });

  test("Theo giá", async () => {
    //Arrange
    const dao = getDAO();
    const min = 0;
    const max = 100;

    //Act
    const expRs = PRODUCTS;
    const actRs = await dao.getProductsByPrice(min, max);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProducts).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra chi tiết của sản phẩm", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Không tồn tại", async () => {
    //Arrange
    const prod_no = 404;
    const dao = getDAO();

    //Act
    const expRs = [];
    const actRs = await dao.getProductDetails(prod_no);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const prod_no = 1;
    const dao = getDAO();

    //Act
    const expRs = [{}];
    const actRs = await dao.getProductDetails(prod_no);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.query).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra sản phẩm theo mã", () => {
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

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const prod_no = 1;
    const dao = getDAO();

    //Act
    await dao.getProductByNo(prod_no);

    //Expect
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProduct).toBeCalledTimes(1);
  });
});

describe("DAO Lấy ra sản phẩm theo tên", () => {
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

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Tồn tại", async () => {
    //Arrange
    const { prod_name } = PRODUCTS[0];
    const dao = getDAO();

    //Act
    await dao.getProductByName(prod_name);

    //Expect
    expect(sqldao.query).toBeCalledTimes(1);
    expect(converter.toProduct).toBeCalledTimes(1);
  });
});

describe("DAO Thêm sản phẩm", () => {
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

    //Expect
    console.log(actRs);
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Thành công", async () => {
    //Arrange
    const product = { ...PRODUCTS[0], prod_name: "P" };
    const dao = getDAO();

    //Act
    const expRs = product;
    const actRs = await dao.addProduct(product);

    //Expect
    expect(actRs).toEqual(expRs);
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Lỗi khác", async () => {
    //Arrange
    const product = { error: "error đây", ...PRODUCTS[0] };
    const dao = getDAO();

    //Act
    const expRs = Error;
    let actRs;
    try {
      await dao.addProduct(product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });
});

describe("DAO Thêm chi tiết sản phẩm", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Không tồn tại - EX", async () => {
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

    //Expect
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

    //Expect
    expect(sqldao.query).toBeCalledTimes(1);
    expect(sqldao.execute).toHaveBeenCalled();
  });
});

describe("DAO Sửa sản phẩm", () => {
  beforeEach(() => {
    sqldao = new MySQLDAOMock();
    converter = new ProductConverterServiceMock();
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const prod_no = 404;
    const dao = getDAO();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await dao.updateProduct(prod_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toBeCalledTimes(1);
  });

  test("Trùng tên - EX", async () => {
    //Arrange
    const prod_no = 2;
    const product = PRODUCTS[0];
    const dao = getDAO();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await dao.updateProduct(prod_no, product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.query).toHaveBeenCalled();
  });

  test("Thành công", async () => {
    //Arrange
    const prod_no = 1;
    const dao = getDAO();

    //Act
    await dao.updateProduct(prod_no, {});

    //Expect
    expect(sqldao.query).toHaveBeenCalled();
    expect(sqldao.execute).toBeCalledTimes(1);
  });

  test("Lỗi khác", async () => {
    //Arrange
    const product = { error: "error đây", ...PRODUCTS[0] };
    const dao = getDAO();

    //Act
    const expRs = Error;
    let actRs;
    try {
      await dao.updateProduct(1, product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(sqldao.execute).toBeCalledTimes(1);
  });
});
