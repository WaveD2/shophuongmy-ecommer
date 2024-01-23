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
    label: "Giới thiệu Shop Hường Mỹ",
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
  console.log(renderContentByMenu);
  return (
    <Content style={{ padding: "0 48px" }}>
      <Layout
        style={{
          padding: "24px 0",
          background: "#333333",
        }}>
        <Sider style={{ background: "#ccc" }} width={200}>
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
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <h2>{renderContentByMenu.title}</h2>
          <br />
          {renderContentByMenu?.labels?.map((item, index) => (
            <div key={index}>
              <br />
              <label>{item}</label>
            </div>
          ))}
          {renderContentByMenu?.contacts &&
            renderContentByMenu?.contacts?.map((contact, index) => {
              return (
                <div key={index}>
                  <h2>{contact?.title}</h2>
                  {contact?.labels?.map((item, index) => (
                    <label key={index}>{item}</label>
                  ))}
                </div>
              );
            })}
          <h3>{renderContentByMenu.signature}</h3>
        </Content>
      </Layout>
    </Content>
  );
};

export default LayoutContactPage;
