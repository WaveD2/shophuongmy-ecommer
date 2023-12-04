import React from "react";
import { useNavigate } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { ContainerHome } from "../HomePage/style";
import TextTitleComponent from "../../components/TextTitleComponent/TextTitleComponent";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <ContainerHome>
      <TextTitleComponent
        text={"Chi tiết sản phẩm"}
        style={{ fontSize: "18px", margin: "8px" }}
      />
      <ProductDetailsComponent />
    </ContainerHome>
  );
};

export default ProductDetailsPage;
//
