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
          href: "/pages",
          text: "Chính sách bảo mật",
        },
        {
          href: "/pages",
          text: "Chính sách vận chuyển",
        },
        {
          href: "/pages",
          text: "Chính sách đổi trả",
        },
        {
          href: "/pages",
          text: "Quy định sử dụng",
        },
      ],
    },
    {
      title: "Thông tin liên lạc",
      lists: [
        {
          href: "/pages",
          text: "Địa chỉ : Thị Trấn, Đô Lương, Nghệ An",
        },
        {
          href: "/pages",
          // text: `${(<PhoneOutlined />)}: 098823352*`,
          text: `Điện thoại: 098823352*`,
        },
        {
          href: "/pages",
          text: `Gmail : 
              tungdev64@gmail.com `,
        },
        {
          href: "/pages",
          text: `Facebook : Đăng Tùng`,
        },
      ],
    },
  ];
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          {dataFooter.map(items => (
            <div className='footer-col'>
              <h4>{items.title}</h4>
              <ul>
                {items.lists.map((item, index) => (
                  <li key={index}>
                    <a href={item.href}>
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className='footer-col'>
            <h4>Panpage</h4>

            <iframe
              src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshophuongmy37&tabs=timeline&width=350&height=50&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=301954856157171'
              width='100%'
              height='100%'
              style={{border: "none", overflow: "hidden"}}
              scrolling='no'
              frameBorder='0'
              allowfullscreen='true'
              allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
