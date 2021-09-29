const axios = require("axios");

//Lớp adapter dành cho axios
module.exports = class ApiCaller {
  constructor() {
    this.axiosApi = axios.default;
  }

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
};
