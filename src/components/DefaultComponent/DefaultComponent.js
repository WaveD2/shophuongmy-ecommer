import React, { Fragment } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponet";

const DefaultComponent = ({ children }) => {
  return (
    <Fragment>
      <div
        style={{
          height: "60px",
        }}>
        <HeaderComponent />
      </div>
      <main> {children}</main>
      <FooterComponent />
    </Fragment>
  );
};

export default DefaultComponent;
