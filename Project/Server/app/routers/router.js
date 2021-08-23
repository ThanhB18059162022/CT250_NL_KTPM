import authentication from "./authentication.js";
import authentication_router from "./authentication_router.js";
import notes_router from "./notes_router.js";
import ThuongHieu_Router from "./ThuongHieu_Router.js";

// Mỗi controller sẽ có mỗi router
export default (app) => {
  app.use("/authentication", authentication_router);
  app.use("/api/thuonghieu", ThuongHieu_Router);
  app.use("/api/notes", notes_router);
  app.use(authentication);
};
