import { Col, Image, Rate, Row } from "antd";
import React from "react";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  BoxInDecrease,
} from "./style";
import { PlusOutlined, MinusOutlined, HeartOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/LoadingComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Message from "../Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import { convertPrice } from "../../utils/convert";
import TabsComponent from "../TabsComponent/TabsComponent";
import { ContainerProducts, WrapperProducts } from "../../pages/HomePage/style";
import CardComponent from "../CardComponent/CardComponent";
import SelectOption from "../InputForm/SelectOption";
import {
  addOrderProduct,
  addHeartProduct,
  resetOrder,
} from "../../redux/Slice/orderSlide";
import TooltipComponent from "../TooltipComponent/TooltipComponent";

const ProductDetailsComponent = () => {
  const { id: idProduct } = useParams();

  const [numProduct, setNumProduct] = useState(1);
  const [detailProduct, setDetailProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sizeProduct, setSizeProduct] = useState("");
  const [colorProduct, setColorProduct] = useState("");
  const [detailImgPreview, setDetailImgPreview] = useState();
  const [listProduct, setListProduct] = useState([]);

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const productHeart = order?.orderItemsHeart?.some(
    (product) => product.id === idProduct
  );
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (id) => {
    setIsLoading(true);
    const res = await ProductService.getDetailsProduct({ id });
    if (res?.data) {
      setDetailProduct(res?.data);
      setDetailImgPreview(res.data?.images[0].thumbUrl);
      setIsLoading(false);
      return res.data;
    } else {
      setIsLoading(true);
    }
  };
  // useEffect(() => {
  //     initFacebookSDK()
  // }, [])
  const { data: productDetails } = useQuery({
    queryKey: ["products-detail"],
    queryFn: fetchGetDetailsProduct,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    fetchGetDetailsProduct(idProduct);
  }, [idProduct]);

  const fetchAllTypeProduct = async () => {
    if (detailProduct?.type) {
      const res = await ProductService.getListProductType({
        type: detailProduct.type,
      });
      if (res.status === "OK") {
        setListProduct(res.data);
        setIsLoading(false);
      } else setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, [detailProduct?.type]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const handleBuyProduct = () => {
    if (!user?.id) {
      Message({
        typeMes: "error",
        mes: "Vui lòng đăng nhập để tiếp tục mua hàng",
      });
      return navigate("/sign-in", { state: location?.pathname });
    }
    if (!sizeProduct) {
      Message({ typeMes: "error", mes: "Vui lòng chọn size sản phẩm" });
    } else if (!colorProduct) {
      Message({ typeMes: "error", mes: "Vui lòng chọn màu sản phẩm" });
    } else {
      navigate("/order");
      dispatch(
        addOrderProduct({
          orderItem: {
            name: detailProduct?.name,
            amount: numProduct,
            image: detailImgPreview,
            price: detailProduct?.price,
            id: detailProduct?._id,
            discount: detailProduct?.discount,
            countInstock: detailProduct?.countInStock,
            size: sizeProduct,
            color: colorProduct,
          },
        })
      );
    }
  };

  console.log("detailProduct", detailProduct);

  const handleAddProductHeart = (e) => {
    e.stopPropagation();
    dispatch(
      addHeartProduct({
        orderItem: {
          name: detailProduct?.name,
          amount: numProduct,
          image: detailImgPreview,
          price: detailProduct?.price,
          id: detailProduct?._id,
          discount: detailProduct?.discount,
          countInstock: detailProduct?.countInStock,
          size: sizeProduct,
          color: colorProduct,
        },
      })
    );
  };

  const handleAddOrderProduct = (e) => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: detailProduct?.name,
            amount: numProduct,
            image: detailImgPreview,
            price: detailProduct?.price,
            id: detailProduct?._id,
            discount: detailProduct?.discount,
            countInstock: detailProduct?.countInStock,
            size: detailProduct?.size[0],
            color: detailProduct?.colors[0],
          },
        })
      );
    } else {
      Message({
        typeMes: "error",
        mes: "Có lỗi xảy ra! Vui lòng kiểm tra lại",
      });
      setErrorLimitOrder(true);
    }
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Row
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "4px",
            height: "100%",
            flexFlow: "unset",
          }}>
          <Col
            style={{
              borderRight: "1px solid #e5e5e5",
              display: "flex",
              minWidth: "670px",
            }}>
            {detailProduct?.images.length > 1 && (
              <Row
                style={{
                  paddingTop: "10px",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                {detailProduct?.images.map((img, index) => (
                  <WrapperStyleColImage span={4} key={index}>
                    <WrapperStyleImageSmall
                      src={img?.thumbUrl}
                      alt="ảnh sản phẩm"
                      preview={false}
                      onClick={() => {
                        setDetailImgPreview(img?.thumbUrl);
                      }}
                    />
                  </WrapperStyleColImage>
                ))}
              </Row>
            )}

            <div
              style={{
                position: "relative",
                maxHeight: "526px",
                width: "100%",
              }}>
              <Image
                src={detailImgPreview}
                alt="ảnh sản phẩm"
                preview={false}
                style={{
                  height: "100%",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "24px",
                }}>
                <TooltipComponent
                  handlerClick={handleAddProductHeart}
                  title={"Yêu thích"}
                  children={
                    productHeart ? (
                      <svg
                        width="1.3em"
                        height="1.3em"
                        fill="currentColor"
                        viewBox="64 64 896 896"
                        color="#ee6262">
                        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
                      </svg>
                    ) : (
                      <HeartOutlined className="styleIconBox" />
                    )
                  }
                />
              </span>
            </div>
          </Col>

          <Col style={{ paddingLeft: "10px" }}>
            <WrapperStyleNameProduct>
              {detailProduct?.name}
            </WrapperStyleNameProduct>
            <div>
              <WrapperStyleTextSell>Đã bán 1000+</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>
                {convertPrice(detailProduct?.price)}
              </WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
              <span>Giao đến </span>
              <span className="address">{user?.address}</span> -
              <span className="change-address">Đổi địa chỉ</span>
            </WrapperAddressProduct>
            {/* <LikeButtonComponent
                       dataHref={ process.env.REACT_APP_IS_LOCAL 
                                  ? "https://developers.facebook.com/docs/plugins/" 
                                  : window.location.href
                              } 
                      /> */}

            <div style={{ display: "flex" }}>
              <SelectOption
                styleWidth={"120px"}
                handleChange={(value) => setColorProduct(value)}
                placeholder={"Chọn màu"}
                optionsItem={detailProduct?.colors}
              />
              <SelectOption
                styleWidth={"120px"}
                handleChange={(value) => setSizeProduct(value)}
                placeholder={"Chọn size"}
                optionsItem={detailProduct?.size}
              />
            </div>

            <BoxInDecrease>
              <span>Số lượng</span>
              <WrapperQualityProduct>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleChangeCount("decrease", numProduct === 1)
                  }>
                  <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
                </button>
                <WrapperInputNumber
                  onChange={onChange}
                  defaultValue={1}
                  max={detailProduct?.countInStock}
                  min={1}
                  value={numProduct}
                  size="small"
                />
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleChangeCount(
                      "increase",
                      numProduct === productDetails?.countInStock
                    )
                  }>
                  <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
                </button>
              </WrapperQualityProduct>
            </BoxInDecrease>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div>
                <ButtonComponent
                  onClick={() => handleBuyProduct()}
                  size={40}
                  styleButton={{
                    background: "rgb(255, 57, 69)",
                    height: "48px",
                    minWidth: "180px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  textButton={"Mua ngay"}
                  styleTextButton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}></ButtonComponent>
                {errorLimitOrder && (
                  <div style={{ color: "red" }}>San pham het hang</div>
                )}
              </div>
              <ButtonComponent
                size={40}
                onClick={handleAddOrderProduct}
                styleButton={{
                  background: "#fff",
                  height: "48px",
                  minWidth: "180px",
                  border: "1px solid rgb(13, 92, 182)",
                  borderRadius: "4px",
                }}
                textButton={"Thêm vào giỏ hàng"}
                styleTextButton={{
                  color: "rgb(13, 92, 182)",
                  fontSize: "15px",
                }}></ButtonComponent>
            </div>
          </Col>
          {/* <CommentComponent 
                      dataHref={process.env.REACT_APP_IS_LOCAL 
                          ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                          : window.location.href
                      } 
                      width="1270" 
                  /> */}
        </Row>
      </Loading>

      <TabsComponent />

      {listProduct.length > 0 && (
        <ContainerProducts>
          <h3>Sản phẩm liên quan</h3>
          <WrapperProducts>
            {listProduct?.map((product, index) => {
              return (
                <CardComponent
                  key={index}
                  countInStock={product.countInStock}
                  description={product.description}
                  images={product.images}
                  name={product.name}
                  price={product.price}
                  type={product.type}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
        </ContainerProducts>
      )}
    </div>
  );
};

export default ProductDetailsComponent;
