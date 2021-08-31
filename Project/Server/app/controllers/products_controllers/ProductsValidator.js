module.exports = class ProductsValidator {
  existProduct = (product) => {
    return product !== undefined;
  };

  validProduct = (product) => {
    return product !== undefined;
  };

  validNo = (pro_no) => {
    return pro_no > 0;
  };

  // Kiểm tra tên hợp lệ
  validName = (pro_name) => {
    return pro_name !== undefined;
  };
};
