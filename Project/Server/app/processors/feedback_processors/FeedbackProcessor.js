const Processor = require("../Processor");
const {
  NotValidError,
  NotExistError,
} = require("../../errors/errorsContainer");

module.exports = class FeedbackProcessor extends Processor {
  constructor(validator, dao) {
    super();
    this.validator = validator;
    this.dao = dao;
  }

  //#region GET

  // Lấy phản hồi từ ngày đó trở về trước
  getFeedback = async (query) => {
    const { date = new Date(), order = "DESC", page = 1, limit = 3 } = query;

    const { startIndex, endIndex } = this.getIndexes(page, limit);

    const feedback = await this.dao.getFeedback(
      date,
      order,
      startIndex,
      endIndex
    );

    const feedbackPage = this.getPaginatedResults(feedback, page, limit);

    return feedbackPage;
  };

  // Lấy phản hồi theo mã sản phẩm
  getFeedbackByProductNo = async (prod_noParam, query) => {
    const prod_no = Number(prod_noParam);
    const result = this.validator.validateProductNo(prod_no);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    const exist = await this.dao.existProduct(prod_no);
    if (!exist) {
      throw new NotExistError();
    }

    const { date = new Date(), order = "DESC", page = 1, limit = 3 } = query;

    const { startIndex, endIndex } = this.getIndexes(page, limit);

    const feedback = await this.dao.getFeedbackByProductNo(
      prod_no,
      date,
      order,
      startIndex,
      endIndex
    );

    const feedbackPage = this.getPaginatedResults(feedback, page, limit);

    return feedbackPage;
  };

  // Lấy danh sách trả lời phản hồi của phản hồi
  getSubFeedbackOfFeedback = async (fb_noParam, query) => {
    const fb_no = Number(fb_noParam);

    await this.checkFeedbackNo(fb_no);

    const { page = 1, limit = 3 } = query;
    const { startIndex, endIndex, pageIndex, limitIndex } = this.getIndexes(
      page,
      limit
    );
    const feedback = await this.dao.getSubFeedbackOfFeedback(
      fb_no,
      startIndex,
      endIndex
    );
    const subFeedbackPage = this.getPaginatedResults(
      feedback,
      pageIndex,
      limitIndex
    );

    return subFeedbackPage;
  };

  //#endregion

  //#region ADD

  addFeedback = async (newFeedback) => {
    const result = this.validator.validateFeedback(newFeedback);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    // Thêm vào CSDL trả về fb_no
    const fb_no = await this.dao.addFeedback(newFeedback);

    newFeedback.fb_no = fb_no;

    return newFeedback;
  };

  //#endregion

  //#region DELETE

  deleteFeedback = async (fb_noParam) => {
    const fb_no = Number(fb_noParam);

    await this.checkFeedbackNo(fb_no);

    // Xóa feedback trong CSDL
    await this.dao.deleteFeedback(fb_no);
  };

  //#endregion

  // Kiểm mã phản hồi
  checkFeedbackNo = async (fb_no) => {
    const result = this.validator.validateFeedbackNo(fb_no);
    if (result.hasAnyError) {
      throw new NotValidError();
    }

    const exist = await this.dao.existFeedback(fb_no);
    if (!exist) {
      throw new NotExistError();
    }
  };
};
