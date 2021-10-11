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

    const dbProducts = await this.dao.getProducts(startIndex, endIndex);
    const products = await this.getList(dbProducts);

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

    const dbProducts = await this.dao.getProductsByPrice(
      min,
      max,
      startIndex,
      endIndex
    );

    const products = await this.getList(dbProducts);

    const productsPage = this.getPaginatedResults(
      products,
      pageIndex,
      limitIndex
    );

    return productsPage;
  };

  getList = async (dbProducts) => {
    const productsPromises = [];
    for (let i = 0; i < dbProducts.length; i++) {
      const prodProm = this.getItem(dbProducts[i]);

      productsPromises.push(prodProm);
    }
    const products = await Promise.all(productsPromises);

    return products;
  };

  getItem = async (product) => {
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
      prod_ram: prod_details?.[0]?.pd_ram ?? "",
      prod_battery,
      prod_img: imgs?.[0],
      prod_price: prod_details?.[0]?.pd_price ?? "",
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

  //#endregion

  getProductInfo = async (product) => {
    const { prod_no } = product;

    const prod_details = await this.dao.getProductDetails(prod_no);

    const prod_imgs = await this.imageService.getProductImages(prod_no);

    return { ...product, prod_details, prod_imgs };
  };

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
