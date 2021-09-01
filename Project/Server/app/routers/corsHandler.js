const cors = require("cors");
const config = require("../config");

// Cho phép tên miền ngoài sử dụng
const allowedOriginDomains = config.corsDomains;

const corsOptions = {
  origin: (origin, callback) => {
    if (selfOrTool(origin) || inAllowdedList(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

//Self tên miền của api - tool các công cụ test api
function selfOrTool(origin) {
  return !origin;
}

function inAllowdedList(origin) {
  return allowedOriginDomains.indexOf(origin) !== -1;
}

module.exports = (app) => {
  app.use(cors(corsOptions));
};
