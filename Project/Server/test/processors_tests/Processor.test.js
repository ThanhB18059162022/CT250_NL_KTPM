const Processor = require("../../app/processors/Processor");

// Test các hàm của controller

class ProcessorImp extends Processor {}

function getProcessor() {
  return new ProcessorImp();
}

describe("Proc Khởi tạo lớp trừu tượng", () => {
  test("Lỗi khi khởi tạo lớp trừu tượng", () => {
    expect(() => new Processor()).toThrowError();
  });
});

describe("Proc Lấy ra start index end index", () => {
  test("page không hợp lệ", () => {
    //Arrange

    const page = 1;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const controller = getProcessor();

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

    const controller = getProcessor();

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

    const controller = getProcessor();

    //Act
    const expRs = { startIndex, endIndex };
    const actRs = controller.getStartEndIndex(page, limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Proc Tạo giá trị phân trang", () => {
  const Arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getArr = (s, e) => Arr.slice(s, e);

  test("Trang đầu không có previous", async () => {
    //Arrange
    const page = 1;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const arr = getArr(startIndex, endIndex);

    const next = { page: page + 1, limit };

    const processor = getProcessor();

    //Act
    const expRs = { items: arr, next };
    const actRes = processor.getPaginatedResults(arr, page, limit);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRs.length);
    expect(actRes).toEqual(expRs);
  });

  test("Cuối không có next", async () => {
    //Arrange
    const page = 2;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const arr = getArr(startIndex, endIndex);

    const previous = { page: page - 1, limit };

    const processor = getProcessor();

    //Act
    const expRs = { items: arr, previous };
    const actRes = processor.getPaginatedResults(arr, page, limit);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRs.length);
    expect(actRes).toEqual(expRs);
  });

  test("Trang giữa có previous - next", async () => {
    //Arrange
    const page = 2;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const arr = getArr(startIndex, endIndex);

    const previous = { page: page - 1, limit };
    const next = { page: page + 1, limit };

    const processor = getProcessor();

    //Act
    const expRs = { items: arr, previous, next };
    const actRes = processor.getPaginatedResults(arr, page, limit);

    //Expect
    expect(actRes).toBeDefined();
    expect(actRes.length).toEqual(expRs.length);
    expect(actRes).toEqual(expRs);
  });
});
