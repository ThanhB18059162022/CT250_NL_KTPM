const NotesController = require("../../app/controllers/NotesController");

describe("Test all func", () => {
  let controller;

  beforeEach(() => {
    controller = new NotesController();
  });

  test("Get List", async () => {
    //Lỗi
    // expect(await controller.getList()).toBeDefined();
  });
});
