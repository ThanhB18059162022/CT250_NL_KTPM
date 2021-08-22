// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controller
const AuthenticationController = require("./AuthenticationController");
const NotesController = require("./NotesController");
const CacThuongHieuController = require("./CacThuongHieuController");

module.exports = {
  AuthenticationController: AuthenticationController,
  NotesController: NotesController,
  CacThuongHieuController,
};
