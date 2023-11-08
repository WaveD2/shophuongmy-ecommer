import React from "react";
import { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button, Tag } from "antd";
const { Option } = Select;
const SelectForm = ({ ...props }) => {
  const { textButtonSelect, placeholderSelect, label, field, form } = props;
  const [selectItem, setSelectItem] = useState(field.value);
  const [nameOption, setNameOption] = useState("");

  const handleChange = (itemSelect) => {
    form.setFieldValue(field.name, itemSelect);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (nameOption.trim() !== "") {
      setSelectItem((prev) => {
        if (prev) {
          return [...prev, { value: Math.random(), label: nameOption }];
        } else {
          return [{ value: Math.random(), label: nameOption }];
        }
      });
      setNameOption("");
    }
  };

  const handleChangeInput = (e) => {
    e.preventDefault();
    setNameOption(e.target.value);
  };

  return (
    <Select
      mode="multiple"
      {...field}
      onChange={handleChange}
      style={{
        width: "100%",
        margin: "8px 0",
      }}
      placeholder={placeholderSelect}
      optionLabelProp="label"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Space
            style={{
              padding: "0 8px 4px",
            }}>
            <Input
              placeholder="Nhấn enter để chọn"
              onChange={handleChangeInput}
              value={nameOption}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              {textButtonSelect}
            </Button>
          </Space>
        </>
      )}>
      {selectItem?.length > 0 &&
        selectItem.map((item, index) => (
          <Option value={item.label} label={item.label} key={index}>
            <Space>
              <span role="img" aria-label={item.label}>
                {item.label}
              </span>
            </Space>
          </Option>
        ))}
    </Select>
  );
};

export default SelectForm;
