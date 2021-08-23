import { Injectable } from "@angular/core";
import ApiHelper from "./api-helper";
import ApiCallerService from "../api_caller/api-caller.service";

class AuthenticationService {
  JwtKey = ApiHelper.JwkToken;

  constructor(apiCaller) {}

  login = async (user) => {
    try {
      const tokenBearer =
        (await this.apiCaller.post) <
        TokenPlaceHolder >
        ("jwtauthentication/gettoken", user);

      this.storeToStorage(tokenBearer);

      return true;
    } catch {
      return false;
    }
  };

  getUser = async () => {
    try {
      return (await this.apiCaller.get) < User > "jwtauthentication/getuser";
    } catch {
      return null;
    }
  };

  logout = () => this.removeTokenInStorage();

  storeToStorage = (TokenPlaceHolder) =>
    localStorage.setItem(this.JwtKey, TokenPlaceHolder.token);

  removeTokenInStorage = () => localStorage.removeItem(this.JwtKey);
}

// DTOs

class User {
  constructor(username, password, id) {}
}

export class TokenPlaceHolder {
  constructor(token) {}
}
