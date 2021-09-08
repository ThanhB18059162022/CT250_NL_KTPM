// Lưu các hàm xài chung của các controller

// Trả về giá trị phân trang
// Tham khảo https://www.youtube.com/watch?v=ZX3qt0UWifc&list=PLYgHz24Rupn93bdW1uJszXkUh2h52dzn1
// getCallback hàm callback async lấy ra danh sách theo start - end Index
// Trả về đối tượng gồm 3 thuộc tính 1 là danh sách sản phẩm items
// Trang trước previous nếu có
// Trang sau next nếu có
async function getPaginatedResults(getCallback, page = 1, limit = 1) {
  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 1;
  }

  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const items = await getCallback(startIndex, endIndex);
  // console.log(items);
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
}

module.exports = {
  getPaginatedResults,
};
