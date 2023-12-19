import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ options, series }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={400}
    />
  );
};

export default DonutChart;
