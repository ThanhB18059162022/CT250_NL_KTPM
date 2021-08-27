const ProductsDAO = require("../../app/daos/ProductsDAO");

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

describe("Kiểm tra các hàm trong Product DAO có đúng query, param, số lần gọi hay không", () => {
  test("Lấy danh sách sản phẩm", async () => {
    //Arrange
    const mockProducts = getMockProducts();
    const sqldaoMock = {
      query: jest.fn(() => Promise.resolve(mockProducts)),
    };
    let dao = getProductsDAO(sqldaoMock);

    //Act
    const expectedProducts = mockProducts;
    const acutualProducts = await dao.getProducts();

    //Expect
    expect(expectedProducts).toBeDefined();
    expect(expectedProducts.length).toEqual(acutualProducts.length);
    expect(expectedProducts).toEqual(acutualProducts);

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
    const expectedProduct = product;
    const acutualProduct = await dao.getProductByNo(pro_no);

    //Expect
    expect(expectedProduct).toBeDefined();
    expect(expectedProduct).toEqual(acutualProduct);

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
    const expectedProduct = product;
    const acutualProduct = await dao.getProductByName(pro_name);

    //Expect
    expect(expectedProduct).toBeDefined();
    expect(expectedProduct).toEqual(acutualProduct);

    expect(sqldaoMock.query).toHaveBeenCalledTimes(1);
    expect(sqldaoMock.query).toHaveBeenCalledWith(
      "SELECT * FROM Products WHERE pro_name = ?;",
      [pro_name]
    );
  });
});
