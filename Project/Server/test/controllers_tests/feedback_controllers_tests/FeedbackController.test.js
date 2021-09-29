const FeedbackController = require("../../../app/controllers/feedback_controllers/FeedbackController");
const {
  NotValidError,
  NotExistError,
  UnKnownError,
} = require("../../../app/errors/errorsContainer");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các api end-point của phản hồi

//#region INIT
const FEEDBACK = [
  { fb: 1, date: new Date("2021-09-24") },
  { fb: 2, date: new Date() },
];

class FeedBackProcessorMock {
  getFeedback = jest.fn(() => ({ items: FEEDBACK }));

  getFeedbackByProductNo = jest.fn((no) => {
    if (no === undefined) {
      throw new NotValidError();
    }
    if (no == 666) {
      throw new UnKnownError();
    }
    if (no != 1) {
      throw new NotExistError();
    }
    return { items: FEEDBACK };
  });

  getSubFeedbackOfFeedback = jest.fn((no) => this.getFeedbackByProductNo(no));

  addFeedback = jest.fn((fb) => {
    if (fb == undefined) {
      throw new NotValidError();
    }
    if (fb == "unk") {
      throw new UnKnownError();
    }
    return { fb_no: FEEDBACK.length + 1 };
  });

  deleteFeedback = jest.fn((no) => this.getFeedbackByProductNo(no));
}

//#endregion

let processorMock;
function getController() {
  return new FeedbackController(processorMock);
}

// 200 - 404 - 400
describe("Ctrlr Ctrlr Lấy danh sách phản hồi", () => {
  beforeEach(() => {
    processorMock = new FeedBackProcessorMock();
  });

  test("Lấy danh sách phản hồi mới nhất không query params - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const controller = getController();

    const reqMock = {
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { items: feedback } };
    const actRes = await controller.getFeedback(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(actRes).toEqual(expRes);
  });

  //#region  Sản phẩm

  test("1 sản phẩm theo mã không hợp lệ - 400", async () => {
    //Arrange
    const prod_no = undefined;
    const controller = getController();

    const reqMock = {
      params: { prod_no },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.getFeedbackByProductNo(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getFeedbackByProductNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("1 sản phẩm không tồn tại - 404", async () => {
    //Arrange
    const prod_no = "2";
    const controller = getController();

    const reqMock = {
      params: { prod_no },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404 };
    const actRes = await controller.getFeedbackByProductNo(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getFeedbackByProductNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("1 sản phẩm - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const controller = getController();

    const reqMock = {
      params: { prod_no: "1" },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { items: feedback } };
    const actRes = await controller.getFeedbackByProductNo(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.getFeedbackByProductNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lỗi server", async () => {
    //Arrange
    const controller = getController();

    const reqMock = {
      params: { prod_no: "666" },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRs = UnKnownError;
    let actRs;
    try {
      await controller.getFeedbackByProductNo(reqMock, resMock);
    } catch (error) {
      actRs = error;
    }
    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(processorMock.getFeedbackByProductNo).toBeCalledTimes(1);
  });

  //#endregion

  //#region SubFeedback

  test("Danh sách trả lời không hợp lệ - 400", async () => {
    //Arrange
    const controller = getController();

    const reqMock = {
      params: {},
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.getSubFeedbackOfFeedback(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getSubFeedbackOfFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy danh sách trả lời không tồn tại - 404", async () => {
    //Arrange
    const controller = getController();

    const reqMock = {
      params: { fb_no: "2" },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404 };
    const actRes = await controller.getSubFeedbackOfFeedback(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.getSubFeedbackOfFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lấy danh sách trả lời phản hồi của phản hồi - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const controller = getController();

    const reqMock = {
      params: { fb_no: "1" },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { items: feedback } };
    const actRes = await controller.getSubFeedbackOfFeedback(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.getSubFeedbackOfFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lỗi server", async () => {
    //Arrange
    const controller = getController();

    const reqMock = {
      params: { fb_no: "666" },
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRs = UnKnownError;
    let actRs;
    try {
      await controller.getSubFeedbackOfFeedback(reqMock, resMock);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(processorMock.getSubFeedbackOfFeedback).toBeCalledTimes(1);
  });

  //#endregion
});

// 201 - 400
describe("Ctrlr Thêm phản hồi", () => {
  beforeEach(() => {
    processorMock = new FeedBackProcessorMock();
  });

  test("Phản hồi không hợp lệ - 400", async () => {
    //Arrange
    const feedback = undefined;
    const controller = getController();

    const reqMock = {
      body: feedback,
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.addFeedback(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.addFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Thêm thành công - 201", async () => {
    //Arrange
    const feedback = {};
    const controller = getController();

    const reqMock = {
      body: feedback,
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 201, body: { fb_no: FEEDBACK.length + 1 } };
    const actRes = await controller.addFeedback(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.addFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lỗi server", async () => {
    //Arrange
    const feedback = "unk";
    const controller = getController();

    const reqMock = {
      body: feedback,
    };

    const resMock = new ResponseMock();

    //Act
    const expRs = UnKnownError;
    let actRs;
    try {
      await controller.addFeedback(reqMock, resMock);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(processorMock.addFeedback).toBeCalledTimes(1);
  });
});

// 204 - 400 - 404
describe("Ctrlr Xóa phản hồi", () => {
  beforeEach(() => {
    processorMock = new FeedBackProcessorMock();
  });

  test("Mã phản hồi không hợp lệ - 400", async () => {
    //Arrange
    const fb_no = undefined;
    const controller = getController();

    const reqMock = {
      params: { fb_no },
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 400 };
    const actRes = await controller.deleteFeedback(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.deleteFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Không tồn tại - 404", async () => {
    //Arrange
    const fb_no = "2";
    const controller = getController();

    const reqMock = {
      params: { fb_no },
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 404 };
    const actRes = await controller.deleteFeedback(reqMock, resMock);

    //Expect
    expect(actRes.statusCode).toEqual(expRes.statusCode);
    expect(processorMock.deleteFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Xóa thành công - 204", async () => {
    //Arrange
    const fb_no = "1";
    const controller = getController();

    const reqMock = {
      params: { fb_no },
    };

    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 204, body: {} };
    const actRes = await controller.deleteFeedback(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(processorMock.deleteFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });

  test("Lỗi server", async () => {
    //Arrange
    const fb_no = "666";
    const controller = getController();

    const reqMock = {
      params: { fb_no },
    };

    const resMock = new ResponseMock();

    //Act
    const expRs = UnKnownError;
    let actRs;
    try {
      await controller.deleteFeedback(reqMock, resMock);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(processorMock.deleteFeedback).toBeCalledTimes(1);
  });
});
