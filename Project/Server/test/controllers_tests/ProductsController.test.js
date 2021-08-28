const ProductsController = require("../../app/controllers/ProductsController");

//#region Init

const getMockProducts = () => {
  return [
    {
      pro_no: 1,
      pro_name: "Xiaomi mi-10",
      pro_mfg: "2021",
      pro_releaseDate: new Date(),
      pro_screen: "blank",
      pro_camera: "32mp",
    },
    {
      pro_no: 2,
      pro_name: "Xiaomi mi-15",
      pro_mfg: "2021",
      pro_releaseDate: "2021",
      pro_screen: "blank",
      pro_camera: "64mp",
    },
  ];
};

class ProductsDAOMock {
  static products = [
    {
      pro_no: 1,
      pro_name: "Xiaomi mi-10",
      pro_mfg: "2021",
      pro_releaseDate: new Date(),
      pro_screen: "blank",
      pro_camera: "32mp",
    },
    {
      pro_no: 2,
      pro_name: "Xiaomi mi-15",
      pro_mfg: "2021",
      pro_releaseDate: "2021",
      pro_screen: "blank",
      pro_camera: "64mp",
    },
  ];

  getProducts = jest.fn(async () => ProductsDAOMock.products);

  getProductByNo = jest.fn(async (pro_no) => {
    const product = ProductsDAOMock.products.filter(
      (p) => p.pro_no === pro_no
    )[0];

    return product;
  });
}

class ResponseMock {
  constructor() {
    this.statusCode = 200;
  }

  status = jest.fn((statusCode) => {
    this.statusCode = statusCode;

    return this;
  });

  json = jest.fn(async (body) => {
    const { statusCode } = this;

    return { statusCode, body };
  });
}

//#endregion

describe("Test các api endpoints của products controller", () => {
  test("Lấy danh sách sản phẩm", async () => {
    //Arrange
    const products = ProductsDAOMock.products;
    const daoMock = new ProductsDAOMock();

    const response = { statusCode: 200, body: products };
    const resMock = new ResponseMock();

    const controller = new ProductsController(daoMock);

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(null, resMock);

    //Expect
    expect(expRes).toBeDefined();
    expect(expRes.length).toEqual(actRes.length);
    expect(expRes).toEqual(actRes);

    expect(daoMock.getProducts).toBeCalledTimes(1);
    expect(daoMock.getProducts).toBeCalledWith();

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith(products);
  });

  test("Lấy sản phẩm theo mã", async () => {
    //Arrange
    const daoMock = new ProductsDAOMock();
    const product = ProductsDAOMock.products[0];

    const requestMock = {
      params: {
        pro_no: product.pro_no,
      },
    };

    const response = { statusCode: 200, body: product };
    const resMock = new ResponseMock();

    const controller = new ProductsController(daoMock);

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(expRes).toBeDefined();
    expect(expRes).toEqual(actRes);

    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo mã - mã không hợp lệ", async () => {
    //Arrange
    const pro_no = -1;
    const product = undefined;

    const daoMock = new ProductsDAOMock();

    const requestMock = {
      params: {
        pro_no,
      },
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = new ProductsController(daoMock);

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(expRes).toBeDefined();
    expect(expRes).toEqual(actRes);

    // expect(daoMock.getProductByNo).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    // expect(resMock.status).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo mã - không tồn tại", async () => {
    //Arrange
    const pro_no = 666;
    const product = {};

    const daoMock = new ProductsDAOMock();

    const requestMock = {
      params: {
        pro_no,
      },
    };

    const response = { statusCode: 404, body: product };
    const resMock = new ResponseMock();

    const controller = new ProductsController(daoMock);

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(expRes).toBeDefined();
    expect(expRes).toEqual(actRes);

    // expect(daoMock.getProductByNo).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    // expect(resMock.status).toBeCalledWith(product);
  });
});
