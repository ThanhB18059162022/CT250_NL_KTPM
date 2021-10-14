import ApiHelper from "../ApiHelper";

export default class AuthenticationService {
  JwtKey = ApiHelper.JwkToken;

  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  login = async (user) => {
    try {
      const tokenBearer = await this.apiCaller.post(
        "authentication/login",
        user
      );

      this.storeToStorage(tokenBearer);

      return true;
    } catch {
      return false;
    }
  };

  getUser = async () => await this.apiCaller.get("authentication/getuser");

  logout = () => this.removeTokenInStorage();

  storeToStorage = (TokenPlaceHolder) =>
    localStorage.setItem(this.JwtKey, TokenPlaceHolder.token);

  removeTokenInStorage = () => localStorage.removeItem(this.JwtKey);
}
