import React, { useState } from "react";
import { Input, Radio, Space } from "antd";
import { WrapperRadio } from "./style";
const RadioComponent = ({ listOption, handleChange, valueDefault }) => {
  return (
    <WrapperRadio onChange={handleChange} value={valueDefault}>
      <Space direction="vertical">
        {listOption?.map((item) => (
          <Radio value={item.value}>{item?.title}</Radio>
        ))}
      </Space>
    </WrapperRadio>
  );
};
export default RadioComponent;
