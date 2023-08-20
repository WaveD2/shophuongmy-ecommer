import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = "#fff",
    backgroundColorButton = "rgb(13, 92, 182)",
    colorButton = "#fff",
  } = props;

  return (
    <div style={{ display: "flex", minHeight: "35px" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{
          backgroundColor: backgroundColorInput,
          border: "1px solid #ccc",
          borderRadius: "6px 0 0 6px",
          outline: "none",
          textWrap: "nowrap",
          padding: " 0px 12px",
        }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: "#5a20c1",
          border: !bordered && "none",
          borderRadius: "0px 6px 6px 0px",
          outline: "none",
          paddingRight: "35px",
          textWrap: "nowrap",
          padding: "0 10px",
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: "#fff" }} />}
        textButton={textButton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default ButtonInputSearch;
