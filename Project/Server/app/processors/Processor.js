const {
  InstantiateAbstractClassError,
  NotValidError,
} = require("../errors/errorsContainer");

// Lưu các hàm xài chung của các controller
//Abstract class
module.exports = class Processor {
  constructor() {
    if (this.constructor === Processor) {
      throw new InstantiateAbstractClassError();
    }
  }

  //#region  Trả về giá trị phân trang

  // Tham khảo https://www.youtube.com/watch?v=ZX3qt0UWifc&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
  getIndexes = (page, limit) => {
    page = parseInt(page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    if (isNaN(limit) || limit < 0) {
      limit = 1;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return { startIndex, endIndex, pageIndex: page, limitIndex: limit };
  };

  // Giá trị phân trang
  getPaginatedResults = (items, page, limit) => {
    const pageResult = {
      items,
    };

    // Thêm trang phía sau
    // Kiểm tra nếu còn phần tử
    if (items.length >= limit) {
      pageResult.next = {
        page: page + 1,
        limit,
      };
    }

    // Thêm trang phía trước
    // Trang đầu không có trang trước
    if (page > 1) {
      pageResult.previous = {
        page: page - 1,
        limit,
      };
    }

    return pageResult;
  };

  //#endregion

  //#region  EX

  // Xác thực dữ liệu
  checkValidate = (validateFunc) => {
    const result = validateFunc();
    if (result.hasAnyError) {
      throw new NotValidError(result.error);
    }
  };

  //#endregion
};
