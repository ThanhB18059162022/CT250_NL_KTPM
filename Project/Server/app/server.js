const express = require("express");
const app = express();
const corsHandler = require("./routers/corsHandler");
const router = require("./routers/router");
const { errorHandler } = require("./routers/routerErrorHandler");
const config = require("./config");
const port = config.port;

// Lọc các tên miền có quyền truy cập
corsHandler(app);

// Static file chứa hình
app.use(express.static("public"));

//Thêm middleware cho Post với Put cái này dùng xử lý body(JSON) của request
// Request Object as a JSON Object
app.use(express.json());
// Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

// Chuyển hướng đến các api endpoint
router(app);

// Nên để cái này cuối
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
