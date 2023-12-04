import React, { useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;

const TextAreaForm = ({ ...props }) => {
  const { label, field, form } = props;

  const handleChange = (itemSelect) => {
    form.setFieldValue(field.name, itemSelect.target.value);
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <label style={{ fontSize: "17px", fontWeight: 600, width: "280px" }}>
        {label}
      </label>
      <TextArea
        {...field}
        onChange={handleChange}
        placeholder={`Nhập ${label}`}
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
    </div>
  );
};

export default TextAreaForm;
