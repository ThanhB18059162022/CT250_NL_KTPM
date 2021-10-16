const Processor = require("../Processor");

module.exports = class FeedbackProcessor extends Processor {
  constructor(validator, dao) {
    super();
    this.validator = validator;
    this.dao = dao;
  }

  //#region GET

  // Lấy phản hồi từ ngày đó trở về trước
  getFeedback = async ({ page = 1, limit = 3, order = "DESC" }) => {
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

  // Lấy phản hồi theo mã phản hồi
  getFeedbackByNo = async (fb_noParam) => {
    const fb_no = Number(fb_noParam);
    this.checkValidate(() => this.validator.validateFeedbackNo(fb_no));

    const feeback = await this.dao.getFeedbackByNo(fb_no);

    return feeback;
  };

  // Lấy phản hồi theo mã sản phẩm
  getFeedbackByProductNo = async (
    prod_noParam,
    { page = 1, limit = 3, order = "DESC" }
  ) => {
    const prod_no = Number(prod_noParam);
    this.checkValidate(() => this.validator.validateProductNo(prod_no));

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

  // Lấy danh sách trả lời phản hồi của phản hồi
  getSubFeedback = async (fb_no, { page = 1, limit = 3 }) => {
    const feedback = await this.getFeedbackByNo(fb_no);

    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );

    const subFeedback = await this.dao.getSubFeedback(
      feedback.fb_no,
      startIndex,
      endIndex
    );

    const subFeedbackPage = this.getPaginatedResults(
      subFeedback,
      pageIndex,
      limitIndex
    );

    return subFeedbackPage;
  };

  //#endregion

  addFeedback = async (prod_no, newFeedback) => {
    this.checkValidate(() => this.validator.validateProductNo(prod_no));
    this.checkValidate(() => this.validator.validateFeedback(newFeedback));

    // Thêm vào CSDL trả về fb_no
    const feedback = await this.dao.addFeedback(prod_no, newFeedback);

    return feedback;
  };

  addSubFeedback = async (fb_no, newFeedback) => {
    this.checkValidate(() => this.validator.validateFeedback(newFeedback));

    const feedback = await this.getFeedbackByNo(fb_no);

    // Thêm vào CSDL trả về fb_no
    const subFeedback = await this.dao.addSubFeedback(
      feedback.fb_no,
      newFeedback
    );

    return subFeedback;
  };

  deleteFeedback = async (fb_noParam) => {
    const feedback = await this.getFeedbackByNo(fb_noParam);

    // Xóa feedback trong CSDL
    await this.dao.deleteFeedback(feedback.fb_no);
  };
};
