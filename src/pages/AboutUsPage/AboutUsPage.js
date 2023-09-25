import React from "react";
import bgShop from "../../assets/images/bgShop.jpg";
const AboutUsPage = () => {
  return (
    <div className="containerBoxPage">
      <div>
        <img
          src={bgShop}
          alt="ảnh cửa hàng shop"
          style={{ width: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
