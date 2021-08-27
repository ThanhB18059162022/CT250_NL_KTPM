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

    const product = await this.dao.getProductByNo(pro_no);

    return res.json(product);
  };
};
