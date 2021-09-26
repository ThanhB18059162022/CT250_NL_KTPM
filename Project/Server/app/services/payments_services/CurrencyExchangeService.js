module.exports = class CurrencyExchangeService {
  constructor(config) {
    const { baseCurrencyCode, exchangeRate } = config;

    this.amount = 0;
    this.fromCurrencyCode = baseCurrencyCode;
    this.toCurrencyCode = "";
    this.exchangeRate = exchangeRate;
  }

  convert = (amount) => {
    if (isNaN(amount) || amount < 0) {
      throw new Error("Not valid amount value");
    }

    this.amount = amount;

    return this;
  };

  from = (fromCurrencyCode) => {
    if (!fromCurrencyCode) {
      throw Error("Not valid from code");
    }

    this.fromCurrencyCode = fromCurrencyCode;

    return this;
  };

  to = async (toCurrencyCode) => {
    if (!toCurrencyCode) {
      throw Error("Not valid to code");
    }

    this.toCurrencyCode = toCurrencyCode;

    return this.calculate();
  };

  calculate = async () => {
    const exRate = await this.getExchangeRate();

    const roundAmount = this.roundTakeTwo(this.amount * exRate);

    return roundAmount;
  };

  getExchangeRate = async () => {
    if (this.fromCurrencyCode === this.toCurrencyCode) {
      return 1;
    }

    return this.exchangeRate[this.fromCurrencyCode][this.toCurrencyCode];
  };

  // Làm tròn 2 chữ số sau dấu chấm
  roundTakeTwo = (amount) => {
    const roundAmount = Math.round(amount * 100) / 100;

    return roundAmount;
  };
};
