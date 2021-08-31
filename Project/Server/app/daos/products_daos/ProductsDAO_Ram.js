const products = [
  {
    pro_no: 1,
    pro_name: "Xiaomi mi-10",
    pro_mfg: "2021",
    pro_releaseDate: new Date(),
    pro_screen: "blank",
    pro_camera: "32mp",
  },
  {
    pro_no: 2,
    pro_name: "Xiaomi mi-15",
    pro_mfg: "2021",
    pro_releaseDate: new Date(),
    pro_screen: "blank",
    pro_camera: "64mp",
  },
];

module.exports = class ProductsDAO_Ram {
  getProducts = async () => products;

  getProductByNo = async (pro_no) => {
    const product = products.filter((p) => p.pro_no == pro_no);

    return product;
  };

  getProductByName = async (pro_name) => {
    const product = products.filter((p) => p.pro_name === pro_name)[0];

    return product;
  };
};
