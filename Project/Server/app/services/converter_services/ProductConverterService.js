module.exports = class ProductConverter {
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
    } = dbProduct;

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

  toProducts = (dbProducts) => dbProducts.map((p) => this.toProduct(p));
};
