import React from "react";
import { Select, Space, Form } from "antd";

const SelectOption = ({
  optionsItem,
  placeholder,
  props,
  handleChange,
  styleWidth,
  nameOption,
  labelOption,
  isRequired,
}) => {
  const optionsItems =
    optionsItem?.length > 0 && !optionsItem[0]?.value
      ? optionsItem?.map((item) => {
          return {
            label: item?.name || item,
            value: item?.code?.toString() || item,
          };
        })
      : optionsItem;

  return (
    <Form.Item
      name={nameOption}
      label={labelOption}
      rules={[{ required: isRequired }]}>
      <Space wrap>
        <Select
          allowClear
          placeholder={placeholder}
          style={{ width: styleWidth, margin: "0 4px" }}
          onChange={handleChange}
          options={optionsItems}
          {...props}
        />
      </Space>
    </Form.Item>
  );
};
export default SelectOption;
