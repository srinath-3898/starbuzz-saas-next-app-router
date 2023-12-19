import ReactApexChart from "react-apexcharts";

const AreaChart = ({ data, options, series }) => {
  return options && series ? (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={400}
    />
  ) : (
    <></>
  );
};

export default AreaChart;
