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

  redirect = jest.fn();
}

class PaymentValidatorMock {
  existSaveOrder = jest.fn((order) => {
    return order !== undefined;
  });

  validateCart = jest.fn((cart) => {
    return {
      hasAnyError: cart.products === undefined,
    };
  });

  validatePayPalOrderID = jest.fn((id) => {
    return { hasAnyError: id === undefined };
  });

  validateId = jest.fn((id) => {
    return { hasAnyError: id === undefined };
  });

  validateSaveOrderId = jest.fn((id) => {
    return { hasAnyError: isNaN(id) };
  });

  validateUrl = jest.fn((url) => {
    return { hasAnyError: url === "//" };
  });
}

class PaymentDAOMock {
  getOrderProduct = jest.fn((prod_no) => {
    return { prod_no };
  });

  saveOrder = jest.fn((order) => {
    return { ...order, paid: true };
  });

  getSaveOrder = jest.fn((id) => {
    return id > 0 ? {} : undefined;
  });
}

class CurrencyExchangeServiceMock {
  convert = jest.fn(() => {
    return this;
  });

  to = jest.fn();

  roundTakeTwo = jest.fn((total) => total);
}

module.exports = {
  ResponseMock,
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
};
