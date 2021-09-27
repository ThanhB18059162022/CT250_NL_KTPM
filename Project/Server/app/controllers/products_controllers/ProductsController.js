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

    return res.json(productsPage);
  };

  // Lấy danh sách theo mức giá trở xuống
  getProductsByPrice = async (req, res) => {
    const productsPage = await this.processor.getProductsByPrice(req.query);

    return res.json(productsPage);
  };

  // Lấy theo mã sản phẩm
  getProductByNo = async (req, res) => {
    try {
      const { prod_no } = req.params;
      const product = await this.processor.getProductByNo(prod_no);

      return res.json(product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lấy theo tên
  getProductByName = async (req, res) => {
    try {
      const { prod_name } = req.params;
      const product = await this.processor.getProductByName(prod_name);

      return res.json(product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion

  // Thêm sản phẩm
  addProduct = async (req, res) => {
    try {
      const { body: newProduct } = req;

      const product = await this.processor.addProduct(newProduct);

      return res.status(201).json(product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Cập nhật sản phẩm
  updateProduct = async (req, res) => {
    try {
      const {
        params: { prod_no },
        body: newProduct,
      } = req;

      // Cập nhật thông tin
      await this.processor.updateProduct(prod_no, newProduct);

      return res.status(204).json({});
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
