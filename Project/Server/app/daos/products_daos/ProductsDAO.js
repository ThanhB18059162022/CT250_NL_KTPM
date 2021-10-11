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

  getProductsByPrice = async (min, max, startIndex, endIndex) => {
    const dbProducts = await this.sqldao.query(
      `SELECT * FROM Products AS p, Products_Details AS pd 
      WHERE p.prod_no = pd.prod_no 
      AND pd.pd_price > ${min} AND pd.pd_price < ${max} 
      LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    const products = this.converter.toProducts(dbProducts);

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
    const dbNewProduct = this.converter.toDbProduct(newProduct);

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

    try {
      await this.sqldao.execute(sql, dbParams);
    } catch (error) {
      if (
        error.code == "ER_DUP_ENTRY" &&
        error.sqlMessage.includes("prod_name")
      ) {
        throw new ExistError(`prod_name: ${newProduct.prod_name}`);
      }

      throw error;
    }

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

  //#endregion

  //#region  UPDATE

  updateProduct = async (prod_no, product) => {
    const prod = await this.getProductByNo(prod_no);

    const dbProduct = this.converter.toDbProduct(product);
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

    try {
      await this.sqldao.execute(sql, dbParams);
    } catch (error) {
      if (
        error.code == "ER_DUP_ENTRY" &&
        error.sqlMessage.includes("prod_name")
      ) {
        throw new ExistError(`prod_name: ${product.prod_name}`);
      }

      throw error;
    }
  };

  //#endregion
};
