const FeedbackController = require("../../../app/controllers/feedback_controllers/FeedbackController");
const { ResponseMock } = require("../controllerTestHelper");

// Kiểm tra các api end-point của phản hồi

function getController() {
  return new FeedbackController();
}

describe("Lấy danh sách phản hồi", () => {
  test("Không query params", async () => {
    //Arrange
    const feedback = [];
    const controller = getController();

    const reqMock = {};
    const resMock = new ResponseMock();

    //Act
    const expRes = { statusCode: 200, items: { feedback } };
    const actRes = await controller.getFeedback(reqMock, resMock);

    //Expect
    expect(resMock.json).toBeCalledTimes(1);
    // expect(expRes).toEqual(actRes);
  });
});
