const ProductsController = require("../../app/controllers/products_controllers/ProductsController");

//#region Init

class ProductsDAOMock {
  static products = [
    {
      prod_no: 1,
      pro_name: "Xiaomi mi-10",
      pro_mfg: "2021",
      pro_releaseDate: new Date(),
      pro_screen: "blank",
      pro_camera: "32mp",
    },
    {
      prod_no: 2,
      pro_name: "Xiaomi mi-15",
      pro_mfg: "2021",
      pro_releaseDate: "2021",
      pro_screen: "blank",
      pro_camera: "64mp",
    },
    {
      prod_no: 3,
      pro_name: "Xiaomi",
      pro_mfg: "2021",
      pro_releaseDate: "2021",
      pro_screen: "blank",
      pro_camera: "64mp",
    },
    {
      prod_no: 4,
      pro_name: "Xiaomi mi-11",
      pro_mfg: "2021",
      pro_releaseDate: "2021",
      pro_screen: "blank",
      pro_camera: "64mp",
    },
    {
      prod_no: 5,
      pro_name: "Xiaomi mi-12",
      pro_mfg: "2021",
      pro_releaseDate: "2021",
      pro_screen: "blank",
      pro_camera: "64mp",
    },
  ];

  getProducts = jest.fn(async (startIndex, endIndex) =>
    ProductsDAOMock.products.slice(startIndex, endIndex)
  );

  getProductByNo = jest.fn(async (prod_no) => {
    const product = ProductsDAOMock.products.filter(
      (p) => p.prod_no === prod_no
    )[0];

    return product;
  });

  getProductByName = jest.fn(async (pro_name) => {
    const product = ProductsDAOMock.products.filter(
      (p) => p.pro_name === pro_name
    )[0];

    return product;
  });

  // Trả về prod_no
  addProduct = jest.fn(async (newProduct) => {
    ProductsDAOMock.products.push(newProduct);

    return ProductsDAOMock.products.length;
  });
}

class ProductsValidatorMock {
  existProduct = jest.fn((product) => {
    return product !== undefined;
  });

  validProduct = jest.fn((product) => {
    return product !== undefined;
  });

  validNo = jest.fn((prod_no) => {
    return prod_no > 0;
  });

  // Kiểm tra tên hợp lệ
  validName = jest.fn((pro_name) => {
    return pro_name !== undefined;
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

// Chuyển expect của jest sang assert cho giống junit
const assert = expect;

// Test các api endpoints của products controller

let daoMock;
let validatorMock;

function getController() {
  return new ProductsController(daoMock, validatorMock);
}
// 200 - 400 -404
describe("Lấy sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  // next và previous là 2 biến chỉ số trang trước và sau trang hiện tại
  // có tối đa 5 phần tử

  test("Lấy danh sách sản phẩm (200) chỉ có next - không query params", async () => {
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes.length).toEqual(actRes.length);
    assert(expRes).toEqual(actRes);

    assert(daoMock.getProducts).toBeCalledTimes(1);
    assert(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({ items: products, next });
  });

  test("Lấy danh sách sản phẩm (200) có thêm previous - trang 2 lấy 2", async () => {
    //Arrange
    const page = 2;
    const limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { page, limit, startIndex, endIndex },
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes.length).toEqual(actRes.length);
    assert(expRes).toEqual(actRes);

    assert(daoMock.getProducts).toBeCalledTimes(1);
    assert(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({ items: products, next, previous });
  });

  test("Lấy danh sách sản phẩm (200) không có next - lấy các phần tử cuối", async () => {
    //Arrange
    const page = 2;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = ProductsDAOMock.products.slice(startIndex, endIndex);

    const reqMock = {
      query: { page, limit, startIndex, endIndex },
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes.length).toEqual(actRes.length);
    assert(expRes).toEqual(actRes);

    assert(daoMock.getProducts).toBeCalledTimes(1);
    assert(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({ items: products, previous });
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes).toEqual(actRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(product.prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(product);
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes).toEqual(actRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes).toEqual(actRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
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

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes).toEqual(actRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(prod_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo tên (200)", async () => {
    //Arrange
    const product = ProductsDAOMock.products[0];
    const pro_name = product.pro_name;

    const requestMock = {
      params: {
        pro_name,
      },
    };

    const response = { statusCode: 200, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validName).toBeCalledTimes(1);
    assert(validatorMock.validName).toBeCalledWith(product.pro_name);

    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByName).toBeCalledWith(pro_name);

    assert(resMock.status).toBeCalledTimes(0);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo tên - không hợp lệ (400)", async () => {
    //Arrange
    const product = undefined;
    const pro_name = undefined;

    const requestMock = {
      params: {
        pro_name,
      },
    };

    const response = { statusCode: 400, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validName).toBeCalledTimes(1);
    assert(validatorMock.validName).toBeCalledWith(pro_name);

    assert(daoMock.getProductByName).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
  });

  test("Lấy sản phẩm theo tên - không tồn tại (404)", async () => {
    //Arrange
    const product = {};
    const pro_name = "nope";

    const requestMock = {
      params: {
        pro_name,
      },
    };

    const response = { statusCode: 404, body: product };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProductByName(requestMock, resMock);

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByName).toBeCalledWith(pro_name);

    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByName).toBeCalledWith(pro_name);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(product);
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
    product.pro_name += "aa";

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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByName).toBeCalledWith(product.pro_name);

    assert(daoMock.addProduct).toBeCalledTimes(1);
    assert(daoMock.addProduct).toBeCalledWith(product);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({ ...product, prod_no: newProd_no });
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByName).toBeCalledWith(product.pro_name);

    assert(daoMock.addProduct).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    assert(daoMock.getProductByName).toBeCalledTimes(0);
    assert(daoMock.addProduct).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
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

    product.pro_name += "new";

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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(product.prod_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByName).toBeCalledWith(product.pro_name);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(product.prod_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
  });

  test("Sửa sản phẩm - trùng tên khác id (400)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };
    let productDup = { ...ProductsDAOMock.products[1] };

    product.pro_name = productDup.pro_name;

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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(product.prod_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(product.prod_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(validatorMock.validProduct).toBeCalledTimes(0);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
  });
});

// 204 - 400 - 404
describe("Xóa sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Xóa sản phẩm", async () => {
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(product.prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.prod_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
  });

  test("Xóa sản phẩm - không tồn tại", async () => {
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(prod_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
  });

  test("Xóa sản phẩm - không hợp lệ", async () => {
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

    //Assert
    assert(actRes).toBeDefined();
    assert(actRes).toEqual(expRes);

    assert(validatorMock.validNo).toBeCalledTimes(1);
    assert(validatorMock.validNo).toBeCalledWith(prod_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
  });
});
