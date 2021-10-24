// Tham khảo https://www.npmjs.com/package/react-chartjs-2
// https://www.youtube.com/watch?v=Ly-9VTXJlnA

import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";
import StatisticService from "./StatisticService";
import expSer from "./exportExcelService";
import exp_ico from "./exp-ico.png";

const service = new StatisticService();

function TotalSellYearsBarChart() {
    const [total, setTotal] = useState([]);
    const [data, setData] = useState({});

    //#region Init

    async function initValues() {
        const total = await service.getTotalSellOfYears();

        setTotal(total);
    }

    function initDefaults() {
        defaults.color = "black";
        defaults.font.size = 17;
    }

    useEffect(() => {
        initValues();
        initDefaults();
    }, []);

    useEffect(() => {
        const datasets = getDataSets(total);

        setData({
            labels: total.map((t) => t.year),
            datasets,
        });
    }, [total]);

    //#endregion

    function exportReport() {
        let rp = total.map((t) => [t.year, t.totalSell, t.totalPay]);

        rp = [["Năm", "Tổng thu", "Tổng chi"]].concat(rp);

        expSer(rp, "report.xlsx");
    }

    return (
        <>
            <div className='exp-ico' onClick={exportReport}>
                <h4> Xuất báo ra file excel</h4>
                <img src={exp_ico} alt='No Img' />
            </div>
            <Line data={data} options={options} />
        </>
    );
}

// 2 data set
// tiền mua vs tiền bán
function getDataSets(total) {
    const sellData = total.map((t) => t.totalSell);
    const payData = total.map((t) => t.totalPay);

    const sellSet = getDataSet("Tổng thu", sellData, "rgba(255, 159, 64, 0.6)");
    const paySet = getDataSet("Tổng chi", payData, "rgba(153, 102, 255, 0.6)");

    return [sellSet, paySet];
}

function getDataSet(type, data, color) {
    return {
        label: type,
        data,
        borderWidth: 1,
        backgroundColor: color,
        borderColor: color,
        hoverBorderColor: "black",
        borderRadius: 3,
    };
}

const options = {
    scales: {
        y: {
            title: {
                display: true,
                text: "VND",
            },
        },
        x: {
            title: {
                display: true,
                text: "Các Năm",
            },
            ticks: {
                major: {
                    enabled: true,
                },
                color: "blue",
            },
        },
    },
    plugins: {
        title: {
            display: true,
            text: "Tổng thu chi hằng năm",
            font: {
                size: 35,
            },
            // color: "green",
            padding: {
                bottom: 20,
            },
        },
        legend: {
            labels: {
                color: "black",
                weight: "900",
            },
        },
    },
};

export default TotalSellYearsBarChart;
