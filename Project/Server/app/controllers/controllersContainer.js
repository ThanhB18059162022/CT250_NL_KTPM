// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controller
import AuthenticationController from "./AuthenticationController.js";
import NotesController from "./NotesController.js";
import CacThuongHieuController from "./CacThuongHieuController.js";

export {
  AuthenticationController as AuthenticationController,
  NotesController as NotesController,
  CacThuongHieuController,
};
