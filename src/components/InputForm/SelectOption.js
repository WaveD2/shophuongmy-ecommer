import React from "react";
import { Select, Space } from "antd";

const SelectOption = ({ optionsItem, placeholder, props, handleChange }) => {
  const optionsItems =
    optionsItem?.length > 0 &&
    optionsItem?.map((item) => {
      return {
        label: item?.name || item,
        value: item?.code?.toString() || item,
      };
    });

  return (
    <Space wrap>
      <Select
        allowClear
        placeholder={placeholder}
        style={{ width: "max-content", margin: "0 4px", minWidth: "120px" }}
        onChange={handleChange}
        options={optionsItems}
        {...props}
      />
    </Space>
  );
};
export default SelectOption;
