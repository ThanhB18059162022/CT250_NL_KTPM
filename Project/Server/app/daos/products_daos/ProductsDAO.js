// Chỉ tương tác với db product
module.exports = class ProductsDAO {
  constructor(sqldao, imageService) {
    this.sqldao = sqldao;
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
    const dbParams = Object.entries(product).map((en) => en[1]);

    await this.sqldao.execute(
      `INSERT INTO Products(
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      dbParams
    );

    const { prod_no } = await this.getProductByName(product.prod_name);

    return prod_no;
  };

  updateProduct = async (prod_no, product) => {
    const dbParams = Object.entries(product).map((en) => en[1]);
    dbParams.push(prod_no);

    await this.sqldao.execute(
      `UPDATE Products
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
        WHERE prod_no = ?`,
      dbParams
    );
  };

  emptyData = (data) => this.sqldao.emptyData(data);
};
