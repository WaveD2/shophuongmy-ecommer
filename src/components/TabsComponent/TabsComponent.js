import React from "react";
import { Tabs } from "antd";

const TabsComponent = ({ items, handleChange }) => {
  return (
    <Tabs
      defaultActiveKey="0"
      items={items}
      onChange={handleChange}
      style={{
        margin: "6px auto",
        border: " 3px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        fontSize: "16px",
      }}
    />
  );
};

export default TabsComponent;
