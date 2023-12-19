import { Dropdown } from "antd";

const CustomDropdown = ({ items, buttonItem, placement }) => {
  return (
    <Dropdown
      menu={{ items: items }}
      placement={placement ? placement : "bottomRight"}
      trigger={["click"]}
      arrow
    >
      <button style={{ backgroundColor: "white", padding: 0 }}>
        {buttonItem}
      </button>
    </Dropdown>
  );
};

export default CustomDropdown;
