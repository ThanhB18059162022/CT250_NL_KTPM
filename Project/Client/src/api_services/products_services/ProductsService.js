// Mới thêm dùng test

export default class ProductsService {
  constructor(apiCaller) {
    this.apiCaller = apiCaller;
  }

  getProducts = async () => {
    const response = await this.apiCaller.get("products");

    return response.data;
  };
}
