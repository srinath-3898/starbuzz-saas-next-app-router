import ReactApexChart from "react-apexcharts";

const StackedColoumnGraph = ({ options, series }) => {
  return (
    <ReactApexChart options={options} series={series} type="bar" height={400} />
  );
};

export default StackedColoumnGraph;
