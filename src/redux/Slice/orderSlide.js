/* eslint-disable no-use-before-define */
import { createSlice, current } from "@reduxjs/toolkit";
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
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addHeartProduct: (state, action) => {
      const { orderItem } = action.payload;

      const itemOrder = current(state).orderItemsHeart?.find(
        (item) => item.id === orderItem.id
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
      console.log("orderItem", orderItem);
      const itemOrder = current(state).orderItems?.find(
        (item) =>
          item.id === orderItem.id &&
          item.size === orderItem.size &&
          item.color === orderItem.color
      );

      if (itemOrder) {
        if (orderItem.amount <= itemOrder.countInstock) {
          state.orderItems.forEach((item) => {
            if (
              item.id === orderItem.id &&
              item.size === orderItem.size &&
              item.color === orderItem.color
            ) {
              item.amount += orderItem.amount;
              item.countInstock -= orderItem.amount;

              if (orderItem.amount >= 1) {
                state.totalPrice += item.price * orderItem.amount;
              } else {
                state.totalPrice += item.price;
              }
            }
          });

          state.isSuccessOrder = true;
          state.isErrorOrder = false;
        }
      } else {
        Message({
          typeMes: "success",
          mes: `${orderItem?.name?.toUpperCase()} đã được thêm vào giỏ hàng`,
        });
        state.orderItems?.push(orderItem);
      }
      if (orderItem.amount >= 1) {
        state.totalPrice += orderItem.price * orderItem.amount;
      } else {
        state.totalPrice += orderItem.price;
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
      itemOrder.countInstock--;
      state.totalPrice += itemOrder.price;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.id === idProduct
      );

      itemOrder.amount--;
      itemOrder.countInstock++;
      state.totalPrice -= itemOrder.price;
    },
    removeOrderProduct: (state, action) => {
      const { idProduct, color, size } = action.payload;
      const itemOrderDelete = current(state).orderItems.find(
        (item) =>
          item?.id === idProduct && item?.color === color && item?.size === size
      );

      const itemOrder = current(state).orderItems?.filter((item) => {
        return (
          item.id !== idProduct || item.color !== color || item.size !== size
        );
      });

      if (itemOrderDelete.amount) {
        state.totalPrice -= itemOrderDelete.price * itemOrderDelete.amount;
      } else {
        state.totalPrice -= itemOrderDelete.price;
      }

      state.orderItems = itemOrder;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;

      const itemOrders = current(state).orderItems?.filter(
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
      current(state).orderItems.forEach((order) => {
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
