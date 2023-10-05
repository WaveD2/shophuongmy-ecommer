import { createSlice } from "@reduxjs/toolkit";
import Message from "../../components/Message/Message";

const initialState = {
  orderItems: [],
  orderItemsHeart: [],
  shippingAddress: {},
  paymentMethod: "",
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isSuccessOrder: false,
  size: "",
  color: "",
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addHeartProduct: (state, action) => {
      const { orderItem } = action.payload;

      const itemOrder = state?.orderItemsHeart?.find(
        (item) => item?.id === orderItem.id
      );

      if (!itemOrder) {
        Message({
          typeMes: "success",
          mes: `${orderItem?.name?.toUpperCase()} đã được thêm vào yêu thích`,
        });
        state?.orderItemsHeart?.push(orderItem);
      } else {
        Message({
          typeMes: "warning",
          mes: `${orderItem?.name?.toUpperCase()} đã thêm vào yêu thích`,
        });
      }
    },

    deleteHeartProduct: (state, action) => {
      const itemOrder = state?.orderItemsHeart?.filter(
        (item) => item?.id !== action.payload
      );

      if (itemOrder) {
        state.orderItemsHeart = itemOrder;
      } else {
        Message({
          typeMes: "warning",
          mes: "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    },
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;

      const itemOrder = state?.orderItems?.find(
        (item) => item?.id === orderItem.id
      );

      if (itemOrder) {
        if (itemOrder.amount <= itemOrder.countInstock) {
          itemOrder.amount += orderItem?.amount;
          if (orderItem.amount >= 1) {
            state.totalPrice += itemOrder.price * orderItem.amount;
          } else {
            state.totalPrice += itemOrder.price;
          }
          state.isSuccessOrder = true;
          state.isErrorOrder = false;
        }
      } else {
        Message({
          typeMes: "success",
          mes: `${orderItem?.name?.toUpperCase()} đã được thêm vào giỏ hàng`,
        });
        state.orderItems?.push(orderItem);
        if (orderItem.amount >= 1) {
          state.totalPrice += orderItem.price * orderItem.amount;
        } else {
          state.totalPrice += orderItem.price;
        }
      }
    },
    resetOrder: (state) => {
      state.isSuccessOrder = false;
      state.orderItems = [];
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.id === idProduct
      );

      itemOrder.amount++;
      state.totalPrice += itemOrder.price;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.id === idProduct
      );

      itemOrder.amount--;
      state.totalPrice -= itemOrder.price;
    },
    removeOrderProduct: (state, action) => {
      const itemOrderDelete = state?.orderItems.find(
        (item) => item?.id === action.payload
      );
      const itemOrder = state?.orderItems?.filter(
        (item) => item?.id !== action.payload
      );
      if (itemOrderDelete.amount) {
        state.totalPrice -= itemOrderDelete.price * itemOrderDelete.amount;
      } else {
        state.totalPrice -= itemOrderDelete.price;
      }

      state.orderItems = itemOrder;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;

      const itemOrders = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.id)
      );
      if (itemOrders.length > 0) {
        const total = itemOrders.reduce((currentTotal, itemOrderDelete) => {
          if (itemOrderDelete.amount) {
            currentTotal += itemOrderDelete.price * itemOrderDelete.amount;
          } else {
            currentTotal += itemOrderDelete.price;
          }
        }, 0);
        state.totalPrice += total;
        state.orderItems = itemOrders;
      } else {
        state.totalPrice = 0;
        state.orderItems = [];
      }
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.id)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSelected = orderSelected;
    },
  },
});

export const {
  addHeartProduct,
  deleteHeartProduct,
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
