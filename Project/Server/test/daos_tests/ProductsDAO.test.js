const ProductsDAO = require("../../app/daos/products_daos/ProductsDAO");

//#region INIT
class ProductConverterServiceMock {
  toProduct = jest.fn((p) => p);
  toProducts = jest.fn((p) => p);
  toDbProduct = jest.fn();
}

//#endregion

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

const getDAO = (sqldao) => {
  return new ProductsDAO(sqldao);
};

describe("Lấy ra danh sách sản phẩm", () => test("OK", async () => {}));
