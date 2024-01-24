import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { render } from "react-dom";

const { Header, Content, Footer, Sider } = Layout;

const menuOptions = [
  {
    label: "Giới thiệu",
    key: 1,
  },
  {
    label: "Chính sách bán buôn",
    key: 2,
  },
  {
    label: "Liên hệ",
    key: 3,
  },
];
const contentMenrOptions = [
  {
    key: 1,
    content: {
      title: "Giới thiệu về Shop Hường Mỹ",
      labels: [
        "Shop Hường Mỹ mở cửa hàng đầu tiên năm 2009 với mục tiêu trở thành hãng thời trang trẻ em số 1 Việt Nam về chất lượng và kiểu dáng.",
        "Thương hiệu Shop trẻ em Hường Mỹ có 2 chủng loại bé trai và bé gái, độ tuổi từ 5 đến 14 tuổi. Sau nhiều năm phát triển, thương hiệu Blue Seven rất nổi tiếng ở Hà Nội bởi mẫu mã đẹp, phong cách. Đặc biệt là chất lượng sản phẩm, chất lượng vải cực kỳ thoáng mát, kiểu dáng thoải mái, hình in rất đẹp cá tính và an toàn cho sức khoẻ trẻ em.",
        "Cám ơn bạn đã dành thời gian cho chúng tôi!",
      ],
      signature: "Shop trẻ em Hường Mỹ",
    },
  },
  {
    key: 2,
    content: {
      title: "Chính sách bán buôn quần áo trẻ em giá sỉ",
      labels: [
        "Các mẫu quần áo trẻ em của Shop Hường Mỹ rất thời trang, phong cách và chất lượng cao, 2 chủng loại bé trai và bé gái có độ tuổi từ 4 tuổi đến 14 tuổi, đặc biệt độ tuổi teen, hiện đang rất thiếu trên thị trường",
        "Nếu các bạn mới mở shop hoặc muốn tìm kiếm một thương hiệu, một dòng quần áo trẻ em giá sỉ, thời trang phong cách châu âu, chất lượng cao, không bị cạnh tranh trong thị trường đủ các sản phẩm có nguồn gốc không rõ xuất xứ thì Shop Hường Mỹ là sự chọn lựa hoàn hảo cho các bạn. Chỉ cần 1 đơn hàng mua thử thị trường, bạn hoàn toàn có thể biết sản phẩm của Shop Hường Mỹ có phù hợp không, không lo tồn đọng vốn. ",
        "Shop Hường Mỹ chuyên bán buôn quần áo trẻ em cao cấp giá sỉ trên toàn quốc",
      ],
      contacts: [
        {
          title: "Nguyễn Đăng Tùng",
          labels: ["Số điện thoại : 098233528", "Gmail : tungdev64@gmail.com"],
        },
        {
          title: "Thái Thị Hường",
          labels: ["Số điện thoại : 098233528", "Gmail : huongmy123@gmail.com"],
        },
      ],
      signature: " Hợp tác thành công và cùng phát triển !",
    },
  },
  {
    key: 3,
    content: {
      title: "Liên hệ",
      contacts: [
        {
          title: "Địa chỉ ",
          labels: ["Thị trấn - Đô Lương - Nghệ An"],
        },
        {
          title: "Email",
          labels: ["tungdev64@gmail.com"],
        },
        {
          title: "Số điện thoại",
          labels: ["098233528"],
        },
        {
          title: "Thời gian làm việc",
          labels: ["Thứ 2 đến Thứ 7 từ 8h đến 17h30"],
        },
      ],
      signature: " Hợp tác thành công và cùng phát triển !",
    },
  },
];
const LayoutContactPage = () => {
  const [keyTitle, setKeyTitle] = useState(1);

  let renderContentByMenu = contentMenrOptions[keyTitle - 1].content;

  return (
    <Content style={{ minHeight: "60vh", marginTop: "20px" }}>
      <Layout>
        <Sider width={200}>
          <Menu
            onClick={(e) => {
              setKeyTitle(Number(e.key));
            }}
            mode="inline"
            defaultSelectedKeys={keyTitle}
            defaultOpenKeys={keyTitle}
            style={{ height: "100%" }}
            items={menuOptions}
          />
        </Sider>
        <Content
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#fff",
            padding: "0 24px",
            minHeight: 280,
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}>
            <h2 className="title_text">{renderContentByMenu.title}</h2>

            {renderContentByMenu?.labels?.map((item, index) => (
              <div key={index}>
                <label className="des_text">{item}</label>
              </div>
            ))}
            {renderContentByMenu?.contacts &&
              renderContentByMenu?.contacts?.map((contact, index) => {
                return (
                  <div key={index}>
                    <h2>{contact?.title}</h2>
                    {contact?.labels?.map((item, index) => (
                      <label key={index} className="des_text">
                        {item}
                      </label>
                    ))}
                  </div>
                );
              })}
            <h3 style={{ textDecoration: "underline" }}>
              {renderContentByMenu.signature}
            </h3>
          </div>
          {keyTitle === 3 && (
            <div style={{}}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.154671221992!2d105.31024467719928!3d18.89917440354328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139e33e0b86a27b%3A0x8215ab880c58bf37!2zQ2jhu6MgbeG7m2kgxJDDtCBMxrDGoW5n!5e0!3m2!1svi!2s!4v1706103249615!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          )}
        </Content>
      </Layout>
    </Content>
  );
};

export default LayoutContactPage;
