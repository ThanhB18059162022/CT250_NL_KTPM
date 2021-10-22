const ProductsController = require("../../../app/controllers/products_controllers/ProductsController");
const {
  NotValidError,
  NotExistError,
  ExistError,
} = require("../../../app/errors/errorsContainer");
const { ResponseMock } = require("../controllerTestHelper");

//#region Init

products = [
  {
    prod_no: 1,
    prod_name: "Xiaomi mi-10",
    prod_mfg: "2021",
    prod_releaseDate: new Date(),
    prod_screen: "blank",
    prod_camera: "32mp",
  },
  {
    prod_no: 2,
    prod_name: "Xiaomi mi-15",
    prod_mfg: "2021",
    prod_releaseDate: "2021",
    prod_screen: "blank",
    prod_camera: "64mp",
  },
  {
    prod_no: 3,
    prod_name: "Xiaomi",
    prod_mfg: "2021",
    prod_releaseDate: "2021",
    prod_screen: "blank",
    prod_camera: "64mp",
  },
  {
    prod_no: 4,
    prod_name: "Xiaomi mi-11",
    prod_mfg: "2021",
    prod_releaseDate: "2021",
    prod_screen: "blank",
    prod_camera: "64mp",
  },
  {
    prod_no: 5,
    prod_name: "Xiaomi mi-12",
    prod_mfg: "2021",
    prod_releaseDate: "2021",
    prod_screen: "blank",
    prod_camera: "64mp",
  },
];
class ProductsProcessorMock {
  getProducts = jest.fn(async (startIndex, endIndex) => ({
    items: products.slice(startIndex, endIndex),
  }));

  getProductsByPrice = jest.fn(
    async (min, max, startIndex, endIndex) =>
      await this.getProducts(startIndex, endIndex)
  );

  getProductByNo = jest.fn(async (prod_no) => {
    if (prod_no == undefined) {
      throw new NotValidError();
    }
    if (prod_no != products[0].prod_no) {
      throw new NotExistError();
    }

    return products[0];
  });

  // Copy
  getProductByName = jest.fn(async (prod_name) => {
    return await this.getProductByNo(prod_name);
  });

  getFeedback = jest.fn();

  // Trả về prod_no
  addProduct = jest.fn(async (newProduct) => {
    if (newProduct == undefined) {
      throw new NotValidError();
    }

    if (newProduct.prod_name == products[0].prod_name) {
      throw new ExistError();
    }

    return newProduct;
  });

  addProductDetails = jest.fn(async (prod_no, details) => {
    if (details == undefined) {
      throw new NotValidError();
    }

    if (prod_no != 1) {
      throw new NotExistError();
    }
  });

  addFeedback = jest.fn(async (prod_no, details) => {
    if (details == undefined) {
      throw new NotValidError();
    }

    if (prod_no != 1) {
      throw new NotExistError();
    }
  });

  updateProduct = jest.fn(async (no, newInfo) => {
    if (newInfo == undefined || no == undefined) {
      throw new NotValidError();
    }

    const { prod_name, prod_no } = products[0];
    if (products.find((p) => p.prod_no == no) == undefined) {
      throw new NotExistError();
    }
    if (!(newInfo.prod_name == prod_name && no == prod_no)) {
      throw new ExistError();
    }
  });
}

//#endregion

// Test các api endpoints của products controller

let processorMock;

function getController() {
  return new ProductsController(processorMock);
}
// 200
describe("Ctrlr List Lấy danh sách sản phẩm", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Lấy danh sách sản phẩm mặc định - 200", async () => {
    //Arrange
    const prods = products;

    const reqMock = {
      query: {},
    };

    const response = {
      statusCode: 200,
      body: { items: prods },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);
    expect(processorMock.getProducts).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy danh sách theo mức giá - 200", async () => {
    //Arrange
    const prods = products;
    const reqMock = {
      query: {},
    };

    const response = {
      statusCode: 200,
      body: { items: prods },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductsByPrice(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);
    expect(processorMock.getProductsByPrice).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 200 - 400 - 404
describe("Ctrlr Lấy sản phẩm theo mã", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Thành công - 200", async () => {
    //Arrange
    const prod = products[0];
    const { prod_no } = prod;

    const requestMock = {
      params: {
        prod_no,
      },
    };

    const response = { statusCode: 200, body: prod };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);
    expect(processorMock.getProductByNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 200 - 400 - 404
describe("Ctrlr Lấy sản phẩm theo tên", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Thành công - 200", async () => {
    //Arrange
    const prod = products[0];
    const { prod_no: prod_name } = prod;

    const requestMock = {
      params: {
        prod_name,
      },
    };

    const response = { statusCode: 200, body: prod };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);
    expect(processorMock.getProductByName).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 200 - 400 - 404
describe("Ctrlr Lấy danh sách đánh giá của sản phẩm", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Trả về danh sách", async () => {
    //Arrange
    const prod_no = undefined;

    const requestMock = {
      params: {
        prod_no,
      },
    };

    const response = { statusCode: 200 };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getFeedback(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 201 - 400
describe("Ctrlr Thêm sản phẩm", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Thành công - 201", async () => {
    //Arrange
    let product = { ...products[0], prod_name: "Táo" };

    const requestMock = {
      body: product,
    };

    const response = { statusCode: 201, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.addProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);
    expect(processorMock.addProduct).toBeCalledTimes(1);
    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 201 - 400 - 404
describe("Ctrlr Thêm chi tiết sản phẩm", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Thành công - 204", async () => {
    //Arrange
    const details = {};

    const requestMock = {
      params: { prod_no: 1 },
      body: details,
    };

    const response = { statusCode: 204, body: details };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.addProductDetails(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.addProductDetails).toBeCalledTimes(1);
    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 201 - 400 - 404
describe("Ctrlr Thêm đánh giá", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Thành công - 201", async () => {
    //Arrange
    const details = {};

    const requestMock = {
      params: { prod_no: 1 },
      body: details,
    };

    const response = { statusCode: 201, body: details };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.addFeedback(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.addFeedback).toBeCalledTimes(1);
    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 204 - 400 - 404
describe("Ctrlr Sửa sản phẩm", () => {
  beforeEach(() => {
    processorMock = new ProductsProcessorMock();
  });

  test("Thành công - 204", async () => {
    //Arrange
    const product = products[0];
    const { prod_no } = product;

    const requestMock = {
      params: { prod_no },
      body: product,
    };

    const response = { statusCode: 204, body: {} };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.updateProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);
    expect(processorMock.updateProduct).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});
