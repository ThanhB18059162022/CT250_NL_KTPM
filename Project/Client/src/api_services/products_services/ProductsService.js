// Mới thêm dùng test

export default class ProductsService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  getProducts = async () => {
    
    const products = await this.apiCaller.get("/products");

    return products;

  };
}
