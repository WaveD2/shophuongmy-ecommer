import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponet";

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          height: "60px",
        }}>
        <HeaderComponent />
      </div>
      {children}
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
