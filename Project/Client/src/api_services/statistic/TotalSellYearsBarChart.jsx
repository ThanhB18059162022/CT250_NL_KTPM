// Tham khảo https://www.npmjs.com/package/react-chartjs-2
// https://www.youtube.com/watch?v=Ly-9VTXJlnA

import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";
import StatisticService from "./StatisticService";

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
    // defaults.font.size = 20;
    console.log(defaults);
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

  return (
    <>
      <h1 draggable="true">Lấy báo cáo thống kê</h1>
      <Line data={data} options={options} />
    </>
  );
}

// 2 data set
// tiền mua vs tiền bán
function getDataSets(total) {
  const sellData = total.map((t) => t.totalSell);
  const payData = total.map((t) => t.totalPay);

  const sellSet = getDataSet("Total Sell", sellData, "rgba(255, 159, 64, 0.6)");
  const paySet = getDataSet("Total Pay", payData, "rgba(153, 102, 255, 0.6)");

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
    y: { beginAtZero: true },
  },
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

export default TotalSellYearsBarChart;
