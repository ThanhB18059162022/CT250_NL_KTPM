const products = [];
const img = "https://dummyimage.com/600x400/000/0fffff&text=Coming+soon";
// https://fptshop.com.vn/dien-thoai/iphone-12-pro-max?dung-luong=128gb
// https://www.thegioididong.com/dtdd/iphone-12#top-tskt
module.exports = class ProductsDAO_Ram {
  constructor() {
    for (let i = 1; i <= 1000; i++) {
      const product = {
        prod_no: i,
        prod_name: "Galaxy Z Fold3 | Z Flip3 5G",
        prod_mfg: new Date("2021-8-1"),
        prod_releaseDate: new Date("2021-8-1"),
        prod_screen: {
          size: "6.43'",
          type: "IPS FHD+",
          resolution: "1080 x 2400 Pixel",
          glass: "Gorilla Glass 3",
          rate: "",
        },
        prod_camera: {
          back: "48 MP",
          font: "8 MP",
        },
        prod_size: "",
        prod_battery: "4400 mAh",
        prod_os: "Android 11",
        prod_hardware: {
          cpu: "Snapdragon 888",
          ram: "8 GB",
          gpu,
        },
        nsx, //nhà sản xuất
        sim,
        prod_status: "",
        prod_img: `/img/${1}/prod_img1.png`,
        prod_img: img,
        prod_price: 12990000,
      };

      products.push(product);
    }
  }

  getProducts = async (startIndex, endIndex) => {
    let prods = products.slice(startIndex, endIndex).map((p) => ({
      prod_no: p.prod_no,
      prod_name: p.prod_name,
      prod_cpu: p.prod_hardware.cpu,
      prod_ram: p.prod_hardware.ram,
      prod_battery: p.prod_battery,
      prod_img: p.prod_img,
      prod_price: p.prod_price,
    }));

    return prods;
  };

  getProductByNo = async (prod_no) => {
    const product = products.filter((p) => p.prod_no === prod_no);

    return product[0];
  };

  getProductByName = async (prod_name) => {
    const product = products.filter((p) => p.prod_name === prod_name)[0];

    return product;
  };
};
//#region
// const product1 = [
//   {
//     prod_no: 1,
//     prod_name: "Galaxy Z Fold3 | Z Flip3 5G",
//     prod_mfg: new Date("2021-8-1"),
//     prod_releaseDate: new Date("2021-8-1"),
//     prod_screen: {
//       size: "6.43'",
//       type: "IPS FHD+",
//       resolution: "1080 x 2400 Pixel",
//       glass: "Gorilla Glass 3",
//     },
//     prod_camera: {
//       back: "48 MP",
//       font: "8 MP",
//     },
//     prod_size: "",
//     prod_battery: "4400 mAh",
//     prod_os: "Android 11",
//     prod_hardware: {
//       cpu: "Snapdragon 888",
//       memory: "8 GB",
//     },
//     prod_status: "",
//     prod_price: 12990000,
//   },
//   {
//     prod_no: 2,
//     prod_name: "iPhone 12 64GB",
//     prod_screen: "6.1'",
//     prod_hardware: {
//       cpu: "A14 Bionic",
//       memory: "4 GB",
//     },
//     prod_battery: "2815 mAh",
//     prod_img: "link",
//     prod_price: 19699000,
//   },
//   {
//     prod_no: 3,
//     prod_name: "Xiaomi Redmi 10 4GB-128GB",
//     prod_screen: "6.5'",
//     prod_hardware: {
//       cpu: "MediaTek Helio G88A14 Bionic",
//       memory: "4 GB",
//     },
//     prod_battery: "5000 mAh",
//     prod_img: "link",
//     prod_price: 4290000,
//   },
// ];
//#endregion
