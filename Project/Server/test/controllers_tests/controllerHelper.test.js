const controllerHelper = require("../../app/controllers/controllerHelper");

// Test các hàm helper của controller

async function getArr(s, e) {
  return [1, 2, 3, 4].splice(s, e);
}

// Mặc định của page và limit là 1
describe("Hàm phân trang arr theo page, limit", () => {
  const getPage = controllerHelper.getPaginatedResults;

  test("Tham số mặc định 1 - 1", async () => {
    //Arrange
    const limit = 1;
    const arr = await getArr(0, 1);

    //Act
    const expRs = {
      items: arr,
      next: {
        page: 2,
        limit,
      },
    };
    const actRs = await getPage(getArr);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("page không phải số", async () => {
    //Arrange
    const page = "num";
    const limit = 3;
    const arr = await getArr(0, 3);

    //Act
    const expRs = {
      items: arr,
      next: {
        page: 2,
        limit,
      },
    };
    const actRs = await getPage(getArr, page, limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("limit không phải số", async () => {
    //Arrange
    const page = 2;
    const limit = "aa";
    const arr = await getArr(1, 2);

    //Act
    const expRs = {
      items: arr,
      next: {
        page: 3,
        limit: 1,
      },
      previous: {
        page: 1,
        limit: 1,
      },
    };
    const actRs = await getPage(getArr, page, limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Không có trang previous - next", async () => {
    //Arrange
    const page = 1;
    const limit = 5;
    const arr = await getArr(0, 4);

    //Act
    const expRs = {
      items: arr,
    };
    const actRs = await getPage(getArr, page, limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Không có trang next", async () => {
    //Arrange
    const page = 1;
    const limit = 4;
    const arr = await getArr(0, 4);

    //Act
    const expRs = {
      items: arr,
      next: {
        page: 2,
        limit,
      },
    };
    const actRs = await getPage(getArr, page, limit);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
