const FeedbackController = require("../../../app/controllers/feedback_controllers/FeedbackController");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các api end-point của phản hồi

//#region INIT

class FeedBackValidatorMock {
  validateFeedback = jest.fn((fb) => {
    return {
      hasAnyError: fb === undefined,
    };
  });

  validateFeedbackNo = jest.fn((no) => {
    return {
      hasAnyError: isNaN(no),
    };
  });

  existFeedback = jest.fn((fb) => fb !== undefined);
}

const FEEDBACK = [
  { fb: 1, date: new Date("2021-09-24") },
  { fb: 2, date: new Date() },
];

class FeedbackDAOMock {
  getFeedback = jest.fn(async () => FEEDBACK);

  getFeedbackByNo = jest.fn(async (no) => {
    if (no === 1) {
      return FEEDBACK[0];
    }
  });

  getFeedbackByProductNo = jest.fn(async () => FEEDBACK);

  getSubFeedbackOfFeedback = jest.fn(async () => FEEDBACK);

  addFeedback = jest.fn(async () => FEEDBACK.length + 1);

  deleteFeedback = jest.fn();
}

//#endregion

let validatorMock;
let daoMock;
function getController() {
  return new FeedbackController(validatorMock, daoMock);
}

// 200 - 404 - 400
describe("Lấy danh sách phản hồi", () => {
  beforeEach(() => {
    daoMock = new FeedbackDAOMock();
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
    expect(expRes).toEqual(actRes);
  });

  test("Lấy danh sách phản hồi theo của 1 sản phẩm - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const controller = getController();

    const reqMock = {
      params: {},
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { items: feedback } };
    const actRes = await controller.getFeedbackByProductNo(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(expRes).toEqual(actRes);
  });

  test("Lấy danh sách trả lời phản hồi của phản hồi - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const controller = getController();

    const reqMock = {
      params: {},
      query: {},
    };
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, body: { items: feedback } };
    const actRes = await controller.getSubFeedbackOfFeedback(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    expect(expRes).toEqual(actRes);
  });
});

// 201 - 400
describe("Thêm phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
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
    expect(actRes).toEqual(expRes);
    expect(validatorMock.validateFeedback).toBeCalledTimes(1);
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
    expect(validatorMock.validateFeedback).toBeCalledTimes(1);
    expect(daoMock.addFeedback).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});

// 204 - 400 - 404
describe("Xóa phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
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
    expect(actRes).toEqual(expRes);
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
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
    const expRes = { statusCode: 404, body: {} };
    const actRes = await controller.deleteFeedback(reqMock, resMock);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
    expect(daoMock.getFeedbackByNo).toBeCalledTimes(1);
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
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
    expect(daoMock.getFeedbackByNo).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledTimes(1);
  });
});
