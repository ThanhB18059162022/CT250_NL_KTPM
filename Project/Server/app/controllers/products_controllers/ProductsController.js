const { getPaginatedResults } = require("../controllerHelper");

module.exports = class ProductsController {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao) {
    this.validator = validator;
    this.dao = dao;
  }

  //#region GET

  // Lấy danh sách
  // Số trang và số lượng
  getProducts = async (req, res) => {
    const { page, limit } = req.query;

    const productsPage = await getPaginatedResults(
      this.dao.getProducts,
      page,
      limit
    );

    return res.json(productsPage);
  };

  // Lấy theo mã sản phẩm
  getProductByNo = async (req, res) => {
    let { prod_no: prod_noParam } = req.params;

    const prod_no = Number(prod_noParam);

    const result = this.validateNo(prod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const product = await this.dao.getProductByNo(prod_no);

    if (!this.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  // Lấy theo tên
  getProductByName = async (req, res) => {
    const { prod_name } = req.params;

    const result = this.validateName(prod_name);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const product = await this.dao.getProductByName(prod_name);
    if (!this.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  //#endregion

  //#region ADD

  addProduct = async (req, res) => {
    const { body: newProduct } = req;

    //Kiểm tra model hợp lệ
    const result = this.validateProduct(newProduct);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    // Kiểm tra trùng tên sản phẩm khác
    const productHasName = await this.dao.getProductByName(
      newProduct.prod_name
    );
    if (this.existProduct(productHasName)) {
      return res.status(400).json();
    }

    // Thêm vào CSDL trả về prod_no mới thêm
    const prod_no = await this.dao.addProduct(newProduct);

    return res.status(201).json({ ...newProduct, prod_no });
  };

  //#endregion

  //#region UPDATE
  updateProduct = async (req, res) => {
    const {
      params: { prod_no },
      body: newProduct,
    } = req;

    //Kiểm tra prod_no, model hợp lệ
    const valNoResult = this.validateNo(prod_no);
    if (valNoResult.hasAnyError) {
      return res.status(400).json(valNoResult.error);
    }

    const valProductResult = this.validateProduct(newProduct);
    if (valProductResult.hasAnyError) {
      return res.status(400).json(valProductResult.error);
    }

    const oldProduct = await this.dao.getProductByNo(prod_no);
    if (!this.existProduct(oldProduct)) {
      return res.status(404).json({});
    }

    // Kiểm tra trùng tên sản phẩm khác
    const productHasName = await this.dao.getProductByName(
      newProduct.prod_name
    );

    // Kiểm tra tồn tại sản phẩm trùng tên
    // Và xem sản phẩm trùng tên đó phải sản phẩm cũ (oldProduct)
    if (
      this.existProduct(productHasName) &&
      this.notOldProduct(oldProduct, productHasName)
    ) {
      return res.status(400).json();
    }

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

    const result = this.validateNo(prod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const product = await this.dao.getProductByNo(prod_no);
    if (!this.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.status(204).json({});
  };
  //#endregion

  existProduct = (product) => {
    return this.validator.existProduct(product);
  };

  // Kiểm tra các trường của product xem có hợp lệ hay không
  validateProduct = (product) => {
    return this.validator.validateProduct(product);
  };

  // Kiểm tra mã hợp lệ
  validateNo = (prod_no) => {
    return this.validator.validateNo(prod_no);
  };

  // Kiểm tra tên hợp lệ
  validateName = (prod_name) => {
    return this.validator.validateName(prod_name);
  };
};
