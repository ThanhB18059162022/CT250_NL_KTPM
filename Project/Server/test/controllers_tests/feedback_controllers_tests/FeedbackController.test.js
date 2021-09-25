const FeedbackController = require("../../../app/controllers/feedback_controllers/FeedbackController");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các api end-point của phản hồi

//#region INIT

const FEEDBACK = [
  { fb: 1, date: new Date("2021-09-24") },
  { fb: 2, date: new Date() },
];

class FeedbackDAOMock {
  getFeedback = jest.fn(async () => FEEDBACK);
}

//#endregion

let validatorMock;
let daoMock;
function getController() {
  return new FeedbackController(validatorMock, daoMock);
}

describe("Lấy danh sách phản hồi", () => {
  beforeEach(() => {
    daoMock = new FeedbackDAOMock();
  });

  test("Không query params", async () => {
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
});

describe("Thêm phản hồi", () => {
  beforeEach(() => {
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
  });
});
