import { Progress } from "antd";

const CircularProgessBar = ({
  value,
  StrokeColor,
  type,
  size = 70,
  strokeWidth = 10,
}) => {
  return (
    <Progress
      type="circle"
      percent={value}
      size={size}
      format={(percent) => `${Math.round(percent)}%`}
      strokeColor={StrokeColor}
      strokeWidth={strokeWidth}
    />
  );
};

export default CircularProgessBar;
