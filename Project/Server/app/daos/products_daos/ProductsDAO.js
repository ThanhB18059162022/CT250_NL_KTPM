const ModelDAO = require("../ModelDAO");

// Chỉ tương tác với db product
module.exports = class ProductsDAO extends ModelDAO {
  constructor(sqldao, imageService) {
    super(sqldao);
    this.imageService = imageService;
  }

  getProducts = async (startIndex, endIndex) => {
    const products = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    return products;
  };

  getProductDetails = async (prod_no) => {
    const prod_details = await this.sqldao.query(
      "SELECT * FROM Products_Details WHERE prod_no = ?",
      [prod_no]
    );

    return prod_details;
  };

  // Chưa làm xong
  getProductsByPrice = async (min, max, startIndex, endIndex) => {
    const products = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    return products;
  };

  getProductByNo = async (prod_no) => {
    const product = (
      await this.sqldao.query("SELECT * FROM Products WHERE prod_no = ?;", [
        prod_no,
      ])
    )[0];

    return product;
  };

  getProductByName = async (prod_name) => {
    const product = (
      await this.sqldao.query("SELECT * FROM Products WHERE prod_name = ?;", [
        prod_name,
      ])
    )[0];

    return product;
  };

  addProduct = async (product) => {
    const dbParams = this.extractParams(product);

    const sql = `INSERT INTO Products(
        prod_name,
        prod_manufacturer,
        prod_screen,
        prod_camera,
        prod_hardwareAndOS,
        prod_network,
        prod_batteryAndCharger,
        prod_utilities,
        prod_design,
        brand_no
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await this.sqldao.execute(sql, dbParams);

    const { prod_no } = await this.getProductByName(product.prod_name);

    return prod_no;
  };

  addProductDetails = async (prod_no, details) => {
    console.log(details);
    const dbParams = this.extractParams(details);
    console.log(dbParams);
    const sql = `INSERT INTO Products(
        prod_name,
        prod_manufacturer,
        prod_screen,
        prod_camera,
        prod_hardwareAndOS,
        prod_network,
        prod_batteryAndCharger,
        prod_utilities,
        prod_design,
        brand_no
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // await this.sqldao.execute(sql, dbParams);
  };

  updateProduct = async (prod_no, product) => {
    const dbParams = this.extractParams(product);
    dbParams.push(prod_no);

    const sql = `UPDATE Products
        SET prod_name = ?, 
        prod_manufacturer = ?, 
        prod_screen = ?, 
        prod_camera = ?, 
        prod_hardwareAndOS = ?, 
        prod_network = ?, 
        prod_batteryAndCharger = ?, 
        prod_utilities = ?, 
        prod_design = ?, 
        brand_no = ? 
        WHERE prod_no = ?`;

    await this.sqldao.execute(sql, dbParams);
  };

  emptyData = (data) => this.sqldao.emptyData(data);
};

/*
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
  }; */
