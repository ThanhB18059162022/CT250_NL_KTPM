const ModeratorsControllers = require("../../../app/controllers/moderators_controllers/ModeratorsControllers");

// Kiểm tra các api end-points của quản trị viên

function getController() {
  return new ModeratorsControllers();
}

describe("Lấy ra quản trị viên", () => {
  test("Lấy ra danh sách quản trị viên", async () => {
    //Arrange

    const controller = getController();

    //Act
    await controller.getModerators();

    //Assert
  });
});
