class PaymentValidatorMock {
  validateCart = jest.fn((cart) => {
    return {
      hasAnyError: cart === undefined,
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
  emptyData = jest.fn((order) => {
    return order === undefined;
  });

  getOrderProduct = jest.fn((prod_no) => {
    if (prod_no == 666) return undefined;
    return { prod_no };
  });

  saveOrder = jest.fn((order) => {
    return 1;
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
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
};
