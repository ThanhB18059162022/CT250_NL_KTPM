// Giả lập gọi api lấy dữ liệu

export default class StatisticService {
  getTotalSellInYear = async (year) => {
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
    return [2017, 2018, 2019, 2020, 2021];
  };
}
