import axios from "axios";
import ApiHelper from "./ApiHelper";

//Lớp adapter dành cho axios
// Bổ sung thêm header cho jwt
export default class ApiCaller {
  constructor(baseUri = "http://localhost:8000/api") {
    this.baseUri = baseUri;

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

  get = async (uri) => {
    const res = await this.axiosApi.get(uri);

    return res.data;
  };

  post = async (uri, params) => {
    const res = await this.axiosApi.post(uri, params);

    return res.data;
  };

  put = async (uri, params) => {
    const res = await this.axiosApi.put(uri, params);

    return res.data;
  };

  delete = async (uri) => {
    const res = await this.axiosApi.delete(uri);

    return res.data;
  };
}
