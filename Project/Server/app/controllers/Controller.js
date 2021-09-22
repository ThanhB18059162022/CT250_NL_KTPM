// Lưu các hàm xài chung của các controller

//Abstract class
module.exports = class Controller {
  constructor() {
    if (this.constructor === Controller) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  //#region  Trả về giá trị phân trang

  // Tham khảo https://www.youtube.com/watch?v=ZX3qt0UWifc&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
  getStartEndIndex = (page, limit) => {
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page)) {
      page = 1;
    }

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

  // JSON lỗi trùng dữ liệu cho thuộc tính
  getDuplicateResult = (name) => {
    return {
      key: name,
      content: `${name} has already been taken.`,
    };
  };
};
