const { NotExistError } = require("../../../app/errors/errorsContainer");

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
  getOrderProduct = jest.fn((prod) => {
    if (prod.prod_no == 666) throw new NotExistError();

    return { ...prod };
  });

  saveOrder = jest.fn(() => {
    return 1;
  });

  getSaveOrder = jest.fn((id) => {
    if (id < 0) {
      throw new NotExistError();
    }

    return {};
  });
}

class CurrencyExchangeServiceMock {
  convert = jest.fn(() => {
    return this;
  });

  to = jest.fn();

  roundTakeTwo = jest.fn((total) => total);
}

class StorageServiceMock {
  getSize = jest.fn();

  set = jest.fn();

  setex = jest.fn();

  get = jest.fn(async (id) => {
    if (id != 1) return undefined;

    return { id };
  });

  delete = jest.fn();

  emptyData = jest.fn((data) => data == undefined);
}

module.exports = {
  PaymentValidatorMock,
  PaymentDAOMock,
  CurrencyExchangeServiceMock,
  StorageServiceMock,
};
