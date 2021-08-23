const cors = require("cors");
const config = require("../config");

// Cho phép tên miền ngoài sử dụng
const allowedOriginDomains = config.corsDomains;

const corsOptions = {
  origin: "*",
};

//Self tên miền của api - tool các công cụ test api
const selfOrTool = (origin) => !origin;

const inAllowdedList = (origin) => allowedOriginDomains.indexOf(origin) !== -1;

module.exports = (app) => {
  app.use(cors(corsOptions));
};
