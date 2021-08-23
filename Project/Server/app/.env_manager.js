// Dùng thêm require file .env tạm thời chưa xài
requireEnvFileByPath = () => {
  const systemPath = require("path");
  require("dotenv").config({ path: systemPath.resolve(__dirname, ".env") });
};

export default requireEnvFileByPath;
