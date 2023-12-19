import ReactApexChart from "react-apexcharts";

const BarGraph = ({ options, series }) => {
  return <ReactApexChart options={options} series={series} type="bar" />;
};

export default BarGraph;
