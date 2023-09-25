import React from "react";
import { Breadcrumb } from "antd";

const menuItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/">
        General
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/">
        Layout
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: "An Application",
        },
      ]}
    />
  );
};
export default BreadcrumbComponent;
