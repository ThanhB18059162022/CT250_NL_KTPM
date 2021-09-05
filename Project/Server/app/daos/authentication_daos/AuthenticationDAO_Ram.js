module.exports = class AuthenticationDAO_Ram {
  login = async (loginModel) => {
    return loginModel.username === "valid" && loginModel.password === "valid";
  };

  getByUsername = async (username) => {
    username;
  };
};
