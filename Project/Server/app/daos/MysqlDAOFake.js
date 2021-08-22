module.exports = class MysqlConnectionFake {
  connect() {
    console.log("Fake mà");
  }
};
