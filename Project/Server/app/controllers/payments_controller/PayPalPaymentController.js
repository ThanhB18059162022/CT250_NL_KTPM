module.exports = class PayPalPaymentController {
  constructor(validator, payPalSerivce, dao) {
    this.validator = validator;
    this.payPalSerivce = payPalSerivce;
    this.dao = dao;
  }

  //#region GET

  // Lấy client id để chèn vào script bên font-end
  getClientId = async (req, res) => {
    const { clientId } = this.payPalSerivce;

    return res.json({ clientId });
  };

  // Lấy ra order theo id
  getOrderById = async (req, res) => {
    const { id } = req.params;

    const exist = await this.payPalSerivce.existOrder(id);
    if (!exist) {
      return res.status(404).json({});
    }

    const order = await this.payPalSerivce.getOrderById(id);

    return res.json(order);
  };

  //#endregion

  //#region  CREATE

  // Tạo order
  createOrder = async (req, res) => {
    const { body: products } = req;

    const result = this.validator.validateProducts(products);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const exist = await this.dao.allProductsExist(products);
    if (!exist) {
      return res.status(404).json({});
    }

    const order = await this.payPalSerivce.createOrder(products);

    return res.status(201).json(order);
  };

  //#endregion
};
