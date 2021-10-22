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

// 200
describe("Ctrlr Lấy danh sách phản hồi", () => {
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
});

// 204 - 400 - 404
describe("Ctrlr Xóa phản hồi", () => {
  beforeEach(() => {
    processorMock = new FeedBackProcessorMock();
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
