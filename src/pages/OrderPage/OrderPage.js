/* eslint-disable jsx-a11y/alt-text */
import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  BoxDetailOrder,
  ContainerOrder,
  CustomCheckbox,
  LabelTitle,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderBuyFast,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/Slice/orderSlide";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import { useNavigate, useLocation } from "react-router-dom";
import { convertPrice } from "../../utils/convert";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/Slice/userSlice";
import FormFormik from "../../components/InputForm/FormFormik";
import {
  CreateDressOrderSchema,
  fieldsDressOrderSchema,
} from "../../utils/YubSchema";
import {
  kiemTraSoDienThoai,
  kiemTraObjectKhongRong,
} from "../../utils/CheckCondition";
import { Payments, orderConstant, valueDiscount } from "../../utils/Constant";
import Message from "../../components/Message/Message";
import axios from "axios";
import SelectOption from "../../components/InputForm/SelectOption";
import { TextProductFavorite } from "../ProductFavoritePage/style";
import RadioComponent from "../../components/InputForm/RadioCheckBox";
import HookDebounce from "../../utils/HookDebounce";
import PayPal from "../../utils/PayPal";
import { Provinces, DressByProvinces } from "../../services/PlaceService";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  console.log("order ", order);

  let listProductOrder =
    order?.orderBuyFast?.length > 0 ? order?.orderBuyFast : order?.orderItems;

  const user = useSelector((state) => state.user);
  const { name, phone, address } = user;
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [isOpenModalDeleteAllProduct, setIsOpenModalDeleteAllProduct] =
    useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [discount, setDiscount] = useState(0);
  const [textDiscount, setTextDiscount] = useState("");
  const [phoneNew, setPhoneNew] = useState(user?.phone);

  const [provinceOrder, setProvinceOrder] = useState({});
  const [cityOrder, setCityOrder] = useState({});
  const [districtOrder, setDistrictOrder] = useState({});
  const [dressDis, setDressDis] = useState("");

  const [payment, setPayment] = useState("later_money");
  const [delivery, setDelivery] = useState("fast");
  const [moneyTransportation, setMoneyTransportation] = useState(0);

  const [isCheckValidate, setIsCheckValidate] = useState(false);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  //Clear orderBuyFast

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (order?.orderBuyFast?.length > 0) {
        dispatch(removeOrderBuyFast());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //Call Options Dress
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((response) => {
      setProvinces([{ code: 0, name: "Chọn tỉnh/thành" }, ...response.data]);
    });
  }, []);

  useEffect(() => {
    setDistricts([]);
    if (
      selectedProvince !== "0" &&
      Number(selectedProvince) !== 0 &&
      typeof selectedProvince !== "undefined"
    ) {
      async function fetchData() {
        const response = await DressByProvinces({
          key: "p",
          param: selectedProvince,
          //typeValue = {key : name , value : {code : 0 , name : 'Chọn xã/phường'}}
          typeValue: {
            key: "districts",
            value: { code: 0, name: "Chọn quận/huyện" },
          },
        });
        setCities(response);
      }
      fetchData();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (
      selectedCity !== "0" &&
      Number(selectedCity) !== 0 &&
      typeof selectedCity !== "undefined"
    ) {
      async function fetchData() {
        const response = await DressByProvinces({
          key: "d",
          param: selectedProvince,
          //typeValue = {key : name , value : {code : 0 , name : 'Chọn xã/phường'}}
          typeValue: {
            key: "wards",
            value: { code: 0, name: "Chọn xã/phường" },
          },
        });
        setDistricts(response);
      }
      fetchData();
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const handleProvinceChange = (value) => {
    const provinceUser = provinces?.find((item) => item.code === +value);
    setProvinceOrder(provinceUser);
    setSelectedProvince(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    const cityUser = cities?.find((item) => item.code === +value);
    setCityOrder(cityUser || {});
  };

  const handleDistrictChange = (value) => {
    setDistrictOrder(value);
    const districtUser = districts?.find((item) => item.code === +value);
    setDistrictOrder(districtUser || {});
  };

  useEffect(() => {
    if (provinceOrder?.code > 0 && provinceOrder?.code) {
      const shipper =
        0 <= Number(provinceOrder?.code) <= 12 ||
        28 <= Number(provinceOrder?.code) <= 45
          ? 20000
          : 30000;
      const shipDelivery = delivery === "fast" ? 10000 : 5000;
      setMoneyTransportation(shipper + shipDelivery);
    }
  }, [provinceOrder]);

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };
  const handleRemoveAllOrder = (e) => {
    if (listChecked?.length >= 1) {
      setIsOpenModalDeleteAllProduct(false);
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleDeleteOrder = (idProduct, color, size) => {
    dispatch(removeOrderProduct({ idProduct, color, size }));
  };
  const handleSetPhone = (e) => {
    if (e.target.value) setPhoneNew(Number(e.target.value));
  };
  const handleAddDress = (e) => {
    if (e.target.value) setDressDis(e.target.value);
  };

  const handleAddDiscount = (e) => {
    setTextDiscount(String(e.target.value));
  };

  const handleCheckDiscount = (e) => {
    e.preventDefault();
    if (textDiscount.length > 8) {
      const isDiscount = valueDiscount.find(
        (item) => item.key === textDiscount
      );

      if (isDiscount) return setDiscount(isDiscount.discount);
      else
        return Message({
          typeMes: "error",
          mes: "Mã giảm giá chưa chính xác",
        });
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      listProductOrder?.forEach((item) => {
        newListChecked.push(item?.id);
      });

      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handlePayment = () => {
    setIsCheckValidate(true);
  };

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;
  const isDebouncing = HookDebounce(isLoadingAddOrder);

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      listProductOrder?.forEach((element) => {
        arrayOrdered.push(element.id);
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));

      setMoneyTransportation(0);
      Message({
        typeMes: "success",
        mes: "Đặt hàng thành công",
      });
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: listProductOrder,
          totalPriceMemo: order?.totalPrice,
        },
      });
    } else if (isError) {
      Message({
        typeMes: "error",
        mes: "Đặt hàng không thành công",
      });
    }
    setIsLoadingComponent(false);
  }, [isSuccess, isError]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.UpdateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  //Payment
  const onSuccessPaypal = (details, data) => {
    setIsLoadingComponent(true);
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: listProductOrder,
      fullName: user?.name,
      province: provinceOrder?.name,
      district: districtOrder?.name,
      address: dressDis,
      phone: user?.phone,
      city: cityOrder?.name,
      paymentMethod: payment,
      shippingPrice: moneyTransportation,
      totalPrice: order?.totalPrice,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
      shippingMethod: delivery,
    });
  };

  const handleChangePayment = (e) => {
    setPayment(e.target.value.toString());
  };

  const handleChangeShipOrder = (e) => {
    setDelivery(e.target.value.toString());
  };

  useEffect(() => {
    if (isCheckValidate) {
      if (!listProductOrder?.length > 0) {
        Message({ typeMes: "error", mes: "Vui lòng chọn sản phẩm" });
      } else if (!kiemTraSoDienThoai(phoneNew))
        Message({
          typeMes: "error",
          mes: "Số điện thoại không hợp lệ (độ dài từ 8 - 15 ký tự, không chứa ký tự đặc biệt và khoảng trắng)",
        });
      else if (
        !kiemTraObjectKhongRong(provinceOrder) ||
        !kiemTraObjectKhongRong(cityOrder) ||
        !kiemTraObjectKhongRong(districtOrder) ||
        !dressDis
      ) {
        Message({
          typeMes: "error",
          mes: "Kiểm tra lại thông tin. Vui lòng điền đầy đủ thông tin",
        });
      } else {
        const currentTime = new Date();
        mutationAddOrder.mutate({
          token: user?.access_token,
          orderItems: listProductOrder,
          fullName: user?.name,
          province: provinceOrder?.name,
          district: districtOrder?.name,
          address: dressDis,
          phone: phoneNew,
          city: cityOrder?.name,
          paymentMethod: payment,
          shippingPrice: moneyTransportation,
          totalPrice: order?.totalPrice,
          user: user?.id,
          isPaid: false,
          paidAt: currentTime.getDate(),
          email: user?.email,
          shippingMethod: delivery,
        });
      }
    }
    setIsCheckValidate(false);
  }, [isCheckValidate]);

  return (
    <div className="containerBoxPage">
      <Loading
        isLoading={isLoadingComponent}
        children={
          <ContainerOrder>
            <h3 className="text_header_container" style={{ margin: "12px 0" }}>
              Giỏ hàng
            </h3>
            <WrapperOrder>
              <WrapperLeft>
                <WrapperStyleHeader>
                  <span style={{ display: "inline-block", width: "280px" }}>
                    <CustomCheckbox
                      onChange={handleOnchangeCheckAll}
                      checked={
                        listChecked?.length === listProductOrder?.length
                      }></CustomCheckbox>
                    <span> Tất cả ({listProductOrder?.length} sản phẩm)</span>
                  </span>
                  <div className="flexBet">
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                    <DeleteOutlined
                      style={{ cursor: "pointer" }}
                      onClick={handleRemoveAllOrder}
                    />
                  </div>
                </WrapperStyleHeader>

                <WrapperListOrder>
                  {listProductOrder.length > 0 ? (
                    listProductOrder?.map((order, index) => {
                      return (
                        <WrapperItemOrder key={index}>
                          <div
                            style={{
                              width: "280px",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}>
                            <CustomCheckbox
                              onChange={onChange}
                              value={order?.id}
                              checked={listChecked.includes(
                                order?.product
                              )}></CustomCheckbox>
                            <img src={order?.image} className="styleImg" />
                            <BoxDetailOrder
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/product-details/${order.id}`, {
                                  state: location?.pathname,
                                });
                              }}>
                              <h3>{order?.name}</h3>
                              <p>
                                {order?.size} - <span>{order?.color}</span>
                              </p>
                            </BoxDetailOrder>
                          </div>
                          <div className="flexBet">
                            <span>
                              <span
                                style={{ fontSize: "13px", color: "#242424" }}>
                                {convertPrice(order?.price)}
                              </span>
                            </span>
                            <WrapperCountOrder>
                              <button
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleChangeCount(
                                    "decrease",
                                    order?.id,
                                    order?.amount === 1
                                  )
                                }>
                                <MinusOutlined
                                  style={{ color: "#000", fontSize: "10px" }}
                                />
                              </button>
                              <WrapperInputNumber
                                defaultValue={order?.amount}
                                value={order?.amount}
                                size="small"
                                min={1}
                                max={order?.countInstock}
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
                                    order?.id,
                                    order?.amount === order.countInstock,
                                    order?.amount === 1
                                  )
                                }>
                                <PlusOutlined
                                  style={{ color: "#000", fontSize: "10px" }}
                                />
                              </button>
                            </WrapperCountOrder>
                            <span
                              style={{
                                color: "rgb(255, 66, 78)",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}>
                              {convertPrice(order?.price * order?.amount)}
                            </span>
                            <DeleteOutlined
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleDeleteOrder(
                                  order?.id,
                                  order?.color,
                                  order?.size
                                )
                              }
                            />
                          </div>
                        </WrapperItemOrder>
                      );
                    })
                  ) : (
                    <TextProductFavorite>
                      Giỏ hàng trống. Vui lòng quay lại mua hàng
                    </TextProductFavorite>
                  )}
                </WrapperListOrder>

                <WrapperInfo>
                  <div className="flexBet">
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}>
                      {convertPrice(order?.totalPrice)}
                    </span>
                  </div>
                  <div className="flexBet">
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}>
                      {convertPrice(moneyTransportation)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <span>Giảm giá</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}>
                      {discount
                        ? convertPrice(
                            order?.totalPrice +
                              moneyTransportation -
                              ((order?.totalPrice + moneyTransportation) *
                                (100 - discount)) /
                                100
                          )
                        : 0}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}>
                      {discount
                        ? convertPrice(
                            ((order?.totalPrice + moneyTransportation) *
                              (100 - discount)) /
                              100
                          )
                        : convertPrice(order?.totalPrice + moneyTransportation)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </span>
                </WrapperTotal>
              </WrapperLeft>
              <WrapperRight>
                <h3
                  className="text_header_container"
                  style={{ fontSize: "18px" }}>
                  Địa chỉ giao hàng
                </h3>
                <Form
                  onFinish={handlePayment}
                  layout="vertical"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    marginBottom: "10px",
                  }}>
                  <SelectOption
                    styleWidth={"270px"}
                    optionsItem={provinces}
                    handleChange={handleProvinceChange}
                    placeholder={"Chọn tỉnh/thành"}
                    nameOption="Tỉnh thành"
                    labelOption="Tỉnh/thành"
                  />
                  <SelectOption
                    styleWidth={"270px"}
                    optionsItem={cities}
                    handleChange={handleCityChange}
                    placeholder={"Chọn quận/huyện"}
                    nameOption="Quận/huyện"
                    labelOption="Quận/huyện"
                  />
                  <SelectOption
                    styleWidth={"270px"}
                    optionsItem={districts}
                    handleChange={handleDistrictChange}
                    placeholder={"Chọn xã/phường"}
                    nameOption="Xã/phường"
                    labelOption="Xã/phường"
                  />
                  <Form.Item
                    style={{ display: "flex", flexDirection: "column" }}
                    name="Điện thoại"
                    label="Điện thoại"
                    rules={[{ required: true }]}>
                    <Input
                      value={phoneNew}
                      style={{ width: "270px", margin: "8px 0" }}
                      onChange={handleSetPhone}
                      placeholder={"Nhập số điện thoại"}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ display: "flex", flexDirection: "column" }}
                    name="Địa chỉ"
                    label="Địa chỉ"
                    rules={[{ required: true }]}>
                    <Input
                      value={dressDis}
                      style={{ width: "580px" }}
                      onChange={handleAddDress}
                      placeholder={"Nhập địa chỉ"}
                    />
                  </Form.Item>

                  <WrapperInfo>
                    <h3
                      className="text_header_container"
                      style={{ fontSize: "18px" }}>
                      Phương thức vận chuyển
                    </h3>
                    <RadioComponent
                      valueDefault={delivery}
                      listOption={orderConstant}
                      handleChange={handleChangeShipOrder}
                    />
                  </WrapperInfo>

                  <WrapperInfo>
                    <div
                      style={{
                        display: "flex",
                        flex: "1",
                        alignItems: "center",
                      }}>
                      <img
                        style={{
                          position: "absolute",
                          zIndex: "99",
                          left: "30px",
                        }}
                        src="https://theme.hstatic.net/1000290074/1001116344/14/coupon-icon.png?v=2803"
                        alt="mã giảm giá"
                      />
                      <Input
                        onChange={handleAddDiscount}
                        style={{ paddingLeft: "40px" }}
                        value={textDiscount.toUpperCase()}
                        placeholder={"Nhập mã giá giá"}
                      />

                      <button
                        onClick={handleCheckDiscount}
                        style={{
                          position: "absolute",
                          right: "21px",
                          padding: "4px 10px",
                          borderRadius: "5px",
                          background: "rgb(178 228 245)",
                        }}
                        disabled={textDiscount.length < 5}>
                        Sử dụng
                      </button>
                    </div>
                  </WrapperInfo>
                  <WrapperInfo>
                    <h3
                      className="text_header_container"
                      style={{ fontSize: "18px" }}>
                      Phương thức thanh toán
                    </h3>
                    <RadioComponent
                      valueDefault={payment}
                      listOption={Payments}
                      handleChange={handleChangePayment}
                    />
                  </WrapperInfo>

                  {payment === "paypal" ? (
                    <PayPal onSuccessPaypal={onSuccessPaypal} />
                  ) : (
                    <ButtonComponent
                      isDisabled={isDebouncing}
                      type={"submit"}
                      size={40}
                      styleButton={{
                        background: "rgb(255, 57, 69)",
                        height: "48px",
                        width: "320px",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      textButton={"Thanh toán ngay"}
                      styleTextButton={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    />
                  )}
                </Form>
              </WrapperRight>
            </WrapperOrder>
          </ContainerOrder>
        }
      />

      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        handleCancel={handleCancleUpdate}
        handleOk={handleUpdateInforUser}>
        <Loading isLoading={isLoading}>
          <FormFormik
            initialValues={{ name, phone, address, noteToAdmin: "" }}
            validationSchema={CreateDressOrderSchema}
            // onSubmit={onUpdateUser}
            fields={fieldsDressOrderSchema.fields}
          />
        </Loading>
      </ModalComponent>

      {/* <ModalComponent
        title={`Xóa tất cả sản phẩm `}
        open={isOpenModalDeleteAllProduct}
        handleCancel={() => setIsOpenModalDeleteAllProduct(false)}
        handleOk={() => ()}></ModalComponent> */}
    </div>
  );
};

export default OrderPage;
