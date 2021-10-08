module.exports = class ProductsDAO {
  constructor(sqldao, imageService) {
    this.sqldao = sqldao;
    this.imageService = imageService;
  }

  getProducts = async (startIndex, endIndex) => {
    const productsDb = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex - startIndex}`
    );

    const products = await Promise.all(
      productsDb.map((p) => this.toListItem(p))
    );

    return products;
  };

  toListItem = async (productDb) => {
    const product = this.toProduct(productDb);
    const {
      prod_no,
      prod_name,
      prod_screen,
      prod_hardwareAndOS: { cpu: prod_cpu },
      prod_batteryAndCharger: { battery: prod_battery },
      prod_hardwareAndOS: { os: prod_os },
    } = product;

    const prod_details = await this.sqldao.query(
      "SELECT * FROM Products_Details WHERE prod_no = ?",
      [prod_no]
    );

    const imgs = await this.imageService.getProductImages(1);

    return {
      prod_no,
      prod_name,
      prod_screen: this.getScreenSize(prod_screen),
      prod_cpu,
      prod_ram: prod_details[0].pd_ram,
      prod_battery,
      prod_img: imgs[0],
      prod_price: prod_details[0].pd_price,
      prod_os,
      prod_detailsLength: prod_details.length,
    };
  };

  getScreenSize = (prod_screen) => {
    // Kích thước màn hình dạng 7.6'
    const rgx_screen = /\d\.(\d||\d{2})+'/;
    const size = rgx_screen.exec(prod_screen.size);

    return size?.[0] ?? "not found";
  };

  // Chưa làm xong
  getProductsByPrice = async (min, max, startIndex, endIndex) => {
    const products = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex}`
    );

    return products;
  };

  getProductByNo = async (prod_no) => {
    const products = await this.sqldao.query(
      "SELECT * FROM Products WHERE prod_no = ?;",
      [prod_no]
    );

    return products[0];
  };

  getProductByName = async (pro_name) => {
    const products = await this.sqldao.query(
      "SELECT * FROM Products WHERE prod_name = ?;",
      [pro_name]
    );

    return products[0];
  };

  addProduct = async (product) => {
    const dbProduct = this.toProductDb(product);
    const dbParams = Object.entries(dbProduct).map((en) => en[1]);

    const effRow = await this.sqldao.execute(
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

    return effRow > 0;
  };

  emptyData = (data) => this.sqldao.emptyData(data);

  // Không convert prod_no
  toProductDb = (product) => {
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

  // Có prod_no
  toProduct = (productDb) => {
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
    } = productDb;

    const product = {
      prod_no,
      prod_name,
      prod_manufacturer: JSON.parse(prod_manufacturer),
      prod_screen: JSON.parse(prod_screen),
      prod_camera: JSON.parse(prod_camera),
      prod_hardwareAndOS: JSON.parse(prod_hardwareAndOS),
      prod_network: JSON.parse(prod_network),
      prod_batteryAndCharger: JSON.parse(prod_batteryAndCharger),
      prod_utilities: JSON.parse(prod_utilities),
      prod_design: JSON.parse(prod_design),
    };

    return product;
  };
};
