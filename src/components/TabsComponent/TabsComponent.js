import React from "react";
import { Radio, Tabs } from "antd";

const TabsComponent = (props) => {
  // const { item } = props;
  console.log("props", props);
  const items = [
    {
      key: "1",
      label: "Mô tả",
      children:
        "Set áo NY quần caro ống rộng dễ thương cho bé gái. Áo chất liệu thun cotton 4 chiều , sịn sò , thấm mồ hôi cực tốt , hình in sắc nét , không bong tróc. Quần caro kate mềm, ống rộng thoãi mái, thích hợp mọi dáng.  Nhí size 2-9 — Đại size 10-16 — Cồ size 18 - 24.",
    },
    {
      key: "2",
      label: "Chính sách vận chuyển",
      children: (
        <div>
          Giao hàng toàn quốc với 2 hình thức: Chuyển khoản trước hoặc Thanh
          toán khi nhận hàng (COD). Nhà vận chuyển uy tín: Giaohangnhanh,
          Ninjavan, GHTK. PHÍ VẬN CHUYỂN - Toàn Quốc: Đồng giá 30.000đ. Miễn phí
          vận chuyển cho đơn hàng trên 500.000đ. Đơn hàng trên 250.000đ phí chỉ
          còn 18.000đ. - Riêng TPHCM: Đồng giá 17.000đ. Miễn phí vận chuyển cho
          đơn hàng trên 250.000đ.
          <table width="100%">
            <tbody>
              <tr>
                <td>Khu Vực</td>
                <td>Thời Gian</td>
              </tr>
              <tr>
                <td>TP. Hồ Chí Minh</td>
                <td>1 - 2 ngày</td>
              </tr>
              <tr>
                <td>Hà Nội, Đà Nẵng, Miền Nam</td>
                <td>2 - 3 ngày</td>
              </tr>
              <tr>
                <td>Các thành phố khác</td>
                <td>3 - 5 ngày</td>
              </tr>
            </tbody>
          </table>
          Giờ làm việc và tư vấn khách hàng: Từ 8giờ sáng đến 5 giờ chiều từ Thứ
          2 đến thứ 7. ​ HOTLINE: 1900.636100 ZALO: 0938100276
        </div>
      ),
    },
    {
      key: "3",
      label: "Chính sách đổi trả",
      children: (
        <div>
          "HƯỜNG MỸ SHOP hỗ trợ đổi trả sản phẩm với quy trình cực kì đơn giản,
          dễ dàng cho khách hàng: - Bước 1: Trong vòng 3 ngày kể từ khi nhận
          hàng, nếu phát hiện sản phẩm có vấn đề hoặc không vừa ý, khách hàng bỏ
          sản phẩm vào bao bì kèm giấy tờ nhãn mác như ban đầu. - Bước 2: Khách
          hàng liên hệ HUONG MY SHOP (Facebook hoặc Hotline 0988233528) để thông
          báo về trường hợp của mình. - Bước 3: Cửa hàng đối chiếu và tiến hành
          đổi sản phẩm hoặc chuyển khoản lại tiền cho khách hàng trong thời gian
          sớm nhất."
        </div>
      ),
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };

  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default TabsComponent;
