const express = require("express");
const app = express();
const corsHandler = require("./routers/corsHandler");
const router = require("./routers/router");
const { errorHandler } = require("./routers/routerErrorHandler");
const config = require("./config");
const port = config.port;
const cors = require('cors')
// Lọc các tên miền có quyền truy cập
// corsHandler(app);

// Static file chứa hình
app.use(express.static("public"));
app.use(cors())
//Thêm middleware cho Post với Put cái này dùng xử lý body(JSON) của request
// Request Object as a JSON Object
app.use(express.json({ limit: "5mb" })); // Kích thước tối đa 5mb
// Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

// Chuyển hướng đến các api endpoint
router(app);

// Nên để cái này cuối
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
