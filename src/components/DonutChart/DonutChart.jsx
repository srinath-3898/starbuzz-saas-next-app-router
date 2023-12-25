import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ options, series, height = 400 }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={height}
    />
  );
};

export default DonutChart;
