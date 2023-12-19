import ReactApexChart from "react-apexcharts";

const ColoumnChart = ({ options, series }) => {
  return (
    <ReactApexChart options={options} series={series} type="bar" height={450} />
  );
};

export default ColoumnChart;
