const redis = require("redis");
const { promisify } = require("util"); // callback => promise

module.exports = class StorageService {
  constructor(host = "redis") {
    this.client = redis.createClient({
      host, //ip
    });
  }

  //#region GET

  get = async (key) => {
    const getPromise = promisify(this.client.get).bind(this.client);

    return await getPromise(key);
  };

  getAll = async (keys) => {
    const data = [];

    for (let i = 0; i < keys.length; i++) {
      const value = await this.get(keys[i]);

      data.push(value);
    }

    return data;
  };

  getSize = async (name) => (await this.keys(name)).length;

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
    const setexPromise = promisify(this.client.setex).bind(this.client);

    await setexPromise(key, sec, data);
  };

  //#endregion

  delete = async (keys) => {
    const setexPromise = promisify(this.client.del).bind(this.client);

    return await setexPromise(keys);
  };

  emptyData = (data) => data === null;
};
