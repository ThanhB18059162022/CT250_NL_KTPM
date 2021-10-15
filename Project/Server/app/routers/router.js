const authenticationRouter = require("./authentication_routers/authenticationRouter");
const productsRouter = require("./products_routers/productsRouter");
const paymentsRouter = require("./payments_routers/paymentsRouter");
const moderatorsRouter = require("./moderators_routers/moderatorsRouter");
const feedbackRouter = require("./feedback_routers/feedbackRouter");

//#region Auth
const config = require("../config");

const {
  AuthenticationValidator,
} = require("../validators/validatorsContainer");
const { JwtService } = require("../services/servicesContainer");
const {
  AuthenticationProcessor,
} = require("../processors/processorsContainer");
const {
  AuthenticationController,
} = require("../controllers/controllersContainer");
const authController = new AuthenticationController(getAuthProc(), config);

function getAuthProc() {
  const validator = new AuthenticationValidator();
  const jwt = new JwtService(config.jwt.secretKey);

  return new AuthenticationProcessor(validator, jwt);
}

//#endregion

// Mỗi controller sẽ có mỗi router
module.exports = (app) => {
  app.use("/api/authentication", authenticationRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/payments", paymentsRouter);
  app.use("/api/feedback", feedbackRouter);

  // Từ đây cái nào cũng phải đăng nhập
  app.use(authController.authenticate);
  app.use("/api/moderators", moderatorsRouter);
};
