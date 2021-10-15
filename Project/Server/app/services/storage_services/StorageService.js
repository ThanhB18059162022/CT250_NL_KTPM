module.exports = class StorageService {
  static storageBase = new Map();

  //#region GET

  get = async (key) => StorageService.storageBase.get(key);

  getAll = async () => {
    const orders = Array.from(
      StorageService.storageBase,
      ([_, value]) => value
    );

    return orders;
  };

  getSize = async () => StorageService.storageBase.size;

  //#endregion

  //#region  SET

  set = async (key, data) => StorageService.storageBase.set(key, data);

  // Set giá trị sau 1 số giây sẽ xóa
  setex = async (key, seconds, data) => {
    const { storageBase } = StorageService;

    storageBase.set(key, data);

    // Đổi sang mili
    const miliSec = seconds * 1000;

    //Xóa
    setTimeout(() => {
      storageBase.delete(key);
    }, miliSec);
  };

  //#endregion

  delete = async (key) => StorageService.storageBase.delete(key);

  emptyData = (data) => data === undefined;
};
