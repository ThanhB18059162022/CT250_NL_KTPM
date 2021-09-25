const Controller = require("../Controller");

module.exports = class ProductsController extends Controller {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao) {
    super();

    this.validator = validator;
    this.dao = dao;
  }

  //#region GET

  //#region  Danh sách

  // Lấy danh sách
  // Số trang và số lượng
  getProducts = async (req, res) => {
    const { page = 1, limit = 24 } = req.query;

    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const products = await this.dao.getProducts(startIndex, endIndex);

    const productsPage = this.getPaginatedResults(products, page, limit);

    return res.json(productsPage);
  };

  // Lấy danh sách theo mức giá trở xuống
  getProductsByPrice = async (req, res) => {
    let {
      min = 0,
      max = Number.MAX_SAFE_INTEGER,
      page = 1,
      limit = 24,
    } = req.query;

    min = parseInt(min);
    if (isNaN(min)) {
      min = 0;
    }

    max = parseInt(max);
    if (isNaN(max)) {
      max = 0;
    }

    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const products = await this.dao.getProductsByPrice(
      min,
      max,
      startIndex,
      endIndex
    );

    const productsPage = this.getPaginatedResults(products, page, limit);

    return res.json(productsPage);
  };

  //#endregion

  //#region  Chi tiết

  // Lấy theo mã sản phẩm
  getProductByNo = async (req, res) => {
    const { prod_no: prod_noParam } = req.params;

    const prod_no = Number(prod_noParam);

    const result = this.validator.validateNo(prod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const product = await this.dao.getProductByNo(prod_no);

    if (!this.validator.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  // Lấy theo tên
  getProductByName = async (req, res) => {
    const { prod_name } = req.params;

    const result = this.validator.validateName(prod_name);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const product = await this.dao.getProductByName(prod_name);
    if (!this.validator.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  //#endregion

  //#endregion

  //#region ADD

  // Thêm sản phẩm
  addProduct = async (req, res) => {
    const { body: newProduct } = req;

    //Kiểm tra model hợp lệ
    const result = this.validator.validateProduct(newProduct);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    // Kiểm tra trùng tên sản phẩm khác
    const exist = await this.existName(newProduct.prod_name);
    if (exist) {
      return res.status(400).json(this.getDuplicateResult("prod_name"));
    }

    // Thêm vào CSDL trả về prod_no mới thêm
    const prod_no = await this.dao.addProduct(newProduct);

    return res.status(201).json({ ...newProduct, prod_no });
  };

  existName = async (prod_name) => {
    const productHasName = await this.dao.getProductByName(prod_name);

    return this.validator.existProduct(productHasName);
  };

  //#endregion

  //#region UPDATE

  // Cập nhật sản phẩm
  updateProduct = async (req, res) => {
    const {
      params: { prod_no },
      body: newProduct,
    } = req;

    //#region Validate

    //Kiểm tra prod_no hợp lệ
    const valNoResult = this.validator.validateNo(prod_no);
    if (valNoResult.hasAnyError) {
      return res.status(400).json(valNoResult.error);
    }

    // Kiểm tra newProduct hợp lệ
    const valProductResult = this.validator.validateProduct(newProduct);
    if (valProductResult.hasAnyError) {
      return res.status(400).json(valProductResult.error);
    }

    //#endregion

    //#region Check Duplicate

    // Lấy ra thông tin cũ
    const oldProduct = await this.dao.getProductByNo(prod_no);
    if (!this.validator.existProduct(oldProduct)) {
      return res.status(404).json({});
    }

    // Kiểm tra trùng tên sản phẩm khác
    const productHasName = await this.dao.getProductByName(
      newProduct.prod_name
    );

    // Kiểm tra tồn tại sản phẩm trùng tên
    // Và xem sản phẩm trùng tên đó phải sản phẩm cũ (oldProduct)
    if (
      this.validator.existProduct(productHasName) &&
      this.notOldProduct(oldProduct, productHasName)
    ) {
      return res.status(400).json(this.getDuplicateResult("prod_name"));
    }

    //#endregion

    // Cập nhật thông tin
    await this.dao.updateProduct(prod_no, newProduct);

    return res.status(204).json({});
  };

  // Trường hợp không cập nhật tên
  // Khi không cập nhật lại tên thì oldProduct và productWithSameName là một.
  notOldProduct = (oldProduct, productHasName) => {
    return oldProduct.prod_no !== productHasName.prod_no;
  };

  //#endregion

  //#region DELETE
  deleteProduct = async (req, res) => {
    const { prod_no } = req.params;

    const result = this.validator.validateNo(prod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const product = await this.dao.getProductByNo(prod_no);
    if (!this.validator.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.status(204).json({});
  };
  //#endregion
};
