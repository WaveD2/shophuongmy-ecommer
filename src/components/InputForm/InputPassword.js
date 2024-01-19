import React, { useState } from "react";
import "./style.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ContainerInput, LabelInput } from "./style";

const InputPassword = ({ field, form }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <ContainerInput>
      <LabelInput htmlFor="password">Mật khẩu</LabelInput>

      <div className="input-container">
        <input
          type={showHidePassword ? "text" : "password"}
          {...field}
          className={hasError ? "input-error input-field" : "input-field"}
          id="password"
        />

        <i
          className={hasError ? "icon-error icon" : "fa fa-key icon"}
          onClick={() => changeShowHidePassword(!showHidePassword)}>
          {showHidePassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </i>
      </div>
    </ContainerInput>
  );
};

export default InputPassword;
