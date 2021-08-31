// Kham khảo https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware

// Có 2 hàm hiển thị lỗi - dev sẽ hiện stack trace

const isDev = true;

// Dùng để bao các hàm để xử lý lỗi
// func làm hàm sẽ được bọc trong errorCapture(func)
const errorCapture = (func) => (req, res, next) => {
  // Chuyển error sang midleware tiếp theo cũng là mấy cái hanlder
  return Promise.resolve(func(req, res, next)).catch(next);
};

// Dùng khi lập trình hiện stacktrace
function devErrorHandler(err, req, res, next) {
  return res.status(500).send(err.stack);
}

// Dùng khi triển khai
function deployErrorHandler(err, req, res, next) {
  return res.status(500).send("Error occurred please try again");
}

let errorHandler = deployErrorHandler;

// Nếu là môi trường phát tiển thì hiển thị stack trace
if (isDev) {
  errorHandler = devErrorHandler;
}

module.exports = {
  errorCapture,
  errorHandler, // Cái này nên app.use ở cuối
};
