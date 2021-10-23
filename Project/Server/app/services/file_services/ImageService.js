const FileService = require("./FileService");

module.exports = class ImageService extends FileService {
  constructor(baseImgUri) {
    super();
    this.baseImgUri = baseImgUri;
    this.path = "./public/images";
  }

  getProductImages = async (prod_no) => {
    try {
      const files = await this.readDirAsync(`${this.path}/product${prod_no}`);

      if (files.length == 0) {
        return [`${this.baseImgUri}/images/default/phone.png`];
      }

      const filesPath = files.map(
        (f) => `${this.baseImgUri}/images/product${prod_no}/${f}`
      );

      return filesPath;
    } catch (error) {
      return [`${this.baseImgUri}/images/default/phone.png`];
    }
  };

  // Lưu hình ảnh
  // Imgs mảng các ảnh base64
  saveProductImages = async (prod_no, imgs = []) => {
    const path = `${this.path}/product${prod_no}`;

    if (this.exist(path)) {
      // Xóa thư mục
      this.removeDir(path);
    }

    await this.createDirAsync(path);

    await this.writeToDisk(path, imgs[0], "");

    for (let i = 1; i < imgs.length; i++) {
      await this.writeToDisk(path, imgs[i], i);
    }
  };

  writeToDisk = async (path, base64Img, i) => {
    const imgData = base64Img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    const data = Buffer.from(imgData[2], "base64");

    this.writeFileAsync(`${path}/prod_img${i}.png`, data);
  };

  // Sửa
};
