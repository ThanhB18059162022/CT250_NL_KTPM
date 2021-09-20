// Tham khảo https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware

// Middleware này dùng để bắt các lỗi bên phía server, như kết nối không được database, undefine

// Có 2 hàm hiển thị lỗi - dev sẽ hiện thêm stack trace
const isProduction = process.env.NODE_ENV === "production";

// Dùng khi lập trình hiện stacktrace
function devErrorHandler(err, req, res, next) {
  return res.status(500).json(err.stack);
}

// Dùng khi triển khai
function productionErrorHandler(err, req, res, next) {
  return res.status(500).json({
    message: "Error occurred please try again",
    info: err.message,
  });
}

let errorHandler = devErrorHandler;

// Nếu là môi trường triển khai thì Không hiển thị stack trace
if (isProduction) {
  errorHandler = productionErrorHandler;
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
