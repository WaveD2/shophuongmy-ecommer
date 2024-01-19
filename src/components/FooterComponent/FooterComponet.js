import React from "react";
import "./style.css";
import {
  EnvironmentOutlined,
  FacebookFilled,
  FacebookOutlined,
  GoogleOutlined,
  InstagramFilled,
  PhoneOutlined,
} from "@ant-design/icons";

const FooterComponent = () => {
  const dataFooter = [
    {
      title: "Hỗ trợ khách hàng",
      lists: [
        {
          href: "search",
          text: "Tìm kiếm",
        },
        {
          href: "sign-in",
          text: "Đăng nhập",
        },
        {
          href: "sign-up",
          text: "Đăng ký",
        },
        {
          href: "order",
          text: "Giỏ hàng",
        },
      ],
    },
    {
      title: "Chính sách Shop Hường Mỹ",
      lists: [
        {
          href: "/",
          text: "Chính sách bảo mật",
        },
        {
          href: "/",
          text: "Chính sách vận chuyển",
        },
        {
          href: "/",
          text: "Chính sách đổi trả",
        },
        {
          href: "/",
          text: "Quy định sử dụng",
        },
      ],
    },
    {
      title: "Thông tin liên lạc",
      lists: [
        {
          href: "/",
          text: "Địa chỉ : Thị Trấn, Đô Lương, Nghệ An",
        },
        {
          href: "/",
          // text: `${(<PhoneOutlined />)}: 098823352*`,
          text: `Điện thoại: 098823352*`,
        },
        {
          href: "/",
          text: `Gmail : 
              tungdev64@gmail.com `,
        },
        {
          href: "/",
          text: `Facebook : Đăng Tùng`,
        },
      ],
    },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {dataFooter.map((items) => (
            <div className="footer-col">
              <h4>{items.title}</h4>
              <ul>
                {items.lists.map((item) => (
                  <li>
                    <a href={item.href}>
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
