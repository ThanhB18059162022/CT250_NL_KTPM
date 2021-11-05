const ModelDAO = require("../ModelDAO");
const { NotExistError } = require("../../errors/errorsContainer");

// Chỉ tương tác với db product
module.exports = class ProductsDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  //#region  GET

  getBrands = () => {
    const sql = "SELECT * FROM Brands";

    return this.sqldao.query(sql);
  };

  getProducts = async (startIndex, endIndex) => {
    const dbProducts = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    const products = this.toProducts(dbProducts);

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
      `SELECT DISTINCT p.* FROM Products AS p, Products_Details AS pd 
      WHERE p.prod_no = pd.prod_no 
      AND pd.pd_price > ${min} AND pd.pd_price < ${max} 
      LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    const products = this.toProducts(dbProducts);

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

    const product = this.toProduct(dbProduct);

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

    const product = this.toProduct(dbProduct);

    return product;
  };

  searchProduct = async (flug) => {
    return (
      await this.sqldao.query(
        "SELECT prod_no FROM Products WHERE prod_name LIKE CONCAT('%',?,'%');",
        [flug]
      )
    ).map((item) => item.prod_no);
  };

  //#endregion

  //#region  ADD

  addProduct = async (newProduct) => {
    const dbNewProduct = this.toDbProduct(newProduct);

    const dbParams = this.extractParams(dbNewProduct);
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
        prod_colors
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await this.handleExeError(
      async () => await this.sqldao.execute(sql, dbParams)
    );

    const product = await this.getProductByName(newProduct.prod_name);

    return product;
  };

  addProductDetails = async (prod_no, details = []) => {
    const product = await this.getProductByNo(prod_no);

    for (let i = 0; i < details.length; i++) {
      const dbDetail = this.toDbDetail(details[i]);

      const dbParams = this.extractParams(dbDetail);
      dbParams.push(product.prod_no);

      const sql = `INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, pd_discount, prod_no)
                  VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;

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
      pd_discount,
    } = detail;

    return {
      pd_ram,
      pd_storage,
      pd_storageAvailable,
      pd_price,
      pd_amount,
      pd_sold,
      pd_discount: JSON.stringify(pd_discount),
    };
  };

  //#endregion

  //#region  UPDATE

  updateProduct = async (prod_no, product) => {
    const prod = await this.getProductByNo(prod_no);

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
        prod_colors = ?,
        prod_status = ?
        WHERE prod_no = ?`;

    await this.handleExeError(
      async () => await this.sqldao.execute(sql, dbParams)
    );
  };

  updateProductDetail = async (pd_no, detail) => {
    const dbDetail = this.toDbDetail(detail);

    const dbParams = this.extractParams(dbDetail);
    dbParams.push(pd_no);

    const sql = `UPDATE products_details
                    SET pd_ram = ?, 
                      pd_storage = ?, 
                      pd_storageAvailable = ?, 
                      pd_price = ?, 
                      pd_amount = ?, 
                      pd_sold = ?,
                      pd_discount = ?
                    WHERE pd_no = ?`;

    await this.sqldao.execute(sql, dbParams);
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
      prod_status,
      prod_colors,
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
      prod_colors: JSON.stringify(prod_colors),
      prod_status: isNaN(prod_status) ? 0 : prod_status,
    };

    return dbProduct;
  };

  // Có prod_no
  toProduct = (dbProduct) => {
    const {
      prod_no,
      prod_name,
      prod_manufacturer,
      prod_screen,
      prod_camera,
      prod_hardwareAndOS,
      prod_network,
      prod_batteryAndCharger,
      prod_utilities,
      prod_design,
      prod_colors,
      prod_status,
    } = dbProduct;

    return {
      prod_no,
      prod_name,
      prod_manufacturer: JSON.parse(prod_manufacturer ?? '""'),
      prod_screen: JSON.parse(prod_screen ?? '""'),
      prod_camera: JSON.parse(prod_camera ?? '""'),
      prod_hardwareAndOS: JSON.parse(prod_hardwareAndOS ?? '""'),
      prod_network: JSON.parse(prod_network ?? '""'),
      prod_batteryAndCharger: JSON.parse(prod_batteryAndCharger ?? '""'),
      prod_utilities: JSON.parse(prod_utilities ?? '""'),
      prod_design: JSON.parse(prod_design ?? '""'),
      prod_colors: JSON.parse(prod_colors ?? '""'),
      prod_status,
    };
  };

  toProducts = (dbProducts) => dbProducts.map((p) => this.toProduct(p));
};
