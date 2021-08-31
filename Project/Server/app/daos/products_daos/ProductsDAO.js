module.exports = class ProductsDAO {
  constructor(sqldao) {
    this.sqldao = sqldao;
  }

  getProducts = async () => {
    const products = await this.sqldao.query("SELECT * FROM Products;");

    return products;
  };

  getProductByNo = async (pro_no) => {
    const product = await this.sqldao.query(
      "SELECT * FROM Products WHERE pro_no = ?;",
      [pro_no]
    );

    return product;
  };

  getProductByName = async (pro_name) => {
    const product = await this.sqldao.query(
      "SELECT * FROM Products WHERE pro_name = ?;",
      [pro_name]
    );

    return product;
  };

  addProduct = async (product) => {
    const { pro_name } = product;

    const addSuccess = await this.sqldao.execute(
      "INSERT INTO Products() VALUES()",
      [pro_name]
    );

    return addSuccess;
  };
};
