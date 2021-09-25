const ProductsController = require("../../../app/controllers/products_controllers/ProductsController");
const { ResponseMock } = require("../controllerTestHelper");

//#region Init

class ProductsDAOMock {
  static products = [
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

  getProducts = jest.fn(async (startIndex, endIndex) =>
    ProductsDAOMock.products.slice(startIndex, endIndex)
  );

  getProductsByPrice = jest.fn(async (min, max, startIndex, endIndex) =>
    ProductsDAOMock.products.slice(startIndex, endIndex)
  );

  getProductByNo = jest.fn(async (prod_no) => {
    const product = ProductsDAOMock.products.filter(
      (p) => p.prod_no === prod_no
    )[0];

    return product;
  });

  getProductByName = jest.fn(async (prod_name) => {
    const product = ProductsDAOMock.products.filter(
      (p) => p.prod_name === prod_name
    )[0];

    return product;
  });

  // Trả về prod_no
  addProduct = jest.fn(async (newProduct) => {
    ProductsDAOMock.products.push(newProduct);

    return ProductsDAOMock.products.length;
  });

  updateProduct = jest.fn();

  emptyProduct = jest.fn((product) => {
    return product === undefined;
  });
}

class ProductsValidatorMock {
  validateProduct = jest.fn((product) => {
    return { hasAnyError: product === undefined };
  });

  validateNo = jest.fn((prod_no) => {
    return { hasAnyError: Number.isNaN(prod_no) || prod_no < 0 };
  });

  // Kiểm tra tên hợp lệ
  validateName = jest.fn((prod_name) => {
    return { hasAnyError: prod_name === undefined };
  });
}

//#endregion

// Test các api endpoints của products controller

let daoMock;
let validatorMock;

function getController() {
  return new ProductsController(validatorMock, daoMock);
}
// 200
describe("List Lấy danh sách sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  // next và previous là 2 biến chỉ số trang trước và sau trang hiện tại
  // có tối đa 5 phần tử

  test("Lấy danh sách sản phẩm mặc định (200) - không query params", async () => {
    //Arrange
    const products = ProductsDAOMock.products;
    const page = 1;
    const limit = 24;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const reqMock = {
      query: {},
    };

    const response = {
      statusCode: 200,
      body: { items: products },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProducts).toBeCalledTimes(1);
    expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products });
  });

  test("Lấy danh sách sản phẩm (200) chỉ có next", async () => {
    //Arrange
    const products = ProductsDAOMock.products;
    const page = 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const reqMock = {
      query: { page, limit },
    };

    const next = { page: page + 1, limit };
    const response = {
      statusCode: 200,
      body: { items: products, next },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRes.length);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProducts).toBeCalledTimes(1);
    expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products, next });
  });

  test("Lấy danh sách sản phẩm (200) có thêm previous - trang 2 lấy 2", async () => {
    //Arrange
    const page = 2;
    const limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { page, limit },
    };

    const next = { page: page + 1, limit };
    const previous = { page: page - 1, limit };
    const response = {
      statusCode: 200,
      body: { items: products, next, previous },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRes.length);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProducts).toBeCalledTimes(1);
    expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products, next, previous });
  });

  test("Lấy danh sách sản phẩm (200) không có next - lấy các phần tử cuối", async () => {
    //Arrange
    const page = 2;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { page, limit },
    };

    const previous = { page: page - 1, limit };
    const response = {
      statusCode: 200,
      body: { items: products, previous },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRes.length);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProducts).toBeCalledTimes(1);
    expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products, previous });
  });

  test("Lấy danh sách theo mức giá (200) - không query params", async () => {
    //Arrange
    const products = ProductsDAOMock.products;
    const min = 0;
    const max = Number.MAX_SAFE_INTEGER;
    const page = 1;
    const limit = 24;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const reqMock = {
      query: {},
    };

    const response = {
      statusCode: 200,
      body: { items: products },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductsByPrice(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
    expect(daoMock.getProductsByPrice).toBeCalledWith(
      min,
      max,
      startIndex,
      endIndex
    );

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products });
  });

  test("Lấy danh sách sản phẩm theo mức giá (200) - min không phải số ", async () => {
    //Arrange
    const max = 100;
    const min = "wtf";
    const page = 2;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { max, min, page, limit },
    };

    const previous = { page: page - 1, limit };
    const response = {
      statusCode: 200,
      body: { items: products, previous },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductsByPrice(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRes.length);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
    expect(daoMock.getProductsByPrice).toBeCalledWith(
      0,
      max,
      startIndex,
      endIndex
    );

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products, previous });
  });

  test("Lấy danh sách sản phẩm theo mức giá (200) - max không phải là số ", async () => {
    //Arrange
    const max = "wtf";
    const min = 10;
    const page = 2;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { max, min, page, limit },
    };

    const previous = { page: page - 1, limit };
    const response = {
      statusCode: 200,
      body: { items: products, previous },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductsByPrice(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRes.length);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
    expect(daoMock.getProductsByPrice).toBeCalledWith(
      min,
      0,
      startIndex,
      endIndex
    );

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products, previous });
  });

  test("Lấy danh sách sản phẩm theo mức giá (200) ", async () => {
    //Arrange
    const max = 100;
    const min = 10;
    const page = 2;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { max, min, page, limit },
    };

    const previous = { page: page - 1, limit };
    const response = {
      statusCode: 200,
      body: { items: products, previous },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductsByPrice(reqMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRes.length);
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
    expect(daoMock.getProductsByPrice).toBeCalledWith(
      min,
      max,
      startIndex,
      endIndex
    );

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ items: products, previous });
  });
});

// 200 - 400 - 404
describe("Lấy chi tiết sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Lấy sản phẩm theo mã (200)", async () => {
    //Arrange
    const product = ProductsDAOMock.products[0];

    const requestMock = {
      params: {
        prod_no: product.prod_no,
      },
    };

    const response = { statusCode: 200, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(product.prod_no);

    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo mã - mã không hợp lệ prod_no âm (400)", async () => {
    //Arrange
    const prod_no = -1;
    const product = undefined;

    const requestMock = {
      params: {
        prod_no,
      },
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(prod_no);

    expect(daoMock.getProductByNo).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy sản phẩm theo mã - mã không hợp lệ prod_no không phải int (400)", async () => {
    //Arrange
    const prod_no = "wtf";
    const product = undefined;

    const requestMock = {
      params: {
        prod_no,
      },
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);

    expect(daoMock.getProductByNo).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy sản phẩm theo mã - không tồn tại (404)", async () => {
    //Arrange
    const prod_no = 666;
    const product = {};

    const requestMock = {
      params: {
        prod_no,
      },
    };

    const response = { statusCode: 404, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByNo(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(prod_no);

    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(prod_no);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo tên (200)", async () => {
    //Arrange
    const product = ProductsDAOMock.products[0];
    const prod_name = product.prod_name;

    const requestMock = {
      params: {
        prod_name,
      },
    };

    const response = { statusCode: 200, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateName).toBeCalledTimes(1);
    expect(validatorMock.validateName).toBeCalledWith(prod_name);

    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledWith(prod_name);

    expect(resMock.status).toBeCalledTimes(0);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo tên - không hợp lệ (400)", async () => {
    //Arrange
    const product = undefined;
    const prod_name = undefined;

    const requestMock = {
      params: {
        prod_name,
      },
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateName).toBeCalledTimes(1);
    expect(validatorMock.validateName).toBeCalledWith(prod_name);

    expect(daoMock.getProductByName).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy sản phẩm theo tên - không tồn tại (404)", async () => {
    //Arrange
    const product = {};
    const prod_name = "nope";

    const requestMock = {
      params: {
        prod_name,
      },
    };

    const response = { statusCode: 404, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledWith(prod_name);

    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledWith(prod_name);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith(product);
  });
});

// 201 - 400
describe("Thêm sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Thêm sản phẩm (201) - trả về sản phẩm mới thêm cùng prod_no", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0], prod_no: 0 };
    let newProd_no = ProductsDAOMock.products.length + 1;
    product.prod_name += "aa";

    const requestMock = {
      body: product,
    };

    const response = {
      statusCode: 201,
      body: { ...product, prod_no: newProd_no },
    };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.addProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledWith(product.prod_name);

    expect(daoMock.addProduct).toBeCalledTimes(1);
    expect(daoMock.addProduct).toBeCalledWith(product);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ ...product, prod_no: newProd_no });
  });

  test("Thêm sản phẩm - trùng tên (400)", async () => {
    //Arrange
    const product = ProductsDAOMock.products[0];

    const requestMock = {
      body: product,
    };

    const response = { statusCode: 400, body: undefined };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.addProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.statusCode).toEqual(expRes.statusCode);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledWith(product.prod_name);

    expect(daoMock.addProduct).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Thêm sản phẩm - không hợp lệ (400)", async () => {
    //Arrange
    let product = undefined;

    const requestMock = {
      body: product,
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.addProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    expect(daoMock.getProductByName).toBeCalledTimes(0);
    expect(daoMock.addProduct).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 204 - 400 - 404
describe("Sửa sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Sửa sản phẩm đổi tên (204)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };

    product.prod_name += "new";

    const requestMock = {
      params: { prod_no: product.prod_no },
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

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(product.prod_no);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledWith(product.prod_name);

    expect(daoMock.updateProduct).toBeCalledTimes(1);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({});
  });

  test("Sửa sản phẩm - trùng tên trùng id (200)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };

    const requestMock = {
      params: { prod_no: product.prod_no },
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

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(product.prod_no);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    expect(daoMock.updateProduct).toBeCalledTimes(1);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({});
  });

  test("Sửa sản phẩm - trùng tên khác id (400)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };
    let productDup = { ...ProductsDAOMock.products[1] };

    product.prod_name = productDup.prod_name;

    const requestMock = {
      params: { prod_no: product.prod_no },
      body: product,
    };

    const response = { statusCode: 400, body: undefined };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.updateProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.statusCode).toEqual(expRes.statusCode);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(product.prod_no);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Sửa sản phẩm - không tồn tại (404)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };

    product.prod_no = 666;

    const requestMock = {
      params: { prod_no: product.prod_no },
      body: product,
    };

    const response = { statusCode: 404, body: {} };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.updateProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(product.prod_no);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    expect(daoMock.getProductByName).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({});
  });

  test("Sửa sản phẩm - model không hợp lệ (400)", async () => {
    //Arrange
    const product = undefined;
    const prod_no = 1;

    const requestMock = {
      params: { prod_no },
      body: product,
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.updateProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(prod_no);

    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    expect(daoMock.getProductByNo).toBeCalledTimes(0);

    // Kiểm tra trùng tên
    expect(daoMock.getProductByName).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Sửa sản phẩm - prod_no không hợp lệ (400)", async () => {
    //Arrange
    const product = undefined;
    const prod_no = -1;

    const requestMock = {
      params: { prod_no },
      body: product,
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.updateProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(prod_no);

    expect(validatorMock.validateProduct).toBeCalledTimes(0);

    // Kiểm tra tồn tại
    expect(daoMock.getProductByNo).toBeCalledTimes(0);

    // Kiểm tra trùng tên
    expect(daoMock.getProductByName).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 204 - 400 - 404
describe("Xóa sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Xóa sản phẩm - 204", async () => {
    //Arrange
    const product = { ...ProductsDAOMock.products[0] };

    const requestMock = {
      params: product,
    };

    const response = { statusCode: 204, body: {} };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.deleteProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(product.prod_no);

    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({});
  });

  test("Xóa sản phẩm - không tồn tại - 404", async () => {
    //Arrange
    const prod_no = 666;

    const requestMock = {
      params: { prod_no },
    };

    const response = { statusCode: 404, body: {} };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.deleteProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(prod_no);

    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledWith(prod_no);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({});
  });

  test("Xóa sản phẩm - không hợp lệ - 400", async () => {
    //Arrange
    const prod_no = -1;

    const requestMock = {
      params: { prod_no },
    };

    const response = { statusCode: 400, body: undefined };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.deleteProduct(requestMock, resMock);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes).toEqual(expRes);

    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledWith(prod_no);

    expect(daoMock.getProductByNo).toBeCalledTimes(0);

    expect(resMock.status).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});
