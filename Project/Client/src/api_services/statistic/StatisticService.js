// Giả lập gọi api lấy dữ liệu

export default class StatisticService {
  getDataOfSeasons = async (year) => {
    if (year == 2021) {
      return [
        9000000 + ((year * year) % 2) * year * 1000,
        10000000 + (((year * year) % 2) + 1) * year * 1000,
        7000000 + (((year * year) % 2) + 1) * year * 1000,
      ];
    }

    return [
      9000000 + ((year * year) % 2) * year * 1000,
      10000000 + (((year * year) % 2) + 1) * year * 1000,
      7000000 + (((year * year) % 2) + 1) * year * 1000,
      6000000 + ((year * year) % 2) * year * 1000,
    ];
  };

  getYears = async () => {
    const yrs = [];

    for (let y = 2010; y <= 2021; y++) {
      yrs.push(y);
    }

    return yrs;
  };

  getTotalSellOfYear = async (year) => {
    return year * 1000000;
  };
}
