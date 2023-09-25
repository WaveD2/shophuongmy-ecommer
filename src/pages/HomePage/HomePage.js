import React, { useState, useEffect } from "react";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
  ContainerProducts,
  ContainerHome,
} from "./style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { MenuHeader } from "../../utils/Constant";
import * as ProductService from "../../services/ProductService";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { ContainerOrder } from "../OrderPage/style";

const HomePage = () => {
  const [limit, setLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  const fetchAllTypeProduct = async () => {
    setIsLoading(true);
    const res = await ProductService.getListProductType({
      type: "san-pham-noi-bat",
    });
    if (res.status === "OK") setListProduct(res.data);
    else throw new Error("Lỗi server");
  };

  useEffect(() => {
    fetchAllTypeProduct();
    setIsLoading(false);
  }, []);

  return (
    <ContainerHome>
      <WrapperTypeProduct>
        {MenuHeader.map((item, index) => {
          return <TypeProduct item={item} key={index} />;
        })}
      </WrapperTypeProduct>

      <Loading isLoading={isLoading}>
        <ContainerOrder>
          <ContainerHome>
            <SliderComponent arrImages={[slider1, slider2, slider3]} />

            {listProduct.length > 0 && (
              <ContainerProducts>
                <h3>Sản phẩm nổi bật</h3>
                <WrapperProducts>
                  {listProduct?.map((product, index) => {
                    return (
                      <CardComponent
                        key={index}
                        countInStock={product?.countInStock}
                        description={product?.description}
                        images={product?.images}
                        name={product?.name}
                        price={product?.price}
                        type={product?.type}
                        discount={product?.discount}
                        size={product?.size}
                        colors={product?.colors}
                        id={product?._id}
                        isIconDelete={false}
                      />
                    );
                  })}
                </WrapperProducts>
              </ContainerProducts>
            )}

            {/* <NavbarComponent /> */}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}>
              <ButtonComponent
                textButton={"Xem thêm"}
                styleButton={{
                  padding: "10px 28px",
                  background: "#d85dff57",
                  borderRadius: "5px",
                  margin: "12px 0",
                }}
              />
              {/* <WrapperButtonMore
                text={"Load more"}
                type="outline"
                styleButton={{
                  border: `1px solid ${
                    products?.total === products?.data?.length
                      ? "#f5f5f5"
                      : "#9255FD"
                  }`,
                  color: `${
                    products?.total === products?.data?.length
                      ? "#f5f5f5"
                      : "#9255FD"
                  }`,
                  width: "240px",
                  height: "38px",
                  borderRadius: "4px",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                styleTextButton={{
                  fontWeight: 500,
                  color: products?.total === products?.data?.length && "#fff",
                }}
                onClick={() => setLimit((prev) => prev + 6)}
              /> */}
            </div>
          </ContainerHome>
        </ContainerOrder>
      </Loading>
    </ContainerHome>
  );
};

export default HomePage;
