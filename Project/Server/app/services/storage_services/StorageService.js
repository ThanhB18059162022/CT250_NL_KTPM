module.exports = class StorageService {
  static storageBase = new Map();

  getSize = () => StorageService.storageBase.size;

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

  get = async (key) => StorageService.storageBase.get(key);

  delete = async (key) => StorageService.storageBase.delete(key);

  emptyData = (data) => data === undefined;
};
