const authentication = require("./authentication");
const authenticationRouter = require("./authentication_routers/authenticationRouter");
const notesRouter = require("./notes_routers/notesRouter");
const productRouter = require("./products_routers/productsRouter");

// Mỗi controller sẽ có mỗi router
module.exports = (app) => {
  app.use("/authentication", authenticationRouter);
  app.use("/api/products", productRouter);
  app.use("/api/notes", notesRouter);
  app.use(authentication);
};
