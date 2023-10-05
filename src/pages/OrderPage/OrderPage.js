/* eslint-disable jsx-a11y/alt-text */
import { Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
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
  WrapperStyleHeaderDilivery,
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
  removeOrderProduct,
  resetOrder,
  selectedOrder,
} from "../../redux/Slice/orderSlide";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
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
import StepPaymentComponent from "../../components/StepComponent/StepPaymentComponent";
import { Payments, orderConstant } from "../../utils/Constant";
import Message from "../../components/Message/Message";
import axios from "axios";
import SelectOption from "../../components/InputForm/SelectOption";
import { TextProductFavorite } from "../ProductFavoritePage/style";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../services/PaymentService";
import RadioComponent from "../../components/InputForm/RadioCheckBox";

const OrderPage = () => {
  const itemsDelivery = [
    {
      title: "20.000 VND",
      description: "Dưới 200.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 200.000 VND đến dưới 500.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 500.000 VND",
    },
  ];

  const order = useSelector((state) => state.order);
  console.log("order", order);
  const user = useSelector((state) => state.user);
  const { name, phone, address } = user;
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] =
    useState(false);
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
  const [phoneNew, setPhoneNew] = useState(user?.phone);

  const [provinceOrder, setProvinceOrder] = useState({});
  const [cityOrder, setCityOrder] = useState({});
  const [districtOrder, setDistrictOrder] = useState({});
  const [dressDis, setDressDis] = useState("");

  const [payment, setPayment] = useState("later_money");
  const [sdkReady, setSdkReady] = useState(false);
  const [delivery, setDelivery] = useState("fast");

  const [isCheckValidate, setIsCheckValidate] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

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
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) => {
          if (response?.data.districts?.length > 0) {
            setCities([
              { code: 0, name: "Chọn quận/huyện" },
              ...response?.data.districts,
            ]);
          } else {
            setCities([{ code: 0, name: "Chọn quận/huyện" }]);
          }
        });
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
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedCity}?depth=2`)
        .then((response) => {
          if (response?.data.wards?.length > 0) {
            setDistricts([
              { code: 0, name: "Chọn xã/phường" },
              ...response?.data.wards,
            ]);
          } else {
            setDistricts([{ code: 0, name: "Chọn xã/phường" }]);
          }
        });
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    const provinceUser = provinces?.find((item) => item.code === +value);
    setProvinceOrder(provinceUser || {});
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    const cityUser = cities?.find((item) => item.code === +value);
    setCityOrder(cityUser || {});
  };

  const handleDistrictChange = (value) => {
    setDistrictOrder(value);
    console.log("value", value);
    const districtUser = districts?.find((item) => item.code === +value);
    setDistrictOrder(districtUser || {});
  };

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
    console.log("listChecked", listChecked);
    if (listChecked?.length >= 1) {
      setIsOpenModalDeleteAllProduct(false);
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct(idProduct));
  };
  const handleSetPhone = (e) => {
    if (e.target.value) setPhoneNew(Number(e.target.value));
  };
  const handleAddDress = (e) => {
    if (e.target.value) setDressDis(e.target.value);
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.id);
      });

      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

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

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

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

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      order?.orderItems?.forEach((element) => {
        arrayOrdered.push(element.id);
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      Message({
        typeMes: "success",
        mes: "Đặt hàng thành công",
      });
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItems,
          totalPriceMemo: order?.totalPrice,
        },
      });
    } else if (isError) {
      Message({
        typeMes: "error",
        mes: "Đặt hàng không thành công",
      });
    }
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
    console.log("stateUserDetails", stateUserDetails);
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

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  //Payment
  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItems,
      fullName: user?.name,
      province: provinceOrder?.name,
      district: districtOrder?.name,
      address: dressDis,
      phone: user?.phone,
      city: cityOrder?.name,
      paymentMethod: payment,
      shippingPrice: 20000,
      totalPrice: order?.totalPrice,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
      size: order?.size,
      colors: order?.color,
    });
  };

  const handleChangePayment = (e) => {
    setPayment(e.target.value.toString());
  };
  const handleChangeShipOrder = (e) => {
    setDelivery(e.target.value.toString());
  };

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfigPayment();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);

  useEffect(() => {
    if (isCheckValidate) {
      if (!order?.orderItems?.length > 0) {
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
          orderItems: order?.orderItems,
          fullName: user?.name,
          province: provinceOrder?.name,
          district: districtOrder?.name,
          address: dressDis,
          phone: user?.phone,
          city: cityOrder?.name,
          paymentMethod: payment,
          size: order?.size,
          colors: order?.color,
          shippingPrice: 20000,
          totalPrice: order?.totalPrice,
          user: user?.id,
          isPaid: false,
          paidAt: currentTime.getDate(),
          email: user?.email,
        });
      }
    }
    setIsCheckValidate(false);
  }, [isCheckValidate]);

  // useEffect(() => {
  //   if (!window.paypal) {
  //     addPaypalScript();
  //   } else {
  //     setSdkReady(true);
  //   }
  // }, []);

  return (
    <div className="containerBoxPage">
      <ContainerOrder>
        <h3 style={{ fontWeight: "bold" }}>Giỏ hàng</h3>
        <WrapperOrder>
          <WrapperLeft span={12}>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "280px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={
                    listChecked?.length === order?.orderItems?.length
                  }></CustomCheckbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
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
              {order?.orderItems.length > 0 ? (
                order?.orderItems?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.id}>
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
                        <img
                          src={order?.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
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
                          onClick={() => handleDeleteOrder(order?.id)}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <span>Phí giao hàng</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}>
                  {convertPrice(20000)}
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
                  {convertPrice(order?.totalPrice + 20000)}
                </span>
                <span style={{ color: "#000", fontSize: "11px" }}>
                  (Đã bao gồm VAT nếu có)
                </span>
              </span>
            </WrapperTotal>
          </WrapperLeft>
          <WrapperRight span={12}>
            <h4>Địa chỉ giao hàng</h4>
            <Form
              onFinish={handlePayment}
              layout="vertical"
              style={{ display: "flex", flexWrap: "wrap" }}>
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
                name="Số điện thoại"
                label="Số điện thoại"
                rules={[{ required: true }]}>
                <Input
                  value={phoneNew}
                  style={{ width: "270px" }}
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
                  style={{ width: "540px" }}
                  onChange={handleAddDress}
                  placeholder={"Nhập địa chỉ"}
                />
              </Form.Item>

              <WrapperInfo>
                <LabelTitle>Phương thức vận chuyển </LabelTitle>
                <RadioComponent
                  valueDefault={delivery}
                  listOption={orderConstant}
                  handleChange={handleChangeShipOrder}
                />
              </WrapperInfo>
              <WrapperInfo>
                <LabelTitle>Phương thức thanh toán </LabelTitle>
                <RadioComponent
                  valueDefault={payment}
                  listOption={Payments}
                  handleChange={handleChangePayment}
                />
              </WrapperInfo>
              {payment === "paypal" && sdkReady ? (
                <div style={{ width: "320px" }}>
                  <PayPalButton
                    amount="0.01"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      Message({
                        typeMes: "error",
                        mes: "Có lỗi xảy ra, Vui lòng thử lại",
                      });
                    }}
                  />
                </div>
              ) : (
                <ButtonComponent
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
