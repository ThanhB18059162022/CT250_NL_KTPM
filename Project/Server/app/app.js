const express = require("express");
const app = express();
const cors_handler = require("./routers/cors_handler");
const router = require("./routers/router");

const config = require("./config.json");
const port = config.port || 8001;

// Lọc các tên miền có quyền truy cập
cors_handler(app);

//Thêm middleware cho Post với Put cái này dùng xử lý body(JSON) của request
// Request Object as a JSON Object
app.use(express.json());
// Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(port, () => {
  console.log("Server is listening on " + port);
});
