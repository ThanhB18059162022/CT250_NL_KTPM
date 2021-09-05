const jwt = require("jsonwebtoken");
const config = require("../config.json");

class AuthenticationController {
  login = async (req, res) => {
    const loginModel = req.loginModel || {};

    const loginModelIsNotValid = !this.loginModelInfoIsValid(loginModel);

    if (loginModelIsNotValid) {
      return res.status(400).json({});
    }

    const loginFailed = !this.loginSuccess(loginModel);

    if (loginFailed) {
      return res.status(404).json({});
    }

    const secretKey = config.secretKey || "SECRET_KEY is not exist";

    const user = {
      id: 12,
      username: "alex",
      name: "alexander",
    };

    //Tạo token hết đát trong 30p
    jwt.sign({ user }, secretKey, { expiresIn: "30m" }, (err, token) => {
      return err ? res.status(400).json({ err }) : res.json({ token });
    });
  };

  loginModelInfoIsValid = (loginModel) => {
    return true;
  };

  loginSuccess = (loginModel) => {
    return true;
  };
}

module.exports = AuthenticationController;
