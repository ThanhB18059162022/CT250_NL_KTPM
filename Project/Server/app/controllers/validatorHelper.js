// Lớp tạo kết quả xác thực dữ liệu
// Trả về đối tượng có 3 thuộc tính
// hasAnyError - bool có lỗi hay không
// key - string khóa bị lỗi trong json
// error - [] mảng chuỗi lỗi

function getValidationResult(schema, data) {
  const result = schema.validate(data);

  const hasAnyError = result.error !== undefined;
  if (hasAnyError) {
    const {
      message,
      context: { key },
    } = result.error.details[0];

    const { value } = result;

    return { hasAnyError, value, error: { key, message } };
  }

  return { hasAnyError };
}

module.exports = { getValidationResult };
