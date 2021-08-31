const authentication = require("./authentication");
const authenticationRouter = require("./authenticationRouter");
const notesRouter = require("./notesRouter");
const productRouter = require("./productsRouter");

// Mỗi controller sẽ có mỗi router
module.exports = (app) => {
  app.use("/authentication", authenticationRouter);
  app.use("/api/products", productRouter);
  app.use("/api/notes", notesRouter);
  app.use(authentication);
};
