import ReactApexChart from "react-apexcharts";

const BarGraph = ({ options, series, height }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={height}
    />
  );
};

export default BarGraph;
