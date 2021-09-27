const products = [];

// Lấy đánh giá mới nhất vs số lượng

// https://www.thegioididong.com/dtdd/samsung-galaxy-z-fold-3
module.exports = class ProductsDAO_Ram {
  constructor(baseImgUri) {
    for (let i = 1; i <= 100; i++) {
      const product = {
        prod_no: i,
        prod_name: "Galaxy Z Fold3 | Z Flip3 5G",
        //nhà sản xuất
        prod_manufacturer: {
          brand_name: "Samsung",
          releaseDate: new Date("2021-8-1"), // Ngày ra mắt
          madeIn: "Trung Quốc",
        },
        prod_screen: {
          type: "Dynamic AMOLED 2X",
          resolution: "Full HD+ (1768 x 2208 Pixels)",
          size: "Chính 7.6' & Phụ 6.2' - Tần số quét 120 Hz",
          glass: "Kính cường lực Corning Gorilla Glass Victus",
        },
        prod_camera: {
          // Sau
          rear: {
            spec: "3 camera 12 MP",
            videoQuality:
              "4K 2160p@60fps, FullHD 1080p@240fps, FullHD 1080p@60fps, HD 720p@960fps",
          },
          //Trước
          font: "10 MP & 4 MP 8 MP",
        },
        prod_hardwareAndOS: {
          os: "Android 11",
          cpu: "Snapdragon 888 8 nhân",
          cpuSpec: "1 nhân 2.84 GHz, 3 nhân 2.42 GHz & 4 nhân 1.8 GHz",
          gpu: "Adreno 660",
        },
        prod_network: {
          telecom: "5G",
          SIM: "2 Nano Sim",
          Wifi: "Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi Direct, Wi-Fi hotspot",
          GPS: "A-GPS, BDS, GALILEO, GLONASS",
          Bluetooth: "A2DP, LEv, 5.2",
          connector: "Type-C",
          others: "NFC, OTG",
        },
        prod_batteryAndCharger: {
          battery: "4400 mAh",
          batteryType: "Li-ion",
          chargeType: "25W",
        },
        // Tiện ích Xài Map
        prod_utilities: [
          { "Bảo mật": "Mở khoá vân tay cạnh viền" },
          { "Tính năng đặc biệt": "Samsung Pay Âm thanh AKG" },
          { "Kháng nước, bụi": "IPX8" },
        ],
        prod_design: {
          structural: "Nguyên khối",
          material: "Khung nhôm & Mặt lưng kính cường lực",
          size: "Dài 158.2 mm - Ngang 128.1 mm - Dày 6.4 mm",
          weight: "271 g",
        },
        //Review
        prod_feedbacks: [
          {
            fb_cusomter: {
              cus_name: "Cus1",
              cus_sex: "Nam",
            },
            fb_content: "Sản phẩm chưa ra mà hóng quá",
            fb_time: new Date("2021-08-17"),
            // Phản hồi
            fb_replies: [
              {
                rep_mod: "Mod1",
                rep_content: "Cám ơn anh đã ủng hộ",
                rep_time: new Date("2021-08-17"),
              },
            ],
          },
          {
            fb_cusomter: {
              cus_name: "Cus2",
              cus_sex: "Nữ",
            },
            fb_content: "Sản phẩm đẹp quá",
            fb_time: new Date("2021-08-18"),
            // Phản hồi
            fb_replies: [
              {
                rep_mod: "Mod1",
                rep_content: "Cám ơn chị đã ủng hộ",
                rep_time: new Date("2021-08-18"),
              },
            ],
          },
        ],
        prod_status: "",
        prod_imgs: [
          `${baseImgUri}/img/${1}/prod_img.jpg`,
          `${baseImgUri}/img/${1}/prod_img1.jpg`,
          `${baseImgUri}/img/${1}/prod_img2.jpg`,
          `${baseImgUri}/img/${1}/prod_img3.jpg`,
          `${baseImgUri}/img/${1}/prod_img4.jpg`,
        ],
        prod_details: [
          {
            ram: "12 GB",
            storage: "256 GB",
            storageAvailable: "223 GB",
            price: 41990000,
            totalProducts: 20, // Tổng sản phẩm
            soldProducts: 5, // Đã bán
          },
          {
            ram: "12 GB",
            storage: "512 GB",
            storageAvailable: "480 GB",
            price: 44990000,
            totalProducts: 20, // Tổng sản phẩm
            soldProducts: 5, // Đã bán
          },
          {
            ram: "12 GB",
            storage: "512 GB",
            storageAvailable: "480 GB",
            price: 44990000,
            totalProducts: 20,
            soldProducts: 5,
          },
        ],
      };

      products.push(product);
    }
  }
  //
  getProducts = async (startIndex, endIndex) => {
    let prods = products.slice(startIndex, endIndex).map((p) => {
      const {
        prod_no,
        prod_name,
        prod_imgs,
        prod_hardwareAndOS,
        prod_batteryAndCharger,
        prod_details,
      } = p;

      const even = prod_no % 2;

      return {
        prod_no,
        prod_name,
        prod_screen: this.getScreenSize(p),
        prod_cpu: prod_hardwareAndOS.cpu,
        prod_ram: prod_details[even].ram,
        prod_battery: prod_batteryAndCharger.battery,
        prod_img: prod_imgs[0],
        prod_price: prod_details[even].price,
        prod_os: prod_hardwareAndOS.os,
        prod_detailsLength: prod_details.length,
      };
    });

    return prods;
  };

  getProductsByPrice = async (min, max, startIndex, endIndex) => {
    let prods = products
      .filter((p) => this.inRange(p, min, max))
      .slice(startIndex, endIndex)
      .map((p) => {
        const {
          prod_no,
          prod_name,
          prod_imgs,
          prod_hardwareAndOS,
          prod_batteryAndCharger,
          prod_details,
        } = p;

        const even = prod_no % 2;

        return {
          prod_no,
          prod_name,
          prod_screen: this.getScreenSize(p),
          prod_cpu: prod_hardwareAndOS.cpu,
          prod_ram: prod_details[even].ram,
          prod_battery: prod_batteryAndCharger.battery,
          prod_img: prod_imgs[0],
          prod_price: prod_details[even].price,
        };
      });

    return prods;
  };

  inRange = (p, min, max) => {
    const { price } = p.prod_details[0];

    return price >= min && price <= max;
  };

  getScreenSize = (product) => {
    // Kích thước màn hình dạng 7.6'
    const rgx_screen = /\d\.\d'/;
    const size = rgx_screen.exec(product.prod_screen.size);

    return size[0];
  };

  getProductsFeedbacks() {}

  getProductByNo = async (prod_no) => {
    const product = products.filter((p) => p.prod_no === prod_no)[0];

    return product;
  };

  getProductByName = async (prod_name) => {
    const product = products.filter((p) => p.prod_name === prod_name)[0];

    return product;
  };

  // Kiểm rỗng
  emptyData = (product) => {
    return product === undefined;
  };
};
