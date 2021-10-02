// Tham khảo https://www.npmjs.com/package/react-chartjs-2
// https://www.youtube.com/watch?v=Ly-9VTXJlnA

import React, { useState, useRef, useEffect } from "react";
import { Bar, defaults } from "react-chartjs-2";
import "./BarChart.jsx.css";
import StatisticService from "./StatisticService";

const service = new StatisticService();

function BarChart() {
  const [options, setOptions] = useState({});
  const [dataSets, setDataSets] = useState([]);
  const [data, setData] = useState({});
  const [years, setYears] = useState([]);

  useEffect(() => {
    initValues();

    setOptions(opts);
  }, []);

  useEffect(() => {
    setData({
      labels: ["Quý I", "Quý II", "Quý III", "Quý IV"],
      datasets: dataSets,
    });
  }, [dataSets]);

  async function insert(year) {
    const dt = await service.getTotalSellInYear(year);
    const dts = getDataSet(year, dt);

    setDataSets((old) => {
      const newVal = [...old];
      newVal.push(dts);

      return newVal;
    });
  }

  const chartRef = useRef({});

  function removeBar(label) {
    setDataSets((old) => [...old.filter((o) => o.label != label)]);
  }

  function getNotDisplayYears() {
    // Lấy chưa display
    const dyrs = dataSets.map((m) => m.label);

    const ndyrs = years.filter((y) => !dyrs.some((dy) => dy == y));

    return ndyrs;
  }

  function updateValue(year) {
    setDataSets((old) => {
      const newVal = [...old];

      const value = newVal.find((v) => v.label == year);

      const { data } = value;
      value.data = [...data.slice(0, 3), value.data[data.length - 1] + 1000000];

      return newVal;
    });
  }

  async function initValues() {
    setYears(await service.getYears());
    setDataSets(await getDataSets());
  }

  function showYearsSelect() {
    const ndyrs = getNotDisplayYears();

    return (
      <select
        name="year"
        id="year"
        onChange={(e) => insert(e.target.value)}
        className="chart-panel-select"
      >
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
      <div key={y} className="chart-panel-item">
        {y} <span onClick={() => removeBar(y)}>x</span>
      </div>
    ));
  }

  return (
    <>
      <h1 draggable="true">Lấy báo cáo thống kê</h1>
      <div className="chart-panel">
        <label>Năm:</label>
        <div className="chart-panel-content">
          {showYearsSelect()}
          {showYearsInChart()}
        </div>
      </div>
      <button onClick={() => updateValue(2021)}>Update</button>
      <Bar ref={chartRef} data={data} options={options} />
    </>
  );
}

async function getDataSets() {
  const dataSet = [];
  for (let i = 2020; i <= 2021; i++) {
    const data = await service.getTotalSellInYear(i);
    const set = getDataSet(i, data);

    dataSet.push(set);
  }

  return dataSet;
}

function getDataSet(year, data) {
  return {
    label: year.toString(),
    data,
    backgroundColor: bg[Math.floor(Math.random() * 3)],
    borderWidth: 1,
    borderColor: "#777",
    hoverBorderColor: "black",
    borderRadius: 3,
  };
}

const bg = [
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 99, 132, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
];

const opts = {
  plugins: {
    title: {
      display: true,
      text: "Tổng tiền bán trong 4 quý",
      fullSize: false,
      font: {
        size: "40em",
      },
      // color: "green",
      padding: {
        // top: 100,
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

export default BarChart;
