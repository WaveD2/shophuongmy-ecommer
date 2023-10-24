import React from "react";
import bgShop from "../../assets/images/bgShop.jpg";
import { DesTextPage, TitleTextPage } from "./style";
const AboutUsPage = () => {
  return (
    <div className="containerBoxPage">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <img
          src={bgShop}
          alt="ảnh cửa hàng shop"
          style={{ width: "100%", objectFit: "contain" }}
        />

        <h3>
          Cửa hàng
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#f36565",
              fontSize: "18px",
              fontWeight: 600,
            }}>
            {" "}
            quần áo trẻ em Hường Mỹ
          </a>{" "}
          là một trong những kênh mua sắm thời trang babi online đã và đang được
          rất nhiều ông bố, bà mẹ quan tâm, tin tưởng nhất hiện nay. Bởi khi mua
          sắm tại Bé xinh shop, quý khách không chỉ tiết kiệm được rất nhiều
          thời gian mà có thể dễ dàng tìm thấy cho bé cưng nhà bạn đủ các loại
          quần áo thời trang, phụ kiện chất lượng cao từ sơ sinh đến 15 tuổi
          dành cho cả bé trai lẫn bé gái.
        </h3>

        <ul>
          <TitleTextPage>
            Cửa hàng quần áo trẻ em Hường Mỹ Cam kết:
          </TitleTextPage>
          <DesTextPage>
            Cung cấp các sản phẩm – dịch vụ chất lượng tốt nhất, giá cạnh tranh,
            dễ mua với dịch vụ chu đáo và thân thiện.
          </DesTextPage>
          <DesTextPage>
            Được đổi, trả hàng trong vòng 3 ngày với bất kỳ lý do gì.
          </DesTextPage>
          <DesTextPage>
            Đội ngũ nhân viên tư vấn nhiệt tình và thân thiện.
          </DesTextPage>
        </ul>

        <ul>
          <TitleTextPage>Địa chỉ: Thị Trấn , Đô Lương, Nghệ An</TitleTextPage>
          <DesTextPage>
            Giờ làm việc và tư vấn khách hàng: Từ 8giờ sáng đến 5 giờ chiều từ
            Thứ 2 đến thứ 7. ​
          </DesTextPage>
          <DesTextPage>HOTLINE: 0988233528 </DesTextPage>
          <DesTextPage>
            Đội ngũ nhân viên tư vấn nhiệt tình và thân thiện.
          </DesTextPage>
          .
        </ul>
      </div>
    </div>
  );
};

export default AboutUsPage;
