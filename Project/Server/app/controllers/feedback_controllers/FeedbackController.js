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
      limit = 3,
    } = req.query;

    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const feedback = await this.dao.getFeedback(
      date,
      order,
      startIndex,
      endIndex
    );

    const feedbackPage = this.getPaginatedResults(feedback, page, limit);

    return res.json(feedbackPage);
  };

  // Lấy phản hồi theo mã sản phẩm
  getFeedbackByProductNo = async (req, res) => {
    const { prod_no: prod_noParam } = req.params;

    const prod_no = Number(prod_noParam);
    const result = this.validator.validateProductNo(prod_no);
    if (result.hasAnyError) {
      return res.status(400).json(result.error);
    }

    const exist = await this.dao.existProduct(prod_no);
    if (!exist) {
      return res.status(404).json({});
    }

    const {
      date = new Date(),
      order = "DESC",
      page = 1,
      limit = 3,
    } = req.query;

    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const feedback = await this.dao.getFeedbackByProductNo(
      prod_no,
      date,
      order,
      startIndex,
      endIndex
    );

    const feedbackPage = this.getPaginatedResults(feedback, page, limit);

    return res.json(feedbackPage);
  };

  // Lấy danh sách trả lời phản hồi của phản hồi
  getSubFeedbackOfFeedback = async (req, res) => {
    const { fb_no } = req.params;

    const { page = 1, limit = 3 } = req.query;

    const { startIndex, endIndex } = this.getStartEndIndex(page, limit);

    const feedback = await this.dao.getSubFeedbackOfFeedback(
      fb_no,
      startIndex,
      endIndex
    );

    const subFeedbackPage = this.getPaginatedResults(feedback, page, limit);

    return res.json(subFeedbackPage);
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
