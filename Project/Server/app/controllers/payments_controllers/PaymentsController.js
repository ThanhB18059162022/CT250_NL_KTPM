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

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    try {
      const {
        params: { id },
        query,
      } = req;

      const redirectUrl = await this.processor.checkoutOrder(id, query);

      // Về trang khi thanh toán
      return this.redirect(res, redirectUrl);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lấy đơn hàng đã thanh toán
  getSaveOrder = async (req, res) => {
    try {
      const { id } = req.params;

      const saveOrder = await this.processor.getSaveOrder(id);

      return this.ok(res, saveOrder);
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};