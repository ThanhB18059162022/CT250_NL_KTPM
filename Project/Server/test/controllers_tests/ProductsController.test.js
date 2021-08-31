const ProductsController = require("../../app/controllers/products_controllers/ProductsController");

//#region Init

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

  getProductByName = jest.fn(async (pro_name) => {
    const product = ProductsDAOMock.products.filter(
      (p) => p.pro_name === pro_name
    )[0];

    return product;
  });
}

class ProductsValidatorMock {
  existProduct = jest.fn((product) => {
    return product !== undefined;
  });

  validProduct = jest.fn((product) => {
    return product !== undefined;
  });

  validNo = jest.fn((pro_no) => {
    return pro_no > 0;
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

  test("Lấy danh sách sản phẩm (200)", async () => {
    //Arrange
    const products = ProductsDAOMock.products;

    const response = { statusCode: 200, body: products };
    const resMock = new ResponseMock();

    const controller = getController();

    //Act
    const expRes = response;
    const actRes = await controller.getProducts(null, resMock);

    //Assert
    assert(actRes).toBeDefined();
    assert(expRes.length).toEqual(actRes.length);
    assert(expRes).toEqual(actRes);

    assert(daoMock.getProducts).toBeCalledTimes(1);
    assert(daoMock.getProducts).toBeCalledWith();

    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(products);
  });

  test("Lấy sản phẩm theo mã (200)", async () => {
    //Arrange
    const product = ProductsDAOMock.products[0];

    const requestMock = {
      params: {
        pro_no: product.pro_no,
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
    assert(validatorMock.validNo).toBeCalledWith(product.pro_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(product);
  });

  test("Lấy sản phẩm theo mã - mã không hợp lệ (400)", async () => {
    //Arrange
    const pro_no = -1;
    const product = undefined;

    const requestMock = {
      params: {
        pro_no,
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
    assert(validatorMock.validNo).toBeCalledWith(pro_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
  });

  test("Lấy sản phẩm theo mã - không tồn tại (404)", async () => {
    //Arrange
    const pro_no = 666;
    const product = {};

    const requestMock = {
      params: {
        pro_no,
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
    assert(validatorMock.validNo).toBeCalledWith(pro_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(pro_no);

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

  test("Thêm sản phẩm (201)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };

    product.pro_name += "aa";

    const requestMock = {
      body: product,
    };

    const response = { statusCode: 201, body: product };
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

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith(product);
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
      params: { pro_no: product.pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(product.pro_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

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
      params: { pro_no: product.pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(product.pro_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

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
      params: { pro_no: product.pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(product.pro_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
  });

  test("Sửa sản phẩm - không tồn tại (404)", async () => {
    //Arrange
    let product = { ...ProductsDAOMock.products[0] };

    product.pro_no = 666;

    const requestMock = {
      params: { pro_no: product.pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(product.pro_no);

    assert(validatorMock.validProduct).toBeCalledTimes(1);
    assert(validatorMock.validProduct).toBeCalledWith(product);

    // Kiểm tra tồn tại
    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    // Kiểm tra trùng tên
    assert(daoMock.getProductByName).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
  });

  test("Sửa sản phẩm - model không hợp lệ (400)", async () => {
    //Arrange
    const product = undefined;
    const pro_no = 1;

    const requestMock = {
      params: { pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(pro_no);

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

  test("Sửa sản phẩm - pro_no không hợp lệ (400)", async () => {
    //Arrange
    const product = undefined;
    const pro_no = -1;

    const requestMock = {
      params: { pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(pro_no);

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
    assert(validatorMock.validNo).toBeCalledWith(product.pro_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(product.pro_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
  });

  test("Xóa sản phẩm - không tồn tại", async () => {
    //Arrange
    const pro_no = 666;

    const requestMock = {
      params: { pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(pro_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(1);
    assert(daoMock.getProductByNo).toBeCalledWith(pro_no);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith({});
  });

  test("Xóa sản phẩm - không hợp lệ", async () => {
    //Arrange
    const pro_no = -1;

    const requestMock = {
      params: { pro_no },
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
    assert(validatorMock.validNo).toBeCalledWith(pro_no);

    assert(daoMock.getProductByNo).toBeCalledTimes(0);

    assert(resMock.status).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledTimes(1);
    assert(resMock.json).toBeCalledWith();
  });
});
