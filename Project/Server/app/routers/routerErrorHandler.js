// Tham khảo https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware

// Middleware này dùng để bắt các lỗi bên phía server, như kết nối không được database, undefine

// Có 2 hàm hiển thị lỗi - dev sẽ hiện thêm stack trace
// Mặc định không có NODE_ENV là dev
const isDev = !process.env.NODE_ENV;

// Dùng khi lập trình hiện stacktrace
function devErrorHandler(err, req, res, next) {
  console.log(err);
  return res.status(500).json(err.stack);
}

// Dùng khi triển khai
function deployErrorHandler(err, req, res, next) {
  return res.status(500).json("Error occurred please try again");
}

let errorHandler = deployErrorHandler;

// Nếu là môi trường phát tiển thì hiển thị stack trace
if (isDev) {
  errorHandler = devErrorHandler;
}

// Dùng để bao các hàm cần xử lý lỗi wapper function
// func là hàm sẽ callback có thể gây lỗi
function errorCatch(func) {
  return function (req, res, next) {
    // Chuyển error sang middleware tiếp theo cũng là mấy cái handler
    return Promise.resolve(func(req, res, next)).catch(next);
  };
}

module.exports = {
  errorCatch,
  errorHandler, // Cái này nên app.use ở cuối
};
