
const ProductsDAO = require("../../app/daos/products_daos/ProductsDAO");

// Test query cho Mysql


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

const getProductsDAO = (sqldao) => {
  return new ProductsDAO(sqldao);
};


describe("Kiểm tra các hàm trong Product DAO Mysql có đúng query, param, số lần gọi hay không", () => {

  test("Lấy danh sách sản phẩm", async () => {
    //Arrange
    const mockProducts = getMockProducts();
    const sqldaoMock = {
      query: jest.fn(() => Promise.resolve(mockProducts)),
    };
    let dao = getProductsDAO(sqldaoMock);

    //Act
    const expProducts = mockProducts;
    const actProducts = await dao.getProducts();

    //Expect
    expect(actProducts).toBeDefined();
    expect(expProducts.length).toEqual(actProducts.length);
    expect(expProducts).toEqual(actProducts);


    expect(sqldaoMock.query).toHaveBeenCalledTimes(1);
    expect(sqldaoMock.query).toHaveBeenCalledWith("SELECT * FROM Products;");
  });

  test("Lấy ra một sản phẩm theo mã", async () => {
    //Arrange
    const pro_no = 1;
    const product = getMockProducts().filter((p) => p.pro_no === pro_no)[0];

    const sqldaoMock = {
      query: jest.fn(() => Promise.resolve(product)),
    };

    let dao = getProductsDAO(sqldaoMock);

    //Act
    const expProduct = product;
    const actProduct = await dao.getProductByNo(pro_no);

    //Expect
    expect(actProduct).toBeDefined();
    expect(expProduct).toEqual(actProduct);

    expect(sqldaoMock.query).toHaveBeenCalledTimes(1);
    expect(sqldaoMock.query).toHaveBeenCalledWith(
      "SELECT * FROM Products WHERE pro_no = ?;",
      [pro_no]
    );
  });

  test("Lấy ra một sản phẩm theo tên", async () => {
    //Arrange
    const pro_name = "Xiaomi mi-10";
    const product = getMockProducts().filter((p) => p.pro_name === pro_name)[0];

    const sqldaoMock = {
      query: jest.fn(() => Promise.resolve(product)),
    };

    let dao = getProductsDAO(sqldaoMock);

    //Act
    const expProduct = product;
    const actProduct = await dao.getProductByName(pro_name);

    //Expect
    expect(actProduct).toBeDefined();
    expect(expProduct).toEqual(actProduct);

    expect(sqldaoMock.query).toHaveBeenCalledTimes(1);
    expect(sqldaoMock.query).toHaveBeenCalledWith(
      "SELECT * FROM Products WHERE pro_name = ?;",
      [pro_name]
    );
  });

  test("Thêm một sản phẩm", async () => {
    //Arrange
    const product = getMockProducts()[0];
    const addSuccess = true;

    const sqldaoMock = {
      execute: jest.fn(() => Promise.resolve(addSuccess)),
    };

    let dao = getProductsDAO(sqldaoMock);

    //Act
    const expProduct = addSuccess;
    const actProduct = await dao.addProduct(product);

    //Expect
    expect(actProduct).toBeDefined();
    expect(expProduct).toEqual(actProduct);

    expect(sqldaoMock.execute).toHaveBeenCalledTimes(1);
    expect(sqldaoMock.execute).toHaveBeenCalledWith(
      "INSERT INTO Products() VALUES()",
      [product.pro_name]
    );
  });
});
