// Tham khảo https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware

const { isProduction } = require("../config");
const {
  NotValidError,
  NotExistError,
  ExistError,
} = require("../errors/errorsContainer");

// Middleware này dùng để bắt các lỗi bên phía server, như kết nối không được database, undefine

// Có 2 hàm hiển thị lỗi - dev sẽ hiện thêm stack trace

function errorHandler(error, _, res, _) {
  if (error instanceof NotValidError || error instanceof ExistError) {
    return badRequest(res, error);
  }

  if (error instanceof NotExistError) {
    return notFound(res, error);
  }

  return serverErr(res, error);
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

//#region Error

// 400
badRequest = (res, error) => {
  const result = getResult(error);

  return res.status(400).json(result);
};

// 401
unauthorized = (res, error) => {
  const result = getResult(error);

  return res.status(401).json(result);
};

// 404
notFound = (res, error) => {
  const result = getResult(error);

  return res.status(404).json(result);
};

// 500
serverErr = (res, error) => {
  const result = getResult(error);

  return res.status(500).json(result);
};

getResult = (error) => {
  const { name, message } = error;

  const result = { name, message };

  if (!isProduction) {
    result.stack = error.stack;
  }

  return result;
};

//#endregion
