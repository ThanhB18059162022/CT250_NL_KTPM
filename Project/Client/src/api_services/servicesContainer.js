import ApiCaller from "./ApiCaller";

import ProductsServiceApi from "./products_services/ProductsService";
// import ProductsService_Ram from "./products_services/ProductsService_Ram";

const caller = new ApiCaller()

export { caller, ProductsServiceApi as ProductsService };
