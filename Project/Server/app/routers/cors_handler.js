import cors from "cors";
import config from "../config.js";

// Cho phép tên miền ngoài sử dụng
const allowedOriginDomains = config.corsDomains;

const corsOptions = {
  origin: function (origin, callback) {
    if (selfOrTool(origin) || inAllowdedList(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

//Self tên miền của api - tool các công cụ test api
const selfOrTool = (origin) => !origin;

const inAllowdedList = (origin) => allowedOriginDomains.indexOf(origin) !== -1;

export default (app) => {
  app.use(cors(corsOptions));
};
