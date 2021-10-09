const ModelDAO = require("../ModelDAO");

module.exports = class AuthenticationDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  login = async (loginModel) => {
    //  const modHasUsername = await this.sqldao.
  };

  getUserToken = async (username) => {
    const user = { username, role: "emp" };

    if (username == "admin") {
      user.role = "admin";
    }

    return user;
  };
};
