const Controller = require("../Controller");

module.exports = class FeedbackController extends Controller {
  constructor(validator, dao) {
    super();
    this.validator = validator;
    this.dao = dao;
  }

  //#region GET

  // Lấy phản hồi từ ngày đó trở về trước
  getFeedback = async (req, res) => {
    const {
      date = new Date(),
      order = "DESC",
      page = 1,
      limit = 24,
    } = req.query;

    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const feedback = await this.dao.getFeedback(
      date,
      order,
      startIndex,
      endIndex
    );

    const productsPage = this.getPaginatedResults(feedback, page, limit);

    return res.json(productsPage);
  };

  //#endregion

  //#region ADD

  addFeedback = async (req, res) => {
    const { body: newFeedback } = req;

    const result = this.validator.validateFeedback(newFeedback);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    // Thêm vào CSDL trả về fb_no
    const fb_no = await this.dao.addFeedback(newFeedback);

    return res.status(201).json({ ...newFeedback, fb_no });
  };

  //#endregion

  //#region DELETE

  deleteFeedback = async (req, res) => {
    const { fb_no: fb_noParam } = req.params;

    const fb_no = Number(fb_noParam);
    const result = this.validator.validateFeedbackNo(fb_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const feedback = await this.dao.getFeedbackByNo(fb_no);
    if (!this.validator.existFeedback(feedback)) {
      return res.status(404).json({});
    }

    // Xóa feedback trong CSDL
    await this.dao.deleteFeedback(fb_no);

    return res.status(204).json({});
  };

  //#endregion
};
