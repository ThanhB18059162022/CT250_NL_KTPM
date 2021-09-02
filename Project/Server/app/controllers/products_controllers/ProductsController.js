module.exports = class ProductsController {
  // Dao dùng truy cập CSDL, validator dùng để xác nhận dữ liệu
  constructor(dao, validator) {
    this.dao = dao;
    this.validator = validator;
  }

  //#region GET

  // Lấy danh sách
  getProducts = async (req, res) => {
    const products = await this.dao.getProducts();

    return res.json(products);
  };

  // Lấy theo pro_no
  getProductByNo = async (req, res) => {
    const { pro_no } = req.params;

    if (!this.validNo(pro_no)) {
      return res.status(400).json();
    }

    const product = await this.dao.getProductByNo(pro_no);

    if (!this.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  // Lấy theo tên
  getProductByName = async (req, res) => {
    const { pro_name } = req.params;

    if (!this.validName(pro_name)) {
      return res.status(400).json();
    }

    const product = await this.dao.getProductByName(pro_name);

    if (!this.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.json(product);
  };

  //#endregion

  //#region ADD

  addProduct = async (req, res) => {
    const { body: newProduct } = req;

    //Kiểm tra model hợp lệ
    if (!this.validProduct(newProduct)) {
      return res.status(400).json();
    }

    // Kiểm tra trùng tên sản phẩm khác
    const productHasName = await this.dao.getProductByName(newProduct.pro_name);

    if (this.existProduct(productHasName)) {
      return res.status(400).json();
    }

    // Thêm vào CSDL trả về pro_no mới thêm
    const pro_no = await this.dao.addProduct(newProduct);

    return res.status(201).json({ ...newProduct, pro_no });
  };

  //#endregion

  //#region UPDATE
  updateProduct = async (req, res) => {
    const {
      params: { pro_no },
      body: newProduct,
    } = req;

    //Kiểm tra pro_no, model hợp lệ
    if (!this.validNo(pro_no) || !this.validProduct(newProduct)) {
      return res.status(400).json();
    }

    const oldProduct = await this.dao.getProductByNo(pro_no);

    // Kiểm tra tồn tại
    if (!this.existProduct(oldProduct)) {
      return res.status(404).json({});
    }

    // Kiểm tra trùng tên sản phẩm khác
    const productHasName = await this.dao.getProductByName(newProduct.pro_name);

    // Kiểm tra tồn tại sản phẩm trùng tên
    // Và xem sản phẩm trùng tên đó phải sản phẩm cũ (oldProduct)
    if (
      this.existProduct(productHasName) &&
      this.notOldProduct(oldProduct, productHasName)
    ) {
      return res.status(400).json();
    }

    return res.status(204).json({});
  };

  // Trường hợp không cập nhật tên
  // Khi không cập nhật lại tên thì oldProduct và productWithSameName là một.
  notOldProduct = (oldProduct, productHasName) => {
    return oldProduct.pro_no !== productHasName.pro_no;
  };

  //#endregion

  //#region DELETE
  deleteProduct = async (req, res) => {
    const { pro_no } = req.params;

    if (!this.validNo(pro_no)) {
      return res.status(400).json();
    }

    const product = await this.dao.getProductByNo(pro_no);

    if (!this.existProduct(product)) {
      return res.status(404).json({});
    }

    return res.status(204).json({});
  };
  //#endregion

  existProduct = (product) => {
    return this.validator.existProduct(product);
  };

  // Kiểm tra các trường của product xem có hợp lệ hay không
  validProduct = (product) => {
    return this.validator.validProduct(product);
  };

  // Kiểm tra mã hợp lệ
  validNo = (pro_no) => {
    return this.validator.validNo(pro_no);
  };

  // Kiểm tra tên hợp lệ
  validName = (pro_name) => {
    return this.validator.validName(pro_name);
  };
};
