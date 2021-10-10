const {
  ProductsProcessor,
} = require("../../../app/processors/processorsContainer");

const {
  NotValidError,
  NotExistError,
  ExistError,
} = require("../../../app/errors/errorsContainer");

//#region Init

const products = [
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
class ProductsDAOMock {
  getProducts = jest.fn(async (startIndex, endIndex) =>
    products.slice(startIndex, endIndex)
  );

  getProductsByPrice = jest.fn(async (min, max, startIndex, endIndex) =>
    products.slice(startIndex, endIndex)
  );

  getProductByNo = jest.fn(async (prod_no) => {
    const product = products.filter((p) => p.prod_no == prod_no)[0];

    if (product == undefined) {
      throw new NotExistError();
    }

    return product;
  });

  getProductByName = jest.fn(async (prod_name) => {
    const product = products.filter((p) => p.prod_name == prod_name)[0];

    if (product == undefined) {
      throw new NotExistError();
    }

    return product;
  });

  getProductDetails = jest.fn();

  // Trả về prod_no
  addProduct = jest.fn(async (newProduct) => {
    try {
      const p = await this.getProductByName(newProduct.prod_name);
      if (!this.emptyData(p)) {
        throw new ExistError();
      }
    } catch (error) {
      if (error instanceof ExistError) {
        throw error;
      }
    }

    return newProduct;
  });

  addProductDetails = jest.fn();

  updateProduct = jest.fn(async (prod_no, newInfo) => {
    const p = await this.getProductByName(newInfo.prod_name);
    if (!this.emptyData(p) && p.prod_no != prod_no) {
      throw new ExistError();
    }

    return newInfo;
  });

  emptyData = jest.fn((product) => {
    return product == undefined;
  });
}

class ProductsValidatorMock {
  validateProduct = jest.fn((product) => {
    return { hasAnyError: product === undefined };
  });

  validateProductDetails = jest.fn((details) => {
    return { hasAnyError: details === undefined };
  });

  validateNo = jest.fn((prod_no) => {
    return { hasAnyError: Number.isNaN(prod_no) || prod_no < 0 };
  });

  // Kiểm tra tên hợp lệ
  validateName = jest.fn((prod_name) => {
    return { hasAnyError: prod_name === undefined };
  });
}

class ImageServiceMock {
  getProductImages = jest.fn();
}
//#endregion

// Test các api endpoints của products processor

let daoMock;
let validatorMock;
let imgServiceMock;

function getProcessor() {
  return new ProductsProcessor(validatorMock, daoMock, imgServiceMock);
}

//#region GET

describe("Proc List Lấy danh sách sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
    imgServiceMock = new ImageServiceMock();
  });

  test("Lấy danh sách sản phẩm ", async () => {
    //Arrange
    const prods = products;
    const page = 1;
    const limit = 24;
    const query = {};
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const processor = getProcessor();

    //Act
    const expRs = { items: prods };
    const actRs = await processor.getProducts(query);

    //Expect
    expect(actRs).toBeDefined();
    expect(daoMock.getProducts).toBeCalledTimes(1);
    expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);
  });

  //#region  Giá

  test("Lấy danh sách theo mức giá ", async () => {
    //Arrange
    const prods = products;
    const query = {};

    const processor = getProcessor();

    //Act
    const expRs = { items: prods };
    const actRs = await processor.getProductsByPrice(query);

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs).toEqual(expRs);
    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
  });

  test("Lấy danh sách theo mức giá - min NaN 200", async () => {
    //Arrange
    const prods = products;
    const min = "wtf";
    const query = { min };

    const processor = getProcessor();

    //Act
    const expRs = { items: prods };
    const actRs = await processor.getProductsByPrice(query);

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs).toEqual(expRs);

    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
  });

  test("Lấy danh sách theo mức giá - max NaN 200", async () => {
    //Arrange
    const prods = products;
    const max = "wtf";
    const query = { max };

    const processor = getProcessor();

    //Act
    const expRs = { items: prods };
    const actRs = await processor.getProductsByPrice(query);

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs).toEqual(expRs);

    expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
  });

  //#endregion
});

describe("Proc Lấy sản phẩm theo mã", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = undefined;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getProductByNo(prod_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const prod_no = 404;

    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getProductByNo(prod_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
  });

  test("Hợp lệ", async () => {
    //Arrange
    const prod = products[0];
    const { prod_no } = prod;

    const processor = getProcessor();

    //Act
    const expRs = prod;
    const actRs = await processor.getProductByNo(prod_no);

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
  });
});

describe("Proc Lấy sản phẩm theo tên", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const prod_name = undefined;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getProductByName(prod_name);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateName).toBeCalledTimes(1);
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const prod_name = 404;

    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getProductByName(prod_name);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledTimes(1);
  });

  test("Hợp lệ", async () => {
    //Arrange
    const prod = products[0];
    const { prod_name } = prod;

    const processor = getProcessor();

    //Act
    const expRs = prod;
    const actRs = await processor.getProductByName(prod_name);

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateName).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledTimes(1);
  });
});

//#endregion

describe("Proc Thêm sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const product = undefined;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.addProduct(product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
  });

  test("Trùng tên - EX", async () => {
    //Arrange
    const product = products[0];

    const processor = getProcessor();

    //Act
    const expRs = ExistError;
    let actRs;
    try {
      await processor.addProduct(product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledTimes(1);
  });

  test("Thành công", async () => {
    //Arrange
    const product = { ...products[0], prod_name: "Táo" };
    const processor = getProcessor();

    //Act
    const expRs = product;
    const actRs = await processor.addProduct(product);

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(daoMock.getProductByName).toBeCalledTimes(1);
    expect(daoMock.addProduct).toBeCalledTimes(1);
  });
});

describe("Proc Thêm chi tiết của sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = undefined;
    const details = undefined;

    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.addProductDetails(prod_no, details);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProductDetails).toBeCalledTimes(1);
  });

  test("Sản phẩm không tồn tại - EX", async () => {
    //Arrange
    const prod_no = 404;
    const details = [];

    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.addProductDetails(prod_no, details);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProductDetails).toBeCalledTimes(1);
  });

  test("Thêm thành công", async () => {
    //Arrange
    const prod_no = 1;
    const details = [];

    const processor = getProcessor();

    //Act
    await processor.addProductDetails(prod_no, details);

    //Expect
    expect(validatorMock.validateProductDetails).toBeCalledTimes(1);
    expect(daoMock.addProductDetails).toBeCalledTimes(1);
  });
});

// TODO
describe("Thêm hình cho sản phẩm", () => {});

describe("Proc Sửa sản phẩm", () => {
  beforeEach(() => {
    daoMock = new ProductsDAOMock();
    validatorMock = new ProductsValidatorMock();
  });

  test("Không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = 1;
    const product = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;

    let actRs;
    try {
      await processor.updateProduct(prod_no, product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
  });

  test("Mã sản phẩm không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = undefined;
    const product = {};
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;

    let actRs;
    try {
      await processor.updateProduct(prod_no, product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
  });

  test("Mã sản phẩm không tồn tại - EX", async () => {
    //Arrange
    const prod_no = 404;
    const product = {};
    const processor = getProcessor();

    //Act
    const expRs = NotExistError;

    let actRs;
    try {
      await processor.updateProduct(prod_no, product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs).toBeDefined();
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
  });

  test("Trùng tên khác no - EX", async () => {
    //Arrange
    const product = products[0];
    const { prod_no } = products[1];
    const processor = getProcessor();

    //Act
    const expRs = ExistError;

    let actRs;
    try {
      await processor.updateProduct(prod_no, product);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
  });

  test("Thành công", async () => {
    //Arrange
    const product = products[0];
    const { prod_no } = product;
    const processor = getProcessor();

    //Act

    await processor.updateProduct(prod_no, product);

    //Expect
    expect(validatorMock.validateProduct).toBeCalledTimes(1);
    expect(validatorMock.validateNo).toBeCalledTimes(1);
    expect(daoMock.getProductByNo).toBeCalledTimes(1);
    expect(daoMock.updateProduct).toBeCalledTimes(1);
  });
});
