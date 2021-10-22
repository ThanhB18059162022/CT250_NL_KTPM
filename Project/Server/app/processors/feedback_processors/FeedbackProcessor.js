const { NotExistError } = require("../../errors/errorsContainer");
const Processor = require("../Processor");

module.exports = class FeedbackProcessor extends Processor {
  constructor(validator, dao) {
    super();
    this.validator = validator;
    this.dao = dao;
  }

  //#region GET

  // Lấy phản hồi từ ngày đó trở về trước
  getFeedback = async ({ page = 1, limit = 3, order }) => {
    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );

    const feedback = await this.dao.getFeedback(startIndex, endIndex, order);

    const feedbackPage = this.getPaginatedResults(
      feedback,
      pageIndex,
      limitIndex
    );

    return feedbackPage;
  };

  // Lấy phản hồi theo mã sản phẩm
  getFeedbackByProductNo = async (
    prod_no,
    { page = 1, limit = 3, order = "DESC" }
  ) => {
    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );

    const feedback = await this.dao.getFeedbackByProductNo(
      prod_no,
      startIndex,
      endIndex,
      order
    );

    const feedbackPage = this.getPaginatedResults(
      feedback,
      pageIndex,
      limitIndex
    );

    return feedbackPage;
  };

  //#endregion

  addFeedback = async (prod_no, newFeedback) => {
    this.checkValidate(() => this.validator.validateFeedback(newFeedback));

    const feedback = await this.dao.addFeedback(prod_no, newFeedback);

    return feedback;
  };

  addReply = async (fb_no, newReply) => {
    try {
      const { rep_content, mod_no } = newReply;

      const reply = await this.dao.addReply(fb_no, rep_content, mod_no);

      return reply;
    } catch (error) {
      if (error.code.includes("ER_NO_REFERENCED")) {
        throw new NotExistError(error.sqlMessage);
      }

      throw error;
    }
  };

  deleteFeedback = (fb_no) => this.dao.deleteFeedback(fb_no);

  deleteReply = (rep_no) => this.dao.deleteReply(rep_no);
};
