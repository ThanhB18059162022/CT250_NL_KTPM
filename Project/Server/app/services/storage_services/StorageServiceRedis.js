const redis = require("redis");
const { promisify } = require("util"); // callback => promise

module.exports = class StorageService {
  constructor(config) {
    const { host } = config;

    this.client = redis.createClient({
      host, //ip
    });
  }

  //#region GET

  get = async (key) => {
    const getPromise = promisify(this.client.get).bind(this.client);

    const value = await getPromise(key);

    return JSON.parse(value);
  };

  getAll = async () => {
    const keys = await this.keys("*");
    const data = [];

    for (let i = 0; i < keys.length; i++) {
      const value = await this.get(keys[i]);

      data.push(value);
    }

    return data;
  };

  getSize = async (name = "*") => (await this.keys(name)).length;

  keys = async (name) => {
    const keysPromise = promisify(this.client.keys).bind(this.client);

    return await keysPromise(name);
  };

  //#endregion

  //#region SET

  set = async (key, data) => {
    const setPromise = promisify(this.client.set).bind(this.client);

    await setPromise(key, data);
  };

  // Có đát
  setex = async (key, sec, data) => {
    const value = JSON.stringify(data);

    const setexPromise = promisify(this.client.setex).bind(this.client);

    await setexPromise(key, sec, value);
  };

  //#endregion

  delete = async (keys) => {
    const setexPromise = promisify(this.client.del).bind(this.client);

    return await setexPromise(keys);
  };

  emptyData = (data) => data === null;
};
