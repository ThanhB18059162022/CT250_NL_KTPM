const ModelDAO = require("../ModelDAO");
const { NotExistError, ExistError } = require("../../errors/errorsContainer");

// Chỉ tương tác với db product
module.exports = class ProductsDAO extends ModelDAO {
  constructor(sqldao, converter) {
    super(sqldao);
    this.converter = converter;
  }

  //#region  GET

  getProducts = async (startIndex, endIndex) => {
    const dbProducts = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    const products = this.converter.toProducts(dbProducts);

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
    const dbProduct = (
      await this.sqldao.query("SELECT * FROM Products WHERE prod_no = ?;", [
        prod_no,
      ])
    )[0];

    if (this.emptyData(dbProduct)) {
      throw new NotExistError(`prod_no: ${prod_no}`);
    }

    const product = this.converter.toProduct(dbProduct);

    return product;
  };

  getProductByName = async (prod_name) => {
    const dbProduct = (
      await this.sqldao.query("SELECT * FROM Products WHERE prod_name = ?;", [
        prod_name,
      ])
    )[0];

    if (this.emptyData(dbProduct)) {
      throw new NotExistError(`prod_name: ${prod_name}`);
    }

    const product = this.converter.toProduct(dbProduct);

    return product;
  };

  //#endregion

  //#region  ADD

  addProduct = async (newProduct) => {
    await this.checkExistName(newProduct.prod_name);

    const dbNewProduct = this.toDbProduct(newProduct);

    const dbParams = this.extractParams(dbNewProduct);

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

    const product = await this.getProductByName(newProduct.prod_name);

    return product;
  };

  addProductDetails = async (prod_no, details = []) => {
    const product = await this.getProductByNo(prod_no);

    for (let i = 0; i < details.length; i++) {
      const dbDetail = this.toDbDetail(details[i]);

      const dbParams = this.extractParams(dbDetail);
      dbParams.push(product.prod_no);

      const sql = `INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
                  VALUES(?, ?, ?, ?, ?, ?, ?);`;

      await this.sqldao.execute(sql, dbParams);
    }
  };

  toDbDetail = (detail) => {
    const {
      pd_ram,
      pd_storage,
      pd_storageAvailable,
      pd_price,
      pd_amount,
      pd_sold,
    } = detail;

    return {
      pd_ram,
      pd_storage,
      pd_storageAvailable,
      pd_price,
      pd_amount,
      pd_sold,
    };
  };

  // Kiểm tra trùng tên
  checkExistName = async (prod_name) => {
    try {
      const prodHasName = await this.getProductByName(prod_name);
      if (!this.emptyData(prodHasName)) {
        throw new ExistError(`prod_name: ${prodHasName.prod_name}`);
      }
    } catch (error) {
      if (error instanceof ExistError) {
        throw error;
      }
    }
  };

  //#endregion

  //#region  UPDATE

  updateProduct = async (prod_no, product) => {
    const prod = await this.getProductByNo(prod_no);

    await this.checkDuplicateName(product.prod_name, prod.prod_no);

    const dbProduct = this.toDbProduct(product);
    const dbParams = this.extractParams(dbProduct);
    dbParams.push(prod.prod_no);

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

  // Kiểm tra trùng tên không phải tên cũ
  checkDuplicateName = async (prod_name, prod_no) => {
    try {
      const prodHasName = await this.getProductByName(prod_name);
      if (!this.emptyData(prodHasName) && prodHasName.prod_no != prod_no) {
        throw new ExistError(`prod_name: ${prodHasName.prod_name}`);
      }
    } catch (error) {
      if (error instanceof ExistError) {
        throw error;
      }
    }
  };

  //#endregion

  // Không convert prod_no
  toDbProduct = (product) => {
    const {
      prod_name,
      prod_manufacturer,
      prod_screen,
      prod_camera,
      prod_hardwareAndOS,
      prod_network,
      prod_batteryAndCharger,
      prod_utilities,
      prod_design,
      brand_no,
    } = product;

    const dbProduct = {
      prod_name,
      prod_manufacturer: JSON.stringify(prod_manufacturer),
      prod_screen: JSON.stringify(prod_screen),
      prod_camera: JSON.stringify(prod_camera),
      prod_hardwareAndOS: JSON.stringify(prod_hardwareAndOS),
      prod_network: JSON.stringify(prod_network),
      prod_batteryAndCharger: JSON.stringify(prod_batteryAndCharger),
      prod_utilities: JSON.stringify(prod_utilities),
      prod_design: JSON.stringify(prod_design),
      brand_no,
    };

    return dbProduct;
  };
};
