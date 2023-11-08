import React from "react";
import { Select, Tabs, Tag } from "antd";

const TagsComponent = (props) => {
  const { handleChange, options } = props;

  const tagRender = (props) => {
    const { label, value, closable, onClose, color } = props;
 
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        value={value}
        color={color}
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
    <Select
      allowClear
      mode="multiple"
      onChange={handleChange}
      tagRender={tagRender}
      style={{
        marginBottom: "10px",
        width: "100%",
      }}
      options={options}
    />
  );
};

export default TagsComponent;
