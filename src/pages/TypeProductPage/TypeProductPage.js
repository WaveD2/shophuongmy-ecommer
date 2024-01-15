import React, { useEffect, useState } from "react";
import TabsComponent from "../../components/TabsComponent/TabsComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "../../components/CardComponent/CardComponent";
import { ContainerProducts, WrapperProducts } from "../HomePage/style";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

import { Layout } from "antd";
import { useParams } from "react-router-dom";
import RadioComponent from "../../components/InputForm/RadioCheckBox";
import {
  OptionDiscountProduct,
  OptionPriceProduct,
} from "../../utils/Constant";
import { useSelector } from "react-redux";
import Message from "../../components/Message/Message";
const { Sider, Content } = Layout;

const TypeProductPage = () => {
  const { type } = useParams();
  const user = useSelector((state) => state?.user);

  const [page, setPage] = useState(1);
  const [listProduct, setListProduct] = useState([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (windowHeight + scrollPosition >= documentHeight && !isLoadingFetch) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadingFetch]);

  const fetchMyOrder = async ({ queryKey }) => {
    const { type, page } = queryKey[1];

    setIsLoadingFetch(true);
    const res = await ProductService.getListProductType({
      type,
      page,
    });
    if (res.status === "OK") return res.data;
    else setIsLoadingFetch(true);
    setIsLoadingFetch(false);
  };

  const [optionPrice, setOptionPrice] = useState();
  const [optionDiscount, setOptionDiscount] = useState();

  const queryGetType = useQuery({
    queryKey: ["product-type", { type, page }],
    queryFn: fetchMyOrder,
  });
  const { isLoading, data: dataListProduct } = queryGetType;

  const handleChangePriceProduct = (e) => {
    setOptionPrice(e.target.value);
    setIsLoadingProduct(true);
  };
  const handleChangeDiscountProduct = (e) => {
    setOptionDiscount(e.target.value);
    setIsLoadingProduct(true);
  };

  useEffect(() => {
    setIsLoadingProduct(true);
    try {
      ProductService.getAllProduct({
        price: optionPrice,
        discount: optionDiscount,
        type: type,
        token: user?.access_token,
      }).then((data) => {
        if (data.status === "OK") {
          setListProduct(data.data);
        }
      });
      setIsLoadingProduct(false);
    } catch (error) {
      Message({ typeMes: "error", mes: "Có lỗi xảy ra" });
    }
  }, [isLoadingProduct]);

  let listProductRender =
    listProduct.length > 0 ? listProduct : dataListProduct;

  return (
    <div className="containerBoxPage">
      <LoadingComponent isLoading={isLoading || isLoadingProduct}>
        {dataListProduct?.length > 0 && (
          <ContainerProducts>
            <h3>Sản phẩm</h3>

            <Layout>
              <Sider
                style={{
                  background: "#c0c0c0",
                  padding: "10px",
                  marginRight: "16px",
                  borderRadius: "6px",
                  height: "100%",
                }}>
                <RadioComponent
                  title={"Theo giá tiền"}
                  valueDefault={optionPrice}
                  listOption={OptionPriceProduct}
                  handleChange={handleChangePriceProduct}
                />
                <RadioComponent
                  title={"Độ giảm giá"}
                  valueDefault={optionDiscount}
                  listOption={OptionDiscountProduct}
                  handleChange={handleChangeDiscountProduct}
                />
              </Sider>
              <Layout>
                <Content>
                  <WrapperProducts>
                    {listProductRender?.map((product, index) => {
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
                          colors={product?.color}
                          id={product?._id}
                          isIconDelete={false}
                        />
                      );
                    })}
                  </WrapperProducts>
                </Content>
              </Layout>
            </Layout>
          </ContainerProducts>
        )}
      </LoadingComponent>
    </div>
  );
};

export default TypeProductPage;
