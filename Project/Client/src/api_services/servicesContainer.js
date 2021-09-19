import ApiCaller from "./ApiCaller";

import ProductsServiceApi from "./products_services/ProductsService";
// import ProductsService_Ram from "./products_services/ProductsService_Ram";

import PayPalPaymentSerivce from "./paypal_payment_service/PayPalPaymentService";

import StripePaymentService from "./stripe_payment/StripePaymentService";

const caller = new ApiCaller();

export {
  caller,
  ProductsServiceApi as ProductsService,
  PayPalPaymentSerivce,
  StripePaymentService,
};
