import axios from "axios";
import { axiosJWT } from "./UserService";
import Message from "../components/Message/Message";

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BASE_URL}/order/create/${data.user}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log("res", res);
  if (res.status === "ERR")
    return Message({
      typeMes: "error",
      mes: res.message,
    });
  else return res.data;
};

export const getOrderByUserId = async ({ id, access_token }) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BASE_URL}/order/get-all-order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsOrder = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BASE_URL}/order/get-details-order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const cancelOrder = async (id, access_token, orderItems, userId) => {
  const data = { orderItems, orderId: id };
  const res = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/order/cancel-order/${userId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
      data,
    }
  );

  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BASE_URL}/order/get-all-order`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
