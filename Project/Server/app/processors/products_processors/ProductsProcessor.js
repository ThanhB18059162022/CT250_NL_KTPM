const Processor = require("../Processor");

module.exports = class ProductsProcessor extends Processor {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao, imageService) {
    super();
    this.validator = validator;
    this.dao = dao;
    this.imageService = imageService;
  }

  //#region GET

  //#region  Danh sách

  // Lấy danh sách
  // Số trang và số lượng
  getProducts = async ({ page = 1, limit = 24 }) => {
    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );

    const products = await this.dao.getProducts(startIndex, endIndex);

    const productsPage = this.getPaginatedResults(
      products,
      pageIndex,
      limitIndex
    );

    return productsPage;
  };

  // Lấy danh sách theo mức giá trở xuống
  getProductsByPrice = async ({
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    page = 1,
    limit = 24,
  }) => {
    min = parseInt(min);
    if (isNaN(min)) {
      min = 0;
    }

    max = parseInt(max);
    if (isNaN(max)) {
      max = 0;
    }

    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );

    const products = await this.dao.getProductsByPrice(
      min,
      max,
      startIndex,
      endIndex
    );

    const productsPage = this.getPaginatedResults(
      products,
      pageIndex,
      limitIndex
    );

    return productsPage;
  };

  //#endregion

  //#region  Chi tiết

  // Lấy theo mã sản phẩm
  getProductByNo = async (prod_noParam) => {
    const prod_no = Number(prod_noParam);
    this.checkValidate(() => this.validator.validateNo(prod_no));

    const product = await this.dao.getProductByNo(prod_no);

    const productInfo = await this.getProductInfo(product);

    return productInfo;
  };

  // Lấy theo tên
  getProductByName = async (prod_name) => {
    this.checkValidate(() => this.validator.validateName(prod_name));

    const product = await this.dao.getProductByName(prod_name);

    const productInfo = await this.getProductInfo(product);

    return productInfo;
  };

  getProductInfo = async (product) => {
    const { prod_no } = product;

    const prod_details = await this.dao.getProductDetails(prod_no);

    const prod_imgs = await this.imageService.getProductImages(prod_no);

    return { ...product, prod_details, prod_imgs };
  };

  //#endregion

  //#endregion

  //#region ADD

  // Thêm sản phẩm
  addProduct = async (newProduct) => {
    //Kiểm tra model hợp lệ
    this.checkValidate(() => this.validator.validateProduct(newProduct));

    // Thêm vào CSDL trả về product
    const product = await this.dao.addProduct(newProduct);

    return product;
  };

  // Chi tiết sản phẩm
  addProductDetails = async (prod_no, details) => {
    //Kiểm tra model hợp lệ
    this.checkValidate(() => this.validator.validateProductDetails(details));

    const product = await this.getProductByNo(prod_no);

    await this.dao.addProductDetails(product.prod_no, details);
  };

  //#endregion

  // Cập nhật sản phẩm
  updateProduct = async (prod_no, newInfo) => {
    this.checkValidate(() => this.validator.validateProduct(newInfo));

    const oldInfo = await this.getProductByNo(prod_no);

    // Cập nhật thông tin
    await this.dao.updateProduct(oldInfo.prod_no, newInfo);
  };
};
