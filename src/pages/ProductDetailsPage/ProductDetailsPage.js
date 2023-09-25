import React from "react";
import { useNavigate } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", background: "#efefef", minHeight: "70vh" }}>
      <div style={{ maxWidth: "1270px", margin: "0 auto" }}>
        <h5 style={{ padding: "10px 0" }}>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}>
            Trang chủ
          </span>{" "}
          - Chi tiết sản phẩm
        </h5>
        {/* <BreadcrumbComponent /> */}
        <ProductDetailsComponent />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
