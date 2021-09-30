import { AuthenticationService, caller } from "../servicesContainer";
import React, { useEffect } from "react";
import "./style.css";

// Thống kê xài
function BarChart() {
  useEffect(() => {
    addScript();
  }, []);

  function addScript() {
    // Dùng d3js để vẽ biểu đồ thống kê
    const src = "https://d3js.org/d3.v7.min.js";

    const d3Script = document.createElement("script");
    d3Script.src = src;
    d3Script.defer = true;

    document.body.appendChild(d3Script);
  }

  const DUMMY_DATA = [
    { id: 1, value: 10, region: "USA" },
    { id: 2, value: 15, region: "India" },
    { id: 3, value: 13, region: "Germany" },
    { id: 4, value: 130, region: "China" },
  ];

  function draw() {
    const { d3 } = window;

    const MARGINS = { top: 20, bottom: 10 };
    const CHART_WIDTH = 600;
    const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

    const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);

    const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

    const chartContainer = d3
      .select("svg")
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT + MARGINS.top + MARGINS.bottom)
      .classed("container", true);

    const regions = DUMMY_DATA.map((d) => d.region);
    x.domain(regions);

    const maxVal = d3.max(DUMMY_DATA, (d) => d.value);
    y.domain([0, maxVal * 1.2]);

    const chart = chartContainer.append("g");

    // Giá trị
    chart
      .selectAll(".value")
      .data(DUMMY_DATA)
      .enter()
      .append("text")
      .text((d) => d.value)
      .attr("x", (d) => x(d.region) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 10)
      .attr("text-anchor", " middle")
      .classed("value", true);

    chart
      .selectAll(".bar")
      .data(DUMMY_DATA)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", x.bandwidth()) // Bandwidth chiều dài 1 cột = max/tổng phần tử
      .attr("height", (data) => CHART_HEIGHT - y(data.value)) // Chiều cao bằng max value
      .attr("x", (d) => x(d.region))
      .attr("y", (d) => y(d.value));

    // width - height là chung cho tất các cột
    // x - y là riêng từng cột

    chart
      .append("g")
      // Bottom là quay xuống dưới - Top quay lên
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr("color", "hsl(270, 100%, 31%)")
      .attr("transform", `translate(0, ${CHART_HEIGHT})`);
  }

  const service = new AuthenticationService(caller);
  async function login() {
    const token = await service.login({
      username: "valid",
      password: "valid",
    });

    console.log(token);
  }

  async function getUser() {
    const u = await service.getUser();

    console.log(u);
  }

  return (
    <>
      <h1>Thống kê</h1>
      <button onClick={draw}>Draw</button>
      <button onClick={login}>Login</button>
      <button onClick={getUser}>Get</button>
      <hr></hr>
      <svg></svg>
    </>
  );
}
export default BarChart;
