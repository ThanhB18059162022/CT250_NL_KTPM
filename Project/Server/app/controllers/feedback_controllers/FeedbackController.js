const {
  NotValidError,
  NotExistError,
} = require("../../errors/errorsContainer");
const Controller = require("../Controller");

module.exports = class FeedbackController extends Controller {
  constructor(processor) {
    super();
    this.processor = processor;
  }

  //#region GET

  // Lấy phản hồi từ ngày đó trở về trước
  getFeedback = async (req, res) => {
    const feedbackPage = await this.processor.getFeedback(req.query);

    return res.json(feedbackPage);
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

      return res.json(feedbackPage);
    } catch (error) {
      if (error instanceof NotValidError) {
        return this.badRequest(res, error);
      }

      if (error instanceof NotExistError) {
        return this.notFound(res, error);
      }

      throw error;
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

      return res.json(subFeedbackPage);
    } catch (error) {
      if (error instanceof NotValidError) {
        return this.badRequest(res, error);
      }

      if (error instanceof NotExistError) {
        return this.notFound(res, error);
      }

      throw error;
    }
  };

  //#endregion

  //#region ADD

  addFeedback = async (req, res) => {
    try {
      const newFeedback = await this.processor.addFeedback(req.body);

      return res.status(201).json(newFeedback);
    } catch (error) {
      if (error instanceof NotValidError) {
        return this.badRequest(res, error);
      }

      throw error;
    }
  };

  //#endregion

  //#region DELETE

  deleteFeedback = async (req, res) => {
    try {
      // Xóa feedback trong CSDL
      await this.processor.deleteFeedback(req.params.fb_no);

      return res.status(204).json({});
    } catch (error) {
      if (error instanceof NotValidError) {
        return this.badRequest(res, error);
      }

      if (error instanceof NotExistError) {
        return this.notFound(res, error);
      }

      throw error;
    }
  };

  //#endregion
};
