/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperIconProduct,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { WrapperCardStyle } from "./WrapperCardStyle";
import {
  DeleteOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils/convert";
import TooltipComponent from "../TooltipComponent/TooltipComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  addHeartProduct,
  addOrderProduct,
  deleteHeartProduct,
} from "../../redux/Slice/orderSlide";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    images,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
    size,
    colors,
    isIconDelete,
  } = props;

  const detailImage =
    Array.isArray(images) && images?.length > 0 ? images[0]?.thumbUrl : images;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  const productHeart = order?.orderItemsHeart?.some(
    (product) => product.id === id
  );
  const handleAddProductHeart = (e) => {
    e.stopPropagation();
    dispatch(
      addHeartProduct({
        orderItem: {
          name: name,
          amount: 1,
          image: detailImage,
          price: price,
          id: id,
          discount: discount,
          countInstock: countInStock,
          size: size,
          color: colors,
        },
      })
    );
  };
  const handleAddProductOrder = (e) => {
    e.stopPropagation();
    dispatch(
      addOrderProduct({
        orderItem: {
          name: name,
          amount: 1,
          image: detailImage,
          price: price,
          id: id,
          discount: discount,
          countInstock: countInStock,
          size: size[0],
          color: colors[0],
        },
      })
    );
  };
  return (
    <WrapperCardStyle
      hoverable
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="ảnh sản phẩm" src={detailImage} />}
      onClick={() => handleDetailsProduct(id)}>
      <img
        src={logo}
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: -1,
          left: -1,
          borderTopLeftRadius: "3px",
        }}
      />
      <StyleNameProduct>{name}</StyleNameProduct>

      <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
      </WrapperPriceText>

      {!isIconDelete ? (
        <WrapperIconProduct>
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
          <TooltipComponent
            title={"Thêm vào giỏ hàng"}
            handlerClick={handleAddProductOrder}
            children={<ShoppingCartOutlined className="styleIconBox" />}
          />
        </WrapperIconProduct>
      ) : (
        <WrapperIconProduct>
          <TooltipComponent
            title={"Xóa yêu thích"}
            handlerClick={(e) => {
              e.stopPropagation();
              dispatch(deleteHeartProduct(id));
            }}
            children={<DeleteOutlined size={20} className="styleIconBox" />}
          />
        </WrapperIconProduct>
      )}
    </WrapperCardStyle>
  );
};

export default CardComponent;
