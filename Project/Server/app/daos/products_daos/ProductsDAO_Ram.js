const products = [];
const img = "https://dummyimage.com/600x400/000/0fffff&text=Coming+soon";

// https://www.thegioididong.com/dtdd/samsung-galaxy-z-fold-3
module.exports = class ProductsDAO_Ram {
  constructor() {
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
            flash: true,
            videoQuality: [
              "4K 2160p@60fps",
              "FullHD 1080p@240fps",
              "FullHD 1080p@60fps",
              "HD 720p@960fps",
            ],
            features: [
              "AI Camera",
              "Ban đêm (Night Mode)",
              "Chuyên nghiệp (Pro)",
              "Chạm lấy nét",
              "Chống rung quang học (OIS)",
              "Góc rộng (Wide)",
              "Góc siêu rộng (Ultrawide)",
              "HDR",
              "Làm đẹp",
              "Lấy nét theo pha (PDAF)",
              "Nhận diện khuôn mặt",
              "Quay Siêu chậm (Super Slow Motion)",
              "Quay chậm (Slow Motion)",
              "Toàn cảnh (Panorama)",
              "Tự động lấy nét (AF)",
              "Xóa phông",
              "Zoom quang học",
            ],
          },
          //Trước
          font: {
            spec: "10 MP & 4 MP 8 MP",
            features: [
              " HDR",
              "Làm đẹp",
              "Nhận diện khuôn mặt",
              "Quay video 4K",
              "Quay video Full HD",
              "Quay video HD",
              "Tự động lấy nét (AF)",
              "Xóa phông",
            ],
          },
        },
        prod_hardwareAndOS: {
          os: "Android 11",
          cpu: "Snapdragon 888 8 nhân",
          cpuSpec: "1 nhân 2.84 GHz, 3 nhân 2.42 GHz & 4 nhân 1.8 GHz",
          gpu: "Adreno 660",
        },
        prod_ramAndStorage: {
          ram: "12 GB",
          storage: "256 GB",
          storageAvailable: "223 GB",
        },
        prod_network: {
          telecom: "5G",
          SIM: "2 Nano Sim",
          Wifi: [
            "Dual-band (2.4 GHz/5 GHz)",
            "Wi-Fi 802.11 a/b/g/n/ac/ax",
            "Wi-Fi Direct",
            "Wi-Fi hotspot",
          ],
          GPS: ["A-GPS", "BDS", "GALILEO", "GLONASS"],
          Bluetooth: ["A2DP", "LEv", "5.2"],
          connector: "Type-C",
          others: "NFCOTG",
        },
        prod_batteryAndCharger: {
          battery: "4400 mAh",
          batteryType: "Li-ion",
          chargeType: "25W",
          chargerTech: "Sạc không dây, Sạc pin nhanh",
        },
        prod_utilities: {
          security: "Mở khoá vân tay cạnh viền",
          specialFeature: "Samsung Pay Âm thanh AKG",
          waterproof: "IPX8",
          video: ["3GP", "AVI", "H.264(MPEG4-AVC)", "MP4", "WMV"],
          audio: ["AAC", "AMR", "FLAC", "MP3", "Midi", "OGG", "WAV", "WMA"],
        },
        prod_design: {
          structural: "Nguyên khối",
          material: "Khung nhôm & Mặt lưng kính cường lực",
          sizeAndWeigth:
            "Dài 158.2 mm - Ngang 128.1 mm - Dày 6.4 mm - Nặng 271 g",
        },
        prod_status: "",
        prod_img: `http://localhost:8000/img/${1}/prod_img1.jpeg`,
        prod_price: {
          origin: 44990000,
          discount: 0.0,
        },
      };

      products.push(product);
    }
  }

  getProducts = async (startIndex, endIndex) => {
    let prods = products.slice(startIndex, endIndex).map((p) => ({
      prod_no: p.prod_no,
      prod_name: p.prod_name,
      prod_cpu: p.prod_hardwareAndOS.cpu,
      prod_ram: p.prod_ramAndStorage.ram,
      prod_battery: p.prod_batteryAndCharger.battery,
      prod_screen: "7.2'",
      prod_img: p.prod_img,
      prod_price: p.prod_price.origin,
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
