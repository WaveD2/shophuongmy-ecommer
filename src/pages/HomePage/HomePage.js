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
import { MenuHeader } from "../../utils/Constant";
import * as ProductService from "../../services/ProductService";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { ContainerOrder } from "../OrderPage/style";
import HookInfiniteScroll from "../../utils/HookScroll";
import TextTitleComponent from "../../components/TextTitleComponent/TextTitleComponent";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCallApi, setIsCallApi] = useState(true);
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (windowHeight + scrollPosition >= documentHeight && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    const fetchAllTypeProduct = async () => {
      try {
        const res = await ProductService.getAllProduct({
          page,
        });
        if (res.data.length > 0 || res.status === "OK")
          setListProduct((prev) => [...prev, ...res.data]);
        else if (res.data.length > 0 && res.status === "OK") {
          return;
        } else {
          setIsCallApi(false);
          setIsLoading(true);
          return;
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    if (isCallApi) {
      setIsLoading(true);
      fetchAllTypeProduct();
    }
  }, [page]);

  return (
    <ContainerHome>
      <WrapperTypeProduct>
        {MenuHeader.map((item, index) => {
          return <TypeProduct item={item} key={index} />;
        })}
      </WrapperTypeProduct>

      <ContainerHome>
        <SliderComponent arrImages={[slider1, slider2, slider3]} />

        {listProduct.length > 0 && (
          <ContainerProducts>
            <TextTitleComponent
              text={"Sản phẩm nổi bật"}
              className="text_header_container"
            />

            <Loading isLoading={isLoading}>
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
                      color={product?.color}
                      id={product?._id}
                      isIconDelete={false}
                    />
                  );
                })}
              </WrapperProducts>
            </Loading>
          </ContainerProducts>
        )}
      </ContainerHome>
    </ContainerHome>
  );
};

export default HomePage;
