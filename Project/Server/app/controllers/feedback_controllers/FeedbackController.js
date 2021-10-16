const Controller = require("../Controller");

module.exports = class FeedbackController extends Controller {
  constructor(processor, config) {
    super(config);
    this.processor = processor;
  }

  // Lấy phản hồi mới nhất
  getFeedback = async (req, res) => {
    const feedbackPage = await this.processor.getFeedback(req.query);

    return this.ok(res, feedbackPage);
  };

  deleteFeedback = async (req, res) => {
    try {
      // Xóa feedback trong CSDL
      await this.processor.deleteFeedback(req.params.fb_no);

      return this.noContent(res);
    } catch (error) {
      return this.checkError(res, error);
    }
  };
};
