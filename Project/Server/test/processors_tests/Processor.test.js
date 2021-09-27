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

// test("Lấy danh sách sản phẩm theo mức giá (200) - min không phải số ", async () => {
//   //Arrange
//   const max = 100;
//   const min = "wtf";
//   const page = 2;
//   const limit = 3;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const products = ProductsDAOMock.products.slice(startIndex, endIndex);

//   const reqMock = {
//     query: { max, min, page, limit },
//   };

//   const previous = { page: page - 1, limit };
//   const response = {
//     statusCode: 200,
//     body: { items: products, previous },
//   };

//   const processor = getProcessor();

//   //Act
//   const expRes = response;
//   const actRes = await processor.getProductsByPrice(reqMock, resMock);

//   //Expect
//   expect(actRes).toBeDefined();
//   expect(actRes.length).toEqual(expRes.length);
//   expect(actRes).toEqual(expRes);

//   expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
//   expect(daoMock.getProductsByPrice).toBeCalledWith(
//     0,
//     max,
//     startIndex,
//     endIndex
//   );

//   expect(resMock.json).toBeCalledTimes(1);
//   expect(resMock.json).toBeCalledWith({ items: products, previous });
// });

// test("Lấy danh sách sản phẩm theo mức giá (200) - max không phải là số ", async () => {
//   //Arrange
//   const max = "wtf";
//   const min = 10;
//   const page = 2;
//   const limit = 3;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const products = ProductsDAOMock.products.slice(startIndex, endIndex);

//   const reqMock = {
//     query: { max, min, page, limit },
//   };

//   const previous = { page: page - 1, limit };
//   const response = {
//     statusCode: 200,
//     body: { items: products, previous },
//   };

//   const processor = getProcessor();

//   //Act
//   const expRes = response;
//   const actRes = await processor.getProductsByPrice(reqMock, resMock);

//   //Expect
//   expect(actRes).toBeDefined();
//   expect(actRes.length).toEqual(expRes.length);
//   expect(actRes).toEqual(expRes);

//   expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
//   expect(daoMock.getProductsByPrice).toBeCalledWith(
//     min,
//     0,
//     startIndex,
//     endIndex
//   );

//   expect(resMock.json).toBeCalledTimes(1);
//   expect(resMock.json).toBeCalledWith({ items: products, previous });
// });

// test("Lấy danh sách sản phẩm theo mức giá (200) ", async () => {
//   //Arrange
//   const max = 100;
//   const min = 10;
//   const page = 2;
//   const limit = 3;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const products = ProductsDAOMock.products.slice(startIndex, endIndex);

//   const reqMock = {
//     query: { max, min, page, limit },
//   };

//   const previous = { page: page - 1, limit };
//   const response = {
//     statusCode: 200,
//     body: { items: products, previous },
//   };

//   const processor = getProcessor();

//   //Act
//   const expRes = response;
//   const actRes = await processor.getProductsByPrice(reqMock, resMock);

//   //Expect
//   expect(actRes).toBeDefined();
//   expect(actRes.length).toEqual(expRes.length);
//   expect(actRes).toEqual(expRes);

//   expect(daoMock.getProductsByPrice).toBeCalledTimes(1);
//   expect(daoMock.getProductsByPrice).toBeCalledWith(
//     min,
//     max,
//     startIndex,
//     endIndex
//   );

//   expect(resMock.json).toBeCalledTimes(1);
//   expect(resMock.json).toBeCalledWith({ items: products, previous });
// });

//  test("Lấy danh sách sản phẩm (200) chỉ có next", async () => {
//     //Arrange
//     const products = ProductsDAOMock.products;
//     const page = 1;
//     const limit = 5;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const reqMock = {
//       query: { page, limit },
//     };

//     const next = { page: page + 1, limit };
//     const response = {
//       statusCode: 200,
//       body: { items: products, next },
//     };

//     const processor = getProcessor();

//     //Act
//     const expRes = response;
//     const actRes = await processor.getProducts(reqMock, resMock);

//     //Expect
//     expect(actRes).toBeDefined();
//     expect(actRes.length).toEqual(expRes.length);
//     expect(actRes).toEqual(expRes);

//     expect(daoMock.getProducts).toBeCalledTimes(1);
//     expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

//     expect(resMock.json).toBeCalledTimes(1);
//     expect(resMock.json).toBeCalledWith({ items: products, next });
//   });

//   test("Lấy danh sách sản phẩm (200) có thêm previous - trang 2 lấy 2", async () => {
//     //Arrange
//     const page = 2;
//     const limit = 2;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const products = ProductsDAOMock.products.slice(startIndex, endIndex);

//     const reqMock = {
//       query: { page, limit },
//     };

//     const next = { page: page + 1, limit };
//     const previous = { page: page - 1, limit };
//     const response = {
//       statusCode: 200,
//       body: { items: products, next, previous },
//     };

//     const processor = getProcessor();

//     //Act
//     const expRes = response;
//     const actRes = await processor.getProducts(reqMock, resMock);

//     //Expect
//     expect(actRes).toBeDefined();
//     expect(actRes.length).toEqual(expRes.length);
//     expect(actRes).toEqual(expRes);

//     expect(daoMock.getProducts).toBeCalledTimes(1);
//     expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

//     expect(resMock.json).toBeCalledTimes(1);
//     expect(resMock.json).toBeCalledWith({ items: products, next, previous });
//   });

//   test("Lấy danh sách sản phẩm (200) không có next - lấy các phần tử cuối", async () => {
//     //Arrange
//     const page = 2;
//     const limit = 3;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const products = ProductsDAOMock.products.slice(startIndex, endIndex);

//     const reqMock = {
//       query: { page, limit },
//     };

//     const previous = { page: page - 1, limit };
//     const response = {
//       statusCode: 200,
//       body: { items: products, previous },
//     };

//     const processor = getProcessor();

//     //Act
//     const expRes = response;
//     const actRes = await processor.getProducts(reqMock, resMock);

//     //Expect
//     expect(actRes).toBeDefined();
//     expect(actRes.length).toEqual(expRes.length);
//     expect(actRes).toEqual(expRes);

//     expect(daoMock.getProducts).toBeCalledTimes(1);
//     expect(daoMock.getProducts).toBeCalledWith(startIndex, endIndex);

//     expect(resMock.json).toBeCalledTimes(1);
//     expect(resMock.json).toBeCalledWith({ items: products, previous });
//   });
