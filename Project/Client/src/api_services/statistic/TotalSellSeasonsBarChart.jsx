// Tham khảo https://www.npmjs.com/package/react-chartjs-2
// https://www.youtube.com/watch?v=Ly-9VTXJlnA

import React, { useState, useEffect } from "react";
import { Bar, defaults } from "react-chartjs-2";
import "./TotalSellSeasonsBarChart.jsx.css";
import StatisticService from "./StatisticService";
import expSer from "./exportExcelService";
import exp_ico from "./exp-ico.png";

const service = new StatisticService();

function TotalSellSeasonBarChart() {
    const [dataSets, setDataSets] = useState([]);
    const [data, setData] = useState({});
    const [years, setYears] = useState([]);

    //#region Init

    async function initValues() {
        const yrs = await service.getYears();
        setYears(yrs);
        setDataSets(await getDataSets(yrs[yrs.length - 2], yrs[yrs.length - 1]));
    }

    function initDefaults() {
        defaults.color = "black";
        defaults.font.size = 18;
    }

    useEffect(() => {
        initValues();
        initDefaults();
    }, []);

    useEffect(() => {
        setData({
            labels: ["I", "II", "III", "IV"],
            datasets: dataSets,
        });
    }, [dataSets]);

    //#endregion

    //#region Inter

    async function insert(year) {
        const dt = await service.getDataOfSeasons(year);
        const dts = getDataSet(year, dt);

        setDataSets((old) => {
            const newVal = [...old];
            newVal.push(dts);

            return newVal;
        });
    }

    function removeBar(label) {
        setDataSets((old) => [...old.filter((o) => o.label !== label)]);
    }

    function getNotDisplayYears() {
        // Lấy chưa display
        const dyrs = dataSets.map((m) => m.label);

        const ndyrs = years.filter((y) => !dyrs.some((dy) => dy == y));

        return ndyrs;
    }

    function exportReport() {
        let rp = [];

        for (let i = 0; i < dataSets.length; i++) {
            const { label, data } = dataSets[i];
            var r = getRp(label, data);
            rp = rp.concat(r);
        }

        expSer(rp, "report.xlsx");
    }

    function getRp(year, data) {
        return [
            [`Năm ${year}`, "Quý", "Tổng Tiền"],
            ["", "I", data[0]],
            ["", "II", data[1]],
            ["", "III", data[2]],
            ["", "IV", data[3]],
            [],
        ];
    }

    //#endregion

    function showYearsSelect() {
        const ndyrs = getNotDisplayYears();

        return (
            <select name='year' id='year' onChange={(e) => insert(e.target.value)}>
                <option value='default'>-- Năm --</option>
                {ndyrs.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
        );
    }

    function showYearsInChart() {
        const dyrs = dataSets.map((ds) => ds.label);

        return dyrs.map((y) => (
            <div key={y} className='item'>
                <span>{y}</span>
                <span onClick={() => removeBar(y)} className='btn-del'>
                    X
                </span>
            </div>
        ));
    }

    return (
        <>
            <div className='exp-ico' onClick={exportReport}>
                <h4> Xuất báo ra file excel</h4>
                <img src={exp_ico} alt='No Img' />
            </div>
            <Bar data={data} options={options} />
            <div className='chart-panel'>
                <div className='content'>
                    {showYearsSelect()}
                    {showYearsInChart()}
                </div>
            </div>
        </>
    );
}

async function getDataSets(from, to) {
    const dataSet = [];
    for (let y = from; y <= to; y++) {
        const data = await service.getDataOfSeasons(y);
        const set = getDataSet(y, data);

        dataSet.push(set);
    }

    return dataSet;
}

function getDataSet(year, data) {
    return {
        label: year.toString(),
        data,
        backgroundColor: backgroundColors[year % backgroundColors.length],
        borderWidth: 1,
        borderColor: "hsl(0, 0%, 47%)",
        hoverBorderColor: "hsl(0, 0%, 0%)",
        borderRadius: 3,
    };
}

const backgroundColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
];

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
                text: "Các Quý",
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
            text: "Tổng tiền trong năm theo quý",
            font: {
                size: 30,
            },
            // color: "green",
            padding: {
                bottom: 20,
            },
        },
        legend: {
            position: "right",
            labels: {
                color: "black",
                weight: "900",
            },
        },
    },
};

export default TotalSellSeasonBarChart;
