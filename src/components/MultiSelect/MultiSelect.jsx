"use client";
import { Select, ConfigProvider } from "antd";

const MultiSelect = ({
  width,
  placeHolder,
  options,
  optionValue,
  optionLabel,
  selectedOptions,
  onSearch,
  onBlur,
  disabled,
  onChange,
  loading,
}) => {
  function filterOption(input, option) {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: { colorPrimary: "#fe5900" },
        },
      }}
    >
      <Select
        loading={loading}
        filterOption={filterOption}
        mode="multiple"
        placeholder={placeHolder}
        value={selectedOptions}
        onChange={onChange}
        style={{
          width: width,
        }}
        options={options?.map((option) => {
          return {
            value: option[optionValue],
            label: option[optionLabel],
          };
        })}
        onSearch={onSearch}
        onBlur={onBlur}
        disabled={disabled}
      />
    </ConfigProvider>
  );
};
export default MultiSelect;
