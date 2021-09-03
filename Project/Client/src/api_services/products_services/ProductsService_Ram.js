const products = [];

export default class ProductsService_Ram {
  constructor() {
    for (let i = 1; i <= 100; i++) {
      const product = {
        prod_no: i,
        prod_name: "Galaxy Z Fold3 | Z Flip3 5G",
        prod_cpu: "Snapdragon 888",
        prod_ram: "8 GB",
        prod_battery: "4400 mAh",
        prod_img: `Chả có ảnh`,
        prod_price: 12990000,
      };

      products.push(product);
    }
  }

  getProducts = async () => {
    return {
      items: products.slice(1, 24),
      next: { page: 3, limit: 24 },
      previous: { page: 1, limit: 24 },
    };
  };
}
