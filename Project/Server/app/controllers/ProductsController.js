module.exports = class ProductsController {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async (req, res) => {
    const products = await this.dao.getProducts();

    return res.json(products);
  };

  getProductByNo = async (req, res) => {
    const { pro_no } = req.params;

    if (pro_no < 0) {
      return res.status(400).json();
    }

    const product = await this.dao.getProductByNo(pro_no);

    const notExistProduct = !this.existProduct(product);

    if (notExistProduct) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  existProduct = (product) => {
    return product !== undefined && product !== {};
  };
};
