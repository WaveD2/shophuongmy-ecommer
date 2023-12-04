import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperCountOrder,
  WrapperItemOrder,
  WrapperItemOrderInfo,
  TextInformation,
} from "./style";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderConstant, Payments } from "../../utils/Constant";
import { convertPrice } from "../../utils/convert";
import { BoxDetailOrder } from "../OrderPage/style";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { state } = location;

  const deliveryOrder = orderConstant?.find(
    (item) => item.value === state?.delivery
  );
  const paymentOrder = Payments?.find((item) => item.value === state?.payment);
  return (
    <div className="containerBoxPage">
      <Loading isLoading={false}>
        <h3>Đơn hàng đặt thành công</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {deliveryOrder?.title}
                  </span>
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>

                <WrapperValue>{paymentOrder?.title}</WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}>
                      <img
                        src={order.image}
                        className="styleImg"
                        alt="ảnh sản phẩm"
                      />
                      <BoxDetailOrder>
                        <h3>{order?.name}</h3>
                        <p>
                          {order?.size} - <span>{order?.color}</span>
                        </p>
                      </BoxDetailOrder>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}>
                      <TextInformation>
                        Giá tiền: {convertPrice(order?.price)}
                      </TextInformation>

                      <TextInformation>
                        Số lượng: {order?.amount}
                      </TextInformation>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>
            <div style={{ margin: " 12px 0" }}>
              <span style={{ fontSize: "16px", color: "red" }}>
                Tổng tiền: {convertPrice(state?.totalPriceMemo)}
              </span>
            </div>
          </WrapperContainer>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccessPage;
