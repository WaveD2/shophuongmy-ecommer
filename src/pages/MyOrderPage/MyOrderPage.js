/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
  TextInfoOrder,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Message from "../../components/Message/Message";
import { convertPrice } from "../../utils/convert";
import { TextProductFavorite } from "../ProductFavoritePage/style";

const MyOrderPage = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const { state } = location;
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    if (user?.id) {
      const res = await OrderService.getOrderByUserId({
        id: user?.id,
        access_token: user?.access_token,
      });

      return res.data;
    }
  };

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrder },
    {
      enabled: state?.id && state?.token,
    }
  );
  const { isLoading, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      Message({ typeMes: "success", mes: "Thành công" });
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      Message({ typeMes: "error", mes: dataCancel?.message });
    } else if (isErrorCancle) {
      Message({ typeMes: "error", mes: "Có lỗi xảy ra" });
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img className="styleImg" src={order?.image} />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}>
            <h3> {order?.name}</h3>
            <p>
              Số lượng : <span>{order?.amount}</span>
            </p>
            <p>
              Size : <span>{order?.size}</span>
            </p>
          </div>
          <p style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}>
            {convertPrice(order?.price)}
          </p>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <div className="containerBoxPage">
      <Loading isLoading={isLoading || isLoadingCancel}>
        <WrapperContainer>
          <TextInfoOrder>Đơn hàng của tôi</TextInfoOrder>
          <WrapperListOrder>
            {data?.length > 0 ? (
              data?.map((order) => {
                return (
                  <WrapperItemOrder key={order?._id}>
                    <WrapperStatus>
                      <h2 style={{ color: "rgb(255, 66, 78)" }}>Trạng thái</h2>
                      <TextInfoOrder>
                        <span style={{ color: "rgb(255, 66, 78)" }}>
                          Giao hàng :
                        </span>
                        {`${
                          order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                        }`}
                      </TextInfoOrder>
                      <TextInfoOrder>
                        <span style={{ color: "rgb(255, 66, 78)" }}>
                          Thanh toán :
                        </span>
                        {`${
                          order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                        }`}
                      </TextInfoOrder>
                    </WrapperStatus>
                    {renderProduct(order?.orderItems)}
                    <WrapperFooterItem>
                      <div>
                        <span style={{ color: "rgb(255, 66, 78)" }}>
                          Tổng tiền:{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "rgb(56, 56, 61)",
                            fontWeight: 700,
                          }}>
                          {convertPrice(order?.totalPrice)}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <ButtonComponent
                          onClick={() => handleCanceOrder(order)}
                          size={40}
                          styleButton={{
                            height: "36px",
                            border: "1px solid #9255FD",
                            borderRadius: "4px",
                          }}
                          textButton={"Hủy đơn hàng"}
                          styleTextButton={{
                            color: "#9255FD",
                            fontSize: "14px",
                          }}
                        />
                        <ButtonComponent
                          onClick={() => handleDetailsOrder(order?._id)}
                          size={40}
                          styleButton={{
                            height: "36px",
                            border: "1px solid #9255FD",
                            borderRadius: "4px",
                          }}
                          textButton={"Xem chi tiết"}
                          styleTextButton={{
                            color: "#9255FD",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
                );
              })
            ) : (
              <TextProductFavorite>
                Đơn hàng trống. Vui lòng quay lại mua hàng
              </TextProductFavorite>
            )}
          </WrapperListOrder>
        </WrapperContainer>
      </Loading>
    </div>
  );
};

export default MyOrderPage;
