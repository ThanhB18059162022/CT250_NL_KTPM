const FileService = require("./FileService");

module.exports = class ImageService extends FileService {
  constructor(baseImgUri) {
    super();
    this.baseImgUri = baseImgUri;
    this.path = "./public/images/";
  }

  getProductImages = async (prod_no) => {
    const files = await this.readDirAsync(`${this.path}/product${prod_no}`);

    const filesPath = files.map(
      (f) => `${this.baseImgUri}/images/product${prod_no}/${f}`
    );

    return filesPath;
  };

  // Lưu hình ảnh
  // Sửa
};
