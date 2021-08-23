import axios from "axios";
import ApiHelper from "./ApiHelper";

//Lớp adapter dành cho
class ApiCaller {
  constructor() {
    const baseUri = "http://localhost:8000/api";
    const jwkToken = ApiHelper.JwkToken;
    this.axiosApi = axios.create({
      baseURL: baseUri,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getToken(jwkToken),
      },
    });
  }

  // Có khoảng trắng giữa bearer với token
  getToken = (jwkToken) => `Bearer ${localStorage.getItem(jwkToken) ?? ""}`;

  get = async (uri) => await this.axiosApi.get(uri);

  post = async (uri, params) => await this.axiosApi.post(uri, params);

  put = async (uri, params) => await this.axiosApi.put(uri, params);

  delete = async (uri) => await this.axiosApi.delete(uri);
}

export default ApiCaller;
