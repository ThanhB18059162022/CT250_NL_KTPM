// Kiểm tra môi trường triển khai
const isProduction = process.env.NODE_ENV === "production";

// Config cho production
let config = require("./serversettings.json");

if (!isProduction) {
  // Config cho development
  config = require("./serversettings.dev.json");
}

config.isProduction = isProduction;

module.exports = config;
