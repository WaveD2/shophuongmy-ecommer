import React from "react";
import { useNavigate } from "react-router-dom";
import { WrapperType, WrapperMenuItem } from "./styled";
import { DownOutlined } from "@ant-design/icons";

const TypeProduct = ({ item }) => {
  const navigate = useNavigate();

  return (
    <WrapperType
      onClick={(e) => {
        e.preventDefault();
        navigate(item.href);
      }}>
      {item?.name}
      {item?.isDown && (
        <span style={{ marginLeft: "6px", fontSize: "12px" }}>
          <DownOutlined />
        </span>
      )}
      {item?.isDown && (
        <WrapperMenuItem>
          {item.menuItem.map((item, index) => (
            <div key={index}>
              <h3
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(item.href);
                }}>
                {item.name}
              </h3>
            </div>
          ))}
        </WrapperMenuItem>
      )}
    </WrapperType>
  );
};

export default TypeProduct;
