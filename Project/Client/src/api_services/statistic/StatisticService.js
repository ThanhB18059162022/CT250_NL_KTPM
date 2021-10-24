// Giả lập gọi api lấy dữ liệu

export default class StatisticService {
    getDataOfSeasons = async (year) => {
        return seasons[year - 2017];
    };

    getYears = async () => {
        const yrs = [];

        for (let y = 2017; y <= 2021; y++) {
            yrs.push(y);
        }

        return yrs;
    };

    getTotalSellOfYears = async () => {
        const total = [];
        const years = await this.getYears();

        years.forEach((year) => {
            var prof = {
                year,
                totalSell: yearsSell[year - 2017][0],
                totalPay: yearsSell[year - 2017][1],
            };

            total.push(prof);
        });

        return total;
    };
}

const seasons = [
    [105000000, 147000000, 117600000, 141120000],
    [126000000, 176400000, 141120000, 169344000],
    [133000000, 186200000, 148960000, 178752000],
    [63000000, 88200000, 70560000, 84672000],
    [77000000, 107800000, 86240000],
];

const yearsSell = [
    [510720000, 306432000],
    [612864000, 490291200],
    [646912000, 388147200],
    [306432000, 275788800],
    [374528000, 262169600],
];
