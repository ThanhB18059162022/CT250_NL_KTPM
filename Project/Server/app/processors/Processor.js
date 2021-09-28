const {
  InstantiateAbstractClassError,
  NotValidError,
  NotExistError,
  ExistError,
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
  getStartEndIndex = (page, limit) => {
    page = parseInt(page);
    if (isNaN(page)) {
      page = 1;
    }

    limit = parseInt(limit);
    if (isNaN(limit)) {
      limit = 1;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return { startIndex, endIndex };
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

  // Kiểm tra tồn tại trong CSDL
  checkExistAsync = async (getFuncAsync, emptyData, message) => {
    const data = await getFuncAsync();
    if (emptyData(data)) {
      throw new NotExistError(message);
    }

    return data;
  };

  // Đã tồn tại quăng lỗi khi exist - notvalid
  existData = async (asyncFunc, message) => {
    try {
      await asyncFunc();

      throw new ExistError(message);
    } catch (error) {
      if (!(error instanceof NotExistError)) {
        throw error;
      }
    }
  };

  // Kiểm tra thông tin tồn tại và không phải thông tin cũ
  existDataNotOldData = async (existAsyncFunc, newId, oldId) => {
    try {
      await existAsyncFunc();
    } catch (error) {
      // Không phải thông tin cũ quăng lỗi
      if (!(error instanceof ExistError && this.notOldData(newId, oldId))) {
        throw error;
      }
    }
  };

  // Kiểm tra khi cập nhật lại thông tin cũ
  notOldData = (newId, oldId) => {
    return newId === oldId;
  };

  //#endregion
};
