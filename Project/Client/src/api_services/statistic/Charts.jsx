import React from "react";

import TotalSellSeasonBarChart from "./TotalSellSeasonsBarChart";
import TotalSellYearsBarChart from "./TotalSellYearsBarChart";
function Charts() {
  return (
    <div style={{ width: 700, fontSize: "1em" }}>
      <TotalSellSeasonBarChart />
      <TotalSellYearsBarChart />
    </div>
  );
}

export default Charts;
