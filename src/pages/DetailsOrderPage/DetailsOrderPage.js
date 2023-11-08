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
import "./style.module.css";
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

  const methodShipping = orderConstant?.find(
    (item) => item.value === data?.shippingMethod
  );

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
                    {data?.shippingAddress?.city}{" "}
                    {data?.shippingAddress?.district}
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
                  <p className="name-delivery">{methodShipping?.title}</p>
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

          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Mã đơn hàng</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Giảm giá</th>
                <th>Thanh toán</th>
              </tr>
            </thead>

            <tbody>
              {data?.orderItems?.map((order) => (
                <tr>
                  <td>
                    <img
                      src={order?.image}
                      className="styleImg"
                      alt="ảnh sản phẩm"
                    />
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                      }}>
                      {order?.name}
                    </span>
                  </td>

                  <td>{data?._id}</td>
                  <td>{convertPrice(order?.price)}</td>
                  <td>{order?.amount}</td>
                  <td>
                    {order?.discount
                      ? convertPrice((priceMemo * order?.discount) / 100)
                      : "0 VND"}
                  </td>
                  <td>{convertPrice(data?.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {data?.orderItems?.map((order) => {
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
            })} */}
        </div>
      </Loading>
    </div>
  );
};

export default DetailsOrderPage;
