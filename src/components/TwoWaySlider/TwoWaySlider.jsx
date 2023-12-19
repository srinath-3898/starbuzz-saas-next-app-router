import React from "react";
import { Slider } from "antd";

const TwoWaySlider = ({ value, min, max, disabled, onChange }) => {
  return (
    <Slider
      range={{
        draggableTrack: true,
      }}
      onChange={onChange}
      min={min}
      max={max}
      disabled={disabled}
      value={value}
    />
  );
};

export default TwoWaySlider;
