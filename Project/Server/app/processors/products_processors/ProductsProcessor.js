const Processor = require("../Processor");

module.exports = class ProductsProcessor extends Processor {
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

    const { startIndex, endIndex } = this.getIndexes(page, limit);

    const products = await this.dao.getProductsByPrice(
      min,
      max,
      startIndex,
      endIndex
    );

    const productsPage = this.getPaginatedResults(products, page, limit);

    return productsPage;
  };

  //#endregion

  //#region  Chi tiết

  // Lấy theo mã sản phẩm
  getProductByNo = async (prod_noParam) => {
    const prod_no = Number(prod_noParam);
    this.checkValidate(() => this.validator.validateNo(prod_no));

    const product = await this.checkExistAsync(
      async () => await this.dao.getProductByNo(prod_no),
      this.dao.emptyData,
      `prod_no: ${prod_no}`
    );

    return product;
  };

  // Lấy theo tên
  getProductByName = async (prod_name) => {
    this.checkValidate(() => this.validator.validateName(prod_name));

    const product = await this.checkExistAsync(
      async () => await this.dao.getProductByName(prod_name),
      this.dao.emptyData,
      `prod_name: ${prod_name}`
    );

    return product;
  };

  //#endregion

  //#endregion

  // Thêm sản phẩm
  addProduct = async (newProduct) => {
    //Kiểm tra model hợp lệ
    this.checkValidate(() => this.validator.validateProduct(newProduct));

    // Kiểm tra trùng tên sản phẩm khác
    const { prod_name } = newProduct;
    await this.existName(prod_name, `prod_name: ${prod_name}`);

    // Thêm vào CSDL trả về prod_no mới thêm
    const product = await this.dao.addProduct(newProduct);

    return product;
  };

  // Cập nhật sản phẩm
  updateProduct = async (prod_no, newInfo) => {
    this.checkValidate(() => this.validator.validateProduct(newInfo));

    const oldInfo = await this.checkExistAsync(
      async () => await this.getProductByNo(prod_no),
      this.dao.emptyData,
      `prod_no: ${prod_no} not exist`
    );

    // Kiểm tra trùng tên sản phẩm khác
    await this.existNameNotOldName(
      newInfo.prod_name,
      newInfo.prod_no,
      oldInfo.prod_no
    );

    // Cập nhật thông tin
    await this.dao.updateProduct(prod_no, newInfo);
  };

  //#region EX

  existName = async (prod_name, message) => {
    await this.existData(
      async () => await this.getProductByName(prod_name),
      message
    );
  };

  existNameNotOldName = async (prod_name, newId, oldId, message) => {
    await this.existDataNotOldData(
      async () => await this.existName(prod_name, message),
      newId,
      oldId
    );
  };

  //#endregion
};
