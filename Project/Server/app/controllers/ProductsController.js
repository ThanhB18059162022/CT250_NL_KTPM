module.exports = class ProductsController {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async () => {
    const products = await this.dao.query("SELECT * FROM Products;");

    return products;
  };
};
