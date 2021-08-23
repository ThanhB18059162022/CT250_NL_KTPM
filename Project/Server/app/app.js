import express, { json, urlencoded } from "express";
import cors_handler from "./routers/cors_handler.js";
import router from "./routers/router.js";
import config from "./config.js";

const app = express();
const port = config.port || 8001;

// Lọc các tên miền có quyền truy cập
cors_handler(app);

//Thêm middleware cho Post với Put cái này dùng xử lý body(JSON) của request
// Request Object as a JSON Object
app.use(json());
// Request Object as strings or arrays
app.use(urlencoded({ extended: true }));

router(app);

app.listen(port, () => {
  console.log("Server is listening on " + port);
});
