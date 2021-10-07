const fs = require("fs");

module.exports = class FileService {
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

  removeDirAsync = (path) =>
    new Promise((resolve, reject) => {
      fs.rmdir(path, (error, files) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(files);
        }
      });
    });

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
