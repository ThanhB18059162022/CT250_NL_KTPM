class ResponseMock {
  constructor() {
    this.statusCode = 200;
  }

  status = jest.fn((statusCode) => {
    this.statusCode = statusCode;

    return this;
  });

  json = jest.fn(async (body) => {
    const { statusCode } = this;

    return { statusCode, body };
  });
}

class PaymentValidatorMock {
  validateCart = jest.fn((cart) => {
    return {
      hasAnyError: cart.products === undefined,
    };
  });

  validatePayPalOrderID = jest.fn((id) => {
    return { hasAnyError: id === undefined };
  });

  validateStripeOrderId = jest.fn((id) => {
    return { hasAnyError: id === undefined };
  });

  validateUrl = jest.fn((url) => {
    return { hasAnyError: url === undefined };
  });
}

class PaymentDAOMock {
  saveOrder = jest.fn((order) => {
    return { ...order, paid: true };
  });
}

class CurrencyExchangeServiceMock {
  roundTakeTwo = jest.fn((total) => total);
}

module.exports = {
  ResponseMock,
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
};
