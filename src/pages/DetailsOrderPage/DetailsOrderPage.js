import React from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import logo from "../../assets/images/logo.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { convertDate, convertPrice } from "../../utils/convert";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { Payments, orderConstant } from "../../utils/Constant";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders-details"], queryFn: fetchDetailsOrder },
    {
      enabled: id,
    }
  );
  const { isLoading, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  const methodPayment = Payments?.find(
    (item) => item.value === data?.paymentMethod
  );
  console.log("data", data);
  console.log("methodPayment", methodPayment);

  return (
    <div className="containerBoxPage" style={{ paddingTop: "10px" }}>
      <Loading isLoading={isLoading}>
        <div>
          <h4 className="title_text">Chi tiết đơn hàng</h4>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  {data?.shippingAddress?.fullName}
                </div>
                <div className="address-info">
                  <span>Địa chỉ: </span> {data?.shippingAddress?.address}
                  <p>
                    {data?.shippingAddress?.province}{" "}
                    {data?.shippingAddress?.district}{" "}
                    {data?.shippingAddress?.city}
                  </p>
                </div>
                <div className="phone-info">
                  <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className="delivery-info">
                  <p className="name-delivery">
                    {methodPayment?.title || "Có lỗi xảy ra"}
                  </p>
                  <p className="name-delivery">GIAO HÀNG TIẾT KIỆM</p>
                </div>
                <div className="delivery-fee">{data?.shippingPrice}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>

            <WrapperInfoUser>
              <WrapperLabel>Thời gian thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="status-payment">
                  {convertDate(data?.createdAt)}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div className="flexBet">
              <div style={{ width: "670px" }}>Sản phẩm</div>
              <WrapperItemLabel>Mã đơn hàng</WrapperItemLabel>
              <WrapperItemLabel>Giá</WrapperItemLabel>
              <WrapperItemLabel>Số lượng</WrapperItemLabel>
              <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((order) => {
              return (
                <WrapperProduct>
                  <WrapperNameProduct>
                    <img
                      src={order?.image}
                      className="styleImg"
                      alt="ảnh sản phẩm"
                    />
                    <div>{order?.name}</div>
                  </WrapperNameProduct>
                  <WrapperItem>{data?._id}</WrapperItem>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem>{order?.amount}</WrapperItem>
                  <WrapperItem>
                    {order?.discount
                      ? convertPrice((priceMemo * order?.discount) / 100)
                      : "0 VND"}
                  </WrapperItem>
                </WrapperProduct>
              );
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </div>
      </Loading>
    </div>
  );
};

export default DetailsOrderPage;
