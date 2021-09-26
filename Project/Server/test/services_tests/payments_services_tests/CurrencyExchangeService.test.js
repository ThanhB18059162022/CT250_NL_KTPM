const CurrencyExchangeService = require("../../../app/services/payments_services/CurrencyExchangeService");

const currency = {
  baseCurrencyCode: "VND",
  exchangeRate: {
    USD: {
      VND: 23000,
    },
    VND: {
      USD: 0.00004347826086956522,
    },
  },
};

function getSerivce() {
  return new CurrencyExchangeService(currency);
}

describe("Các trường hợp đặc biệt", () => {
  test("Mặc định VND", async () => {
    //Arrange
    const oneVND = 1;
    const oneVNDToVND = 1;
    const service = getSerivce();

    //Act
    const expRs = oneVNDToVND;
    const actRs = await service.convert(oneVND).to("VND");

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("From to giống nhau", async () => {
    //Arrange
    const oneVND = 1;
    const oneVNDToVND = 1;
    const service = getSerivce();

    //Act
    const expRs = oneVNDToVND;
    const actRs = await service.convert(oneVND).from("VND").to("VND");

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("Amount not a number", async () => {
    //Arrange
    const oneVND = undefined;
    const service = getSerivce();

    //Act
    //Expect
    expect(() => service.convert(oneVND)).toThrowError();
  });

  test("Amount < 0", async () => {
    //Arrange
    const oneVND = -1;
    const service = getSerivce();

    //Act
    //Expect
    expect(() => service.convert(oneVND)).toThrowError();
  });

  test("From undefined", async () => {
    //Arrange
    const oneVND = 1;
    const service = getSerivce();

    //Act
    //Expect
    expect(() => service.convert(oneVND).from(undefined)).toThrowError();
  });

  test("To undefined", async () => {
    //Arrange
    const oneVND = 1;
    const service = getSerivce();

    //Act
    //Expect
    await expect(
      async () => await service.convert(oneVND).from("VND").to(undefined)
    ).rejects.toThrowError();
  });
});

describe("Kiểm tra chuyển đổi tiền VND => USD 1 Đô => 23k", () => {
  test("Sửa giá trị mặc định", async () => {
    //Arrange
    const oneUSD = 1;
    const oneUSDToVND = 23000;
    const service = getSerivce();

    //Act
    const expRs = oneUSDToVND;
    const actRs = await service.convert(oneUSD).from("USD").to("VND");

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("2 đô sang vnd", async () => {
    //Arrange
    const oneUSD = 2;
    const oneUSDToVND = 46000;
    const service = getSerivce();

    //Act
    const expRs = oneUSDToVND;
    const actRs = await service.convert(oneUSD).from("USD").to("VND");

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("100 đô sang vnd", async () => {
    //Arrange
    const oneUSD = 100;
    const oneUSDToVND = 2300000;
    const service = getSerivce();

    //Act
    const expRs = oneUSDToVND;
    const actRs = await service.convert(oneUSD).from("USD").to("VND");

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("0.01 đô sang vnd", async () => {
    //Arrange
    const oneUSD = 0.05;
    const oneUSDToVND = 1150;
    const service = getSerivce();

    //Act
    const expRs = oneUSDToVND;
    const actRs = await service.convert(oneUSD).from("USD").to("VND");

    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Kiểm tra chuyển đổi tiền USD => VND 23k => 1 Đô", () => {
  test("1000 vnd to usd", async () => {
    //Arrange
    const oneThousandVND = 1000;
    const oneThousandVNDToUSD = 0.04;
    const service = getSerivce();
    //Act
    const expRs = oneThousandVNDToUSD;
    const actRs = await service.convert(oneThousandVND).to("USD");
    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("20k vnd to usd", async () => {
    //Arrange
    const oneThousandVND = 20000;
    const oneThousandVNDToUSD = 0.87;
    const service = getSerivce();
    //Act
    const expRs = oneThousandVNDToUSD;
    const actRs = await service.convert(oneThousandVND).to("USD");
    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("23k vnd to usd", async () => {
    //Arrange
    const oneThousandVND = 23000;
    const oneThousandVNDToUSD = 1;
    const service = getSerivce();
    //Act
    const expRs = oneThousandVNDToUSD;
    const actRs = await service.convert(oneThousandVND).to("USD");
    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("2m vnd to usd", async () => {
    //Arrange
    const oneThousandVND = 2000000;
    const oneThousandVNDToUSD = 86.96;
    const service = getSerivce();
    //Act
    const expRs = oneThousandVNDToUSD;
    const actRs = await service.convert(oneThousandVND).to("USD");
    //Expect
    expect(actRs).toEqual(expRs);
  });
});

describe("Làm tròn 2 số sau dấu chấm", () => {
  test("undefined to NaN", () => {
    //Arrange
    const amount = undefined;
    const service = getSerivce();
    //Act
    const expRs = NaN;
    const actRs = service.roundTakeTwo(amount);

    //Expect
    expect(actRs).toEqual(expRs);
  });

  test("0.004 to 0", () => {
    //Arrange
    const amount = 0.004;
    const service = getSerivce();
    //Act
    const expRs = 0;
    const actRs = service.roundTakeTwo(amount);

    //Expect
    expect(actRs).toEqual(expRs);
  });
});
