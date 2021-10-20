// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Services

const ApiCaller = require("./ApiCaller");

const JwtService = require("./jwt_services/JwtService");

const PasswordService = require("./jwt_services/PasswordService");

const StorageService = require("./storage_services/StorageService");
const StorageServiceRedis = require("./storage_services/StorageServiceRedis");

const CurrencyExchangeService = require("./payments_services/CurrencyExchangeService");
const PayPalService = require("./payments_services/paypal_services/PayPalService");
const StripeService = require("./payments_services/stripe_services/StripeService");
const ZaloPayService = require("./payments_services/zalopay_services/ZaloPaySerivce");

const ImageService = require("./file_services/ImageService");

module.exports = {
  ApiCaller,

  JwtService,

  PasswordService,

  StorageService,

  // StorageService: StorageServiceRedis,

  CurrencyExchangeService,
  PayPalService,
  StripeService,
  ZaloPayService,

  ImageService,
};
