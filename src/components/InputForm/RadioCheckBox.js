import React, { useState } from "react";
import { Input, Radio, Space } from "antd";
import { WrapperRadio } from "./style";
const RadioComponent = ({ listOption, handleChange, valueDefault, title }) => {
  return (
    <div>
      {title && <p className="text_des">{title}</p>}
      <WrapperRadio onChange={handleChange} value={valueDefault}>
        <Space direction="vertical">
          {listOption?.map((item, index) => (
            <Radio value={item.value} key={index}>
              {item?.title}
            </Radio>
          ))}
        </Space>
      </WrapperRadio>
    </div>
  );
};
export default RadioComponent;
