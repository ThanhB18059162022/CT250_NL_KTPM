const Controller = require("../Controller");

module.exports = class FeedbackController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  //#region GET

  // Lấy phản hồi từ ngày đó trở về trước
  getFeedback = async (req, res) => {
    const feedbackPage = await this.processor.getFeedback(req.query);

    return this.ok(res, feedbackPage);
  };

  // Lấy phản hồi theo mã sản phẩm
  getFeedbackByProductNo = async (req, res) => {
    try {
      const {
        params: { prod_no },
        query,
      } = req;

      const feedbackPage = this.processor.getFeedbackByProductNo(
        prod_no,
        query
      );

      return this.ok(res, feedbackPage);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  // Lấy danh sách trả lời phản hồi của phản hồi
  getSubFeedbackOfFeedback = async (req, res) => {
    try {
      const {
        params: { fb_no },
        query,
      } = req;

      const subFeedbackPage = this.processor.getSubFeedbackOfFeedback(
        fb_no,
        query
      );

      return this.ok(res, subFeedbackPage);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion

  //#region ADD

  addFeedback = async (req, res) => {
    try {
      const newFeedback = await this.processor.addFeedback(req.body);

      return this.created(res, newFeedback);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion

  //#region DELETE

  deleteFeedback = async (req, res) => {
    try {
      // Xóa feedback trong CSDL
      await this.processor.deleteFeedback(req.params.fb_no);

      return this.noContent(res);
    } catch (error) {
      return this.checkError(res, error);
    }
  };

  //#endregion
};
