import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { ContainerHome } from "../HomePage/style";
import TextTitleComponent from "../../components/TextTitleComponent/TextTitleComponent";

const ProductDetailsPage = () => {
  return (
    <ContainerHome>
      <TextTitleComponent
        text={"Chi tiết sản phẩm"}
        className="text_header_container"
        style={{ margin: "12px 0" }}
      />
      <ProductDetailsComponent />
    </ContainerHome>
  );
};

export default ProductDetailsPage;
//
