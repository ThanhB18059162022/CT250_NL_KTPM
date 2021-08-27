const ProductsController = require("../../app/controllers/ProductsController");

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

describe("Test các api endpoints của products controller", () => {
  test("Lấy danh sách sản phẩm", async () => {
    //Arrange
    const products = getMockProducts();
    const daoMock = {
      getProducts: jest.fn(() => Promise.resolve(products)),
    };

    const response = { statusCode: 200, products };
    const resMock = {
      json: jest.fn(() => Promise.resolve(response)),
    };

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
    const product = getMockProducts()[0];

    const daoMock = {
      getProductByNo: jest.fn(() => Promise.resolve(product)),
    };

    const requestMock = {
      params: {
        pro_no: product.pro_no,
      },
    };

    const response = { statusCode: 200, products: product };
    const resMock = {
      json: jest.fn(() => Promise.resolve(response)),
    };

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
});
