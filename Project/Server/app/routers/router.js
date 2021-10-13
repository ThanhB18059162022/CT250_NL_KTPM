const authenticationRouter = require("./authentication_routers/authenticationRouter");
const productsRouter = require("./products_routers/productsRouter");
const paymentsRouter = require("./payments_routers/paymentsRouter");
const moderatorsRouter = require("./moderators_routers/moderatorsRouter");
const feedbackRouter = require("./feedback_routers/feedbackRouter");

// Mỗi controller sẽ có mỗi router
module.exports = (app) => {
  app.use("/api/authentication", authenticationRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/payments", paymentsRouter);
  app.use("/api/moderators", moderatorsRouter);
  app.use("/api/feedback", feedbackRouter);
};
