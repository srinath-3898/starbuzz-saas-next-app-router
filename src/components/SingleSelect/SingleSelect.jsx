import { Select } from "antd";
import Error from "../Error/Error";

const SingleSelect = ({
  width,
  placeHolder,
  options,
  optionValue,
  optionLabel,
  selectedOption,
  onChange,
  onPopupScroll,
  loading,
  onSearch,
  disabled,
  onBlur,
  onClear,
  onMouseLeave,
  error,
  showSearch,
}) => {
  const handleDropdownRender = (menu) => {
    return <div>{error ? <Error message={error} /> : menu}</div>;
  };

  return (
    <Select
      showSearch={showSearch}
      placeholder={placeHolder}
      style={{
        width: width,
      }}
      options={options?.map((option) => ({
        key: option?.key,
        value: option[optionValue],
        label: option[optionLabel],
      }))}
      value={selectedOption}
      onChange={onChange}
      listHeight={100}
      onPopupScroll={onPopupScroll}
      loading={loading}
      onSearch={onSearch}
      allowClear
      disabled={disabled}
      onBlur={onBlur}
      onClear={onClear}
      onMouseLeave={onMouseLeave}
      dropdownRender={handleDropdownRender}
      filterOption={(inputValue, option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      }
    />
  );
};

export default SingleSelect;
