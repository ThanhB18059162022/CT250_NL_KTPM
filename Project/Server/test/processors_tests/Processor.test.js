const Processor = require("../../app/processors/Processor");

// Test các hàm của controller

class ProcessorImp extends Processor {}

function getController() {
  return new ProcessorImp();
}

describe("Khởi tạo lớp trừu tượng", () => {
  test("Lỗi khi khởi tạo lớp trừu tượng", () => {
    expect(() => new Processor()).toThrowError();
  });
});

describe("Lấy ra start index end index", () => {
  test("page không hợp lệ", () => {
    //Arrange

    const page = 1;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const controller = getController();

    //Act
    const expRs = { startIndex, endIndex };
    const actRs = controller.getStartEndIndex("wtf", limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("limit không hợp lệ", () => {
    //Arrange

    const page = 1;
    const limit = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const controller = getController();

    //Act
    const expRs = { startIndex, endIndex };
    const actRs = controller.getStartEndIndex(page, "cc");

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("page - limit hợp lệ", () => {
    //Arrange

    const page = 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const controller = getController();

    //Act
    const expRs = { startIndex, endIndex };
    const actRs = controller.getStartEndIndex(page, limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
