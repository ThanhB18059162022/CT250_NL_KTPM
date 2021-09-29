// Tham khảo https://joi.dev/api/?v=17.4.2
//https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs

const Joi = require("joi");

// Lớp xác thực dữ liệu truyền vào có hợp lệ hay không
// Xài joi để xác thực
// Abstract class
module.exports = class Validator {
  constructor() {
    if (this.constructor === Validator) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.joi = Joi;
  }

  // Lớp tạo kết quả xác thực dữ liệu
  // Trả về đối tượng có 3 thuộc tính
  // hasAnyError - bool có lỗi hay không
  // key - string khóa bị lỗi trong json
  // error - [] mảng chuỗi lỗi
  getValidationResult = (schema, data) => {
    const result = schema.validate(data);

    const hasAnyError = result.error !== undefined;
    if (hasAnyError) {
      const { message } = result.error.details[0];

      return {
        hasAnyError,
        error: `Error: ${message}`,
      };
    }

    return { hasAnyError };
  };
};
