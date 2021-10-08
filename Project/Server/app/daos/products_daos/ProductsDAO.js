module.exports = class ProductsDAO {
  constructor(sqldao, imageService) {
    this.sqldao = sqldao;
    this.imageService = imageService;
  }

  getProducts = async (startIndex, endIndex) => {
    const dbproducts = await this.sqldao.query(
      `SELECT * FROM Products LIMIT ${startIndex}, ${endIndex}`
    );

    const products = await Promise.all(
      dbproducts.map((p) => this.toListItem(p))
    );
    console.log(products);
    return products;
  };

  toListItem = async (product) => {
    const {
      prod_no,
      prod_name,
      prod_screen: str_prod_screen,
      prod_hardwareAndOS: str_prod_hardwareAndOS,
      prod_batteryAndCharger: str_prod_batteryAndCharger,
    } = product;

    const prod_screen = JSON.parse(str_prod_screen);
    const prod_hardwareAndOS = JSON.parse(str_prod_hardwareAndOS);
    const prod_batteryAndCharger = JSON.parse(str_prod_batteryAndCharger);

    const prod_details = await this.sqldao.query(
      "SELECT * FROM Products_Details WHERE prod_no = ?",
      [prod_no]
    );
    const imgs = await this.imageService.getProductImages(1);

    return {
      prod_no,
      prod_name,
      prod_screen: this.getScreenSize(prod_screen),
      prod_cpu: prod_hardwareAndOS.cpu,
      prod_ram: prod_details[0].ram,
      prod_battery: prod_batteryAndCharger.battery,
      prod_img: imgs[0],
      prod_price: prod_details[0].price,
      prod_os: prod_hardwareAndOS.os,
      prod_detailsLength: prod_details.length,
    };
  };

  getScreenSize = (prod_screen) => {
    console.log(prod_screen);
    // Kích thước màn hình dạng 7.6'
    const rgx_screen = /\d\.\d'/;
    const size = rgx_screen.exec(prod_screen.size);

    return size[0];
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

    const dbProduct = [
      prod_name,
      JSON.stringify(prod_manufacturer),
      JSON.stringify(prod_screen),
      JSON.stringify(prod_camera),
      JSON.stringify(prod_hardwareAndOS),
      JSON.stringify(prod_network),
      JSON.stringify(prod_batteryAndCharger),
      JSON.stringify(prod_utilities),
      JSON.stringify(prod_design),
      brand_no,
    ];

    // const effRow = await this.sqldao.execute(
    //   `INSERT INTO Products(
    //     prod_name,
    //     prod_manufacturer,
    //     prod_screen,
    //     prod_camera,
    //     prod_hardwareAndOS,
    //     prod_network,
    //     prod_batteryAndCharger,
    //     prod_utilities,
    //     prod_design,
    //     brand_no
    //     )
    //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //   dbProduct
    // );

    // return effRow > 0;
    console.log(dbProduct);
  };

  emptyData = (data) => this.sqldao.emptyData(data);
};
