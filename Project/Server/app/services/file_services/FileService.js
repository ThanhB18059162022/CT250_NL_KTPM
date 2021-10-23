const fs = require("fs");

module.exports = class FileService {
  // Kiểm tra thưc mục hoặc file tồn tại
  exist = (path) => fs.existsSync(path);

  createDirAsync = (path) =>
    new Promise((resolve, reject) => {
      fs.mkdir(path, (error, files) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(files);
        }
      });
    });

  readDirAsync = (path) =>
    new Promise((resolve, reject) => {
      fs.readdir(path, (error, files) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(files);
        }
      });
    });

  // Xóa thư mục rỗng lẫn không rỗng
  removeDir = (path) => fs.rmdirSync(path, { recursive: true, force: true });

  readFileAsync = (path, encoded) =>
    new Promise((resolve, reject) => {
      fs.readFile(path, encoded, (error, file) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(file);
        }
      });
    });

  writeFileAsync = (path, data, encoded) =>
    new Promise((resolve, reject) => {
      fs.writeFile(path, data, encoded, (error) => {
        if (error) {
          return reject(error);
        } else {
          return resolve();
        }
      });
    });

  deleteFileAsync = (path) =>
    new Promise((resolve, reject) => {
      fs.unlink(path, (error) => {
        if (error) {
          return reject(error);
        } else {
          return resolve();
        }
      });
    });
};
