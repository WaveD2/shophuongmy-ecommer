import React from "react";
import { Select, Tabs, Tag } from "antd";
import { optionsColorsProduct } from "../../utils/Constant";

const TagsComponent = ({ ...props }) => {
  const { label, field, form } = props;

  const handleChange = (itemSelect) => {
    const newItemSelect = itemSelect.map((item) => {
      return { value: item, label: item };
    });
    form.setFieldValue(field.name, newItemSelect);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose, color } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        value={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}>
        {label}
      </Tag>
    );
  };

  return (
    <div>
      <p>{label}</p>
      <Select
        allowClear
        mode="multiple"
        onChange={handleChange}
        tagRender={tagRender}
        style={{
          marginBottom: "10px",
          width: "100%",
        }}
        options={form.initialValues[field.name]}
      />
    </div>
  );
};

export default TagsComponent;
