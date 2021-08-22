const authentication = require("./authentication");
const authentication_router = require("./authentication_router");
const notes_router = require("./notes_router");
const ThuongHieu_Router = require("./ThuongHieu_Router");

// Mỗi controller sẽ có mỗi router
module.exports = (app) => {
  app.use("/authentication", authentication_router);
  app.use("/api/notes", notes_router);
  app.use("/api/thuonghieu", ThuongHieu_Router);
  app.use(authentication);
};
