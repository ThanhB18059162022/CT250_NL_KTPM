// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Services

const ApiCaller = require("./ApiCaller");

const JwtService = require("./jwt_services/JwtService");

const CurrencyExchangeService = require("./payments_services/CurrencyExchangeService");
const PayPalService = require("./payments_services/paypal_services/PayPalService");
const StripeService = require("./payments_services/stripe_services/StripeService");
const ZaloPayService = require("./payments_services/zalopay_services/ZaloPaySerivce");

module.exports = {
  ApiCaller,

  JwtService,

  CurrencyExchangeService,
  PayPalService,
  StripeService,
  ZaloPayService,
};
