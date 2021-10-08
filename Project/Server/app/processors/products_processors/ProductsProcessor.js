const Processor = require("../Processor");

module.exports = class ProductsProcessor extends Processor {
  // Dao dùng truy cập CSDL, validator dùng để xác thực dữ liệu
  constructor(validator, dao, converterService, imageService) {
    super();
    this.validator = validator;
    this.dao = dao;
    this.converterService = converterService;
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

    const dbProducts = await this.dao.getProducts(startIndex, endIndex);

    const products = await this.toProducts(dbProducts);

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

  toProducts = async (dbProducts) => {
    const products = this.converterService.toProducts(dbProducts);

    const items = await Promise.all(
      products.map((p) => this.getProductItemInfo(p))
    );

    return items;
  };

  getProductItemInfo = async (product) => {
    const {
      prod_no,
      prod_name,
      prod_screen,
      prod_hardwareAndOS,
      prod_batteryAndCharger,
    } = product;

    const { cpu: prod_cpu, os: prod_os } = prod_hardwareAndOS | {};
    const { battery: prod_battery } = prod_batteryAndCharger | {};

    const prod_details = await this.dao.getProductDetails(prod_no);

    const imgs = await this.imageService.getProductImages(prod_no);

    return {
      prod_no,
      prod_name,
      prod_screen: this.getScreenSize(prod_screen),
      prod_cpu,
      prod_ram: prod_details?.[0].pd_ram ?? "",
      prod_battery,
      prod_img: imgs?.[0],
      prod_price: prod_details?.[0].pd_price ?? "",
      prod_os,
      prod_detailsLength: prod_details?.length ?? 0,
    };
  };

  getScreenSize = (prod_screen) => {
    // Kích thước màn hình dạng 7.6'
    const rgx_screen = /\d\.(\d||\d{2})+'/;
    const size = rgx_screen.exec(prod_screen.size);

    return size?.[0] ?? "not found";
  };

  //#endregion

  //#region  Chi tiết

  // Lấy theo mã sản phẩm
  getProductByNo = async (prod_noParam) => {
    const prod_no = Number(prod_noParam);
    this.checkValidate(() => this.validator.validateNo(prod_no));

    const dbProduct = await this.checkExistAsync(
      async () => await this.dao.getProductByNo(prod_no),
      this.dao.emptyData,
      `prod_no: ${prod_no}`
    );

    const product = await this.getProductInfo(dbProduct);

    return product;
  };

  // Lấy theo tên
  getProductByName = async (prod_name) => {
    this.checkValidate(() => this.validator.validateName(prod_name));

    const dbProduct = await this.checkExistAsync(
      async () => await this.dao.getProductByName(prod_name),
      this.dao.emptyData,
      `prod_name: ${prod_name}`
    );

    const product = await this.getProductInfo(dbProduct);

    return product;
  };

  getProductInfo = async (dbProduct) => {
    const product = this.converterService.toProduct(dbProduct);
    const { prod_no } = product;

    const prod_details = await this.dao.getProductDetails(prod_no);

    const prod_imgs = await this.imageService.getProductImages(prod_no);

    return { ...product, prod_details, prod_imgs };
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
    const dbProduct = this.converterService.toDbProduct(newProduct);
    const prod_no = await this.dao.addProduct(dbProduct);

    return { prod_no, ...newProduct };
  };

  // Cập nhật sản phẩm
  updateProduct = async (prod_noParam, newInfo) => {
    const prod_no = Number(prod_noParam);
    this.checkValidate(() => this.validator.validateProduct(newInfo));

    const oldInfo = await this.checkExistAsync(
      async () => await this.getProductByNo(prod_no),
      this.dao.emptyData,
      `prod_no: ${prod_no} not exist`
    );

    // Kiểm tra trùng tên sản phẩm khác
    await this.existNameNotOldName(newInfo.prod_name, prod_no, oldInfo.prod_no);

    // Cập nhật thông tin
    const dbProduct = this.converterService.toDbProduct(newInfo);
    await this.dao.updateProduct(prod_no, dbProduct);
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
