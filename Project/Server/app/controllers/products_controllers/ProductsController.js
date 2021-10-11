const Controller = require("../Controller");

module.exports = class ProductsController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  //#region GET

  // Lấy danh sách
  // Số trang và số lượng
  getProducts = async (req, res) => {
    const productsPage = await this.processor.getProducts(req.query);

    return this.ok(res, productsPage);
  };

  // Lấy danh sách theo mức giá trở xuống
  getProductsByPrice = async (req, res) => {
    const productsPage = await this.processor.getProductsByPrice(req.query);

    return this.ok(res, productsPage);
  };

  // Lấy theo mã sản phẩm
  getProductByNo = async (req, res) => {
    try {
      const { prod_no } = req.params;
      const product = await this.processor.getProductByNo(prod_no);

      return this.ok(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lấy theo tên
  getProductByName = async (req, res) => {
    try {
      const { prod_name } = req.params;
      const product = await this.processor.getProductByName(prod_name);

      return this.ok(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion

  //#region  ADD

  // Thêm sản phẩm
  addProduct = async (req, res) => {
    try {
      const { body: newProduct } = req;

      const product = await this.processor.addProduct(newProduct);

      return this.created(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Thêm chi tiết sản phẩm
  addProductDetails = async (req, res) => {
    try {
      const {
        body: details,
        params: { prod_no },
      } = req;

      const product = await this.processor.addProductDetails(prod_no, details);

      return this.created(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion

  // Cập nhật sản phẩm
  updateProduct = async (req, res) => {
    try {
      const {
        params: { prod_no },
        body: newProduct,
      } = req;

      // Cập nhật thông tin
      await this.processor.updateProduct(prod_no, newProduct);

      return this.noContent(res);
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
