import React from "react";
import { ContainerFooter, WrapperFooter } from "./style";
import { Col, Row } from "antd";
import {
  EnvironmentOutlined,
  FacebookFilled,
  FacebookOutlined,
  GoogleOutlined,
  InstagramFilled,
  PhoneOutlined,
} from "@ant-design/icons";

const FooterComponent = () => {
  return (
    <ContainerFooter>
      <Row>
        <Col span={9}>
          <p className="">
            “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
            hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn cùng
            Shop Hường Mỹ tiến bước .<br></br>Đến với Sop Hường Mỹ, quý khách sẽ
            được cập nhật liên tục các mẫu thời trang trẻ em mới và hot nhất với
            giá cả hợp lý nhất. Quý khách được kiểm tra hàng trước khi thanh
            toán và được đổi trả hàng trong trường hợp lỗi hỏng
          </p>
        </Col>
        <Col span={6}>
          <h3>HỖ TRỢ KHÁCH HÀNG</h3>
          <p>Hướng dẫn Chọn size</p>
          <p>Chính sách Khách hàng thân thiết</p>
          <p>Chính sách Bảo hành, đổi/trả</p>
          <p>Chính sách Thanh toán, giao nhận</p>
        </Col>
        <Col span={8}>
          <h3>SHOP QUẦN ÁO HƯỜNG MỸ</h3>
          <p>
            <EnvironmentOutlined />
            <span>Khu đô thị Thị Trấn-Đà Sơn-Đô Lương-Nghệ An</span>
          </p>
          <p>
            <PhoneOutlined /> <span>Liện hệ : 09882335**</span>
          </p>
          <p>
            <GoogleOutlined /> <span>tungdev64@gmail.com</span>
          </p>
          <p>
            <FacebookOutlined />
            <span style={{ marginLeft: "4px" }}>Đăng Tùng</span>
          </p>
        </Col>
      </Row>
    </ContainerFooter>
  );
};

export default FooterComponent;
