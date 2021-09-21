const PaymentController = require("./PaymentController");

module.exports = class CheckoutPaymentController extends PaymentController {
  constructor(validator, dao, exchangeService) {
    super(validator, dao, exchangeService);
  }

  //#region CHECKOUT ORDER

  // Lưu đơn hàng đã thanh toán
  checkoutOrder = async (req, res) => {
    const { id } = req.params;

    const idResult = this.validator.validateId(id);
    if (idResult.hasAnyError) {
      return res.status(400).json(idResult.error);
    }

    const { successUrl } = req.query;
    const urlResult = this.validator.validateUrl(successUrl);
    if (urlResult.hasAnyError) {
      return res.status(400).json(urlResult.error);
    }

    // Kiểm tra còn order trước khi thanh toán
    const { storedOrders } = CheckoutPaymentController;
    const order = storedOrders.get(id);
    if (order === undefined) {
      return res.status(404).json({});
    }

    // Lưu vào CSDL
    await this.saveOrder(order);
    // Xóa order lưu tạm
    storedOrders.delete(order.id);

    // Về trang khi thanh toán
    res.writeHead(302, {
      Location: successUrl,
    });

    return res.end();
  };

  //#endregion
};
