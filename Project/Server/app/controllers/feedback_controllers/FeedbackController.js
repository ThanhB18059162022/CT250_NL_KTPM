const Controller = require("../Controller");

module.exports = class FeedbackController extends Controller {
  constructor(validator, dao) {
    super();
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
    const { body: feedback } = req;

    // const result = this.validator.validateFeedback(feedback);
    // if(result.hasAnyError)

    return res.status(400).json();
  };

  //#endregion
};
