//Can use relative path or absolute path
requireEnvFileByPath = () => {
  const systemPath = require("path");
  require("dotenv").config({ path: systemPath.resolve(__dirname, ".env") });
};

module.exports = requireEnvFileByPath;
