const Controller = require("../Controller");
const {
  InstantiateAbstractClassError,
} = require("../../errors/errorsContainer");

module.exports = class PaymentsController extends Controller {
  constructor(processor, config) {
    super(config);
    if (this.constructor === PaymentsController) {
      throw new InstantiateAbstractClassError();
    }
    this.processor = processor;
  }

  getStoreOrders = async (_, res) => {
    const orders = await this.processor.getStoreOrders();

    return this.ok(res, orders);
  };

  deleteStoreOrder = async (req, res) => {
    const { id } = req.params;

    await this.processor.deleteStoreOrder(id);

    return this.noContent(res);
  };

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    const {
      params: { id },
      query,
    } = req;

    const redirectUrl = await this.processor.checkoutOrder(id, query);

    // Về trang khi thanh toán
    return this.redirect(res, redirectUrl);
  };

  // Lấy đơn hàng đã thanh toán
  getSaveOrder = async (req, res) => {
    const { id } = req.params;

    const saveOrder = await this.processor.getSaveOrder(id);

    return this.ok(res, saveOrder);
  };

  //lấy tất cả đơn hàng đã thanh toán
  getAllSaveOrder = async (_, res) => {
    const saveOrder = await this.processor.getAllSaveOrder();

    return this.ok(res, saveOrder);
  };
};
