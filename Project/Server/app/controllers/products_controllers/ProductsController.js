const Controller = require("../Controller");

module.exports = class ProductsController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  //#region GET

  // Lấy danh sách
  // Số trang và số lượng
  getProducts = async (req, res) => {
    const productsPage = await this.processor.getProducts(req.query);

    return this.ok(res, productsPage);
  };

  // Lấy danh sách theo mức giá trở xuống
  getProductsByPrice = async (req, res) => {
    const productsPage = await this.processor.getProductsByPrice(req.query);

    return this.ok(res, productsPage);
  };

  // Lấy theo mã sản phẩm
  getProductByNo = async (req, res) => {
    try {
      const { prod_no } = req.params;
      const product = await this.processor.getProductByNo(prod_no);

      return this.ok(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lấy theo tên
  getProductByName = async (req, res) => {
    try {
      const { prod_name } = req.params;
      const product = await this.processor.getProductByName(prod_name);

      return this.ok(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //Lấy đánh giá
  getFeedback = async (req, res) => {
    const {
      params: { prod_no },
      query,
    } = req;
    const product = await this.processor.getFeedback(prod_no, query);

    return this.ok(res, product);
  };

  searchProduct = async(req, res)=>{
    const {flug} = req.params;
    const products = await this.processor.searchProduct(flug);
    return this.ok(res,products)
  }

  //#endregion

  //#region  ADD

  // Thêm sản phẩm
  addProduct = async (req, res) => {
    try {
      const { body: newProduct } = req;

      const product = await this.processor.addProduct(newProduct);

      return this.created(res, product);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Thêm chi tiết sản phẩm
  addProductDetails = async (req, res) => {
    try {
      const {
        body: details,
        params: { prod_no },
      } = req;

      await this.processor.addProductDetails(prod_no, details);

      return this.noContent(res);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Thêm ảnh sản phẩm
  addProductImages = async (req, res) => {
    const {
      body: images,
      params: { prod_no },
    } = req;

    await this.processor.addProductImages(prod_no, images);

    return this.noContent(res);
  };

  addFeedback = async (req, res) => {
    try {
      const {
        body: newFeedback,
        params: { prod_no },
      } = req;

      const feedback = await this.processor.addFeedback(prod_no, newFeedback);

      return this.created(res, feedback);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  addReply = async (req, res) => {
    try {
      const {
        body: newReply,
        params: { fb_no },
      } = req;

      const reply = await this.processor.addReply(fb_no, newReply);

      return this.created(res, reply);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  addFeedback = async (req, res) => {
    try {
      const {
        body: newFeedback,
        params: { prod_no },
      } = req;

      const feedback = await this.processor.addFeedback(prod_no, newFeedback);

      return this.created(res, feedback);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion

  // Cập nhật sản phẩm
  updateProduct = async (req, res) => {
    try {
      const {
        params: { prod_no },
        body: newProduct,
      } = req;

      // Cập nhật thông tin
      await this.processor.updateProduct(prod_no, newProduct);

      return this.noContent(res);
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
