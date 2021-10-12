// Tham khảo https://www.npmjs.com/package/react-chartjs-2
// https://www.youtube.com/watch?v=Ly-9VTXJlnA

import React, { useState, useEffect } from "react";
import { Bar, defaults } from "react-chartjs-2";
import "./TotalSellSeasonsBarChart.jsx.css";
import StatisticService from "./StatisticService";

const service = new StatisticService();

function TotalSellSeasonBarChart() {
  const [dataSets, setDataSets] = useState([]);
  const [data, setData] = useState({});
  const [years, setYears] = useState([]);

  //#region Init

  async function initValues() {
    const yrs = await service.getYears();
    setYears(yrs);
    setDataSets(await getDataSets(yrs[0], yrs[1]));
  }

  function initDefaults() {
    defaults.color = "black";
    // defaults.font.size = 20;
    console.log(defaults);
  }

  useEffect(() => {
    initValues();
    initDefaults();
  }, []);

  useEffect(() => {
    setData({
      labels: ["Quý I", "Quý II", "Quý III", "Quý IV"],
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

    const ndyrs = years.filter((y) => !dyrs.some((dy) => dy === y));

    return ndyrs;
  }

  // real time?
  function updateValue(year) {
    setDataSets((old) => {
      const newVal = [...old];

      const value = newVal.find((v) => v.label === year);

      const { data } = value;
      value.data = [...data.slice(0, 3), value.data[data.length - 1] + 1000000];

      return newVal;
    });
  }

  //#endregion

  function showYearsSelect() {
    const ndyrs = getNotDisplayYears();

    return (
      <select name="year" id="year" onChange={(e) => insert(e.target.value)}>
        <option value="default">-- Năm --</option>
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
      <div key={y} className="item">
        <span>{y}</span>
        <span onClick={() => removeBar(y)} className="btn-del">
          X
        </span>
      </div>
    ));
  }

  return (
    <>
      <h1 draggable="true">Lấy báo cáo thống kê</h1>
      <div className="chart-panel">
        <label>Năm:</label>
        <div className="content">
          {showYearsSelect()}
          {showYearsInChart()}
        </div>
      </div>
      <button onClick={() => updateValue(2017)}>Update</button>
      <Bar data={data} options={options} />
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
  plugins: {
    title: {
      display: true,
      text: "Tổng tiền trong năm theo quý",
      font: {
        size: 20,
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
