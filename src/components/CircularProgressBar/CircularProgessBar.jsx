import { Progress } from "antd";

const CircularProgessBar = ({ value, StrokeColor, type }) => {
  return (
    <Progress
      type="circle"
      percent={value}
      size={70}
      format={(percent) => `${Math.round(percent)}%`}
      strokeColor={StrokeColor}
      strokeWidth={10}
    />
  );
};

export default CircularProgessBar;
