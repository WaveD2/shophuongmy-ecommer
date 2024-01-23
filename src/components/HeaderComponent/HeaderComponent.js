import { AutoComplete, Avatar, Badge, Col, Popover, Spin } from "antd";
import React from "react";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  ContainerHeader,
  BoxTippy,
  WrapperTippy,
  SettingUser,
  WrapperMenuRight,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";
import { resetUser } from "../../redux/Slice/userSlice";
import Loading from "../LoadingComponent/LoadingComponent";
import TooltipComponent from "../TooltipComponent/TooltipComponent";
import avatarDefault from "../../assets/images/avatar_default.png";
import logoHuongMy from "../../assets/images/sunLogo.png";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import SearchComponent from "../SearchComponent/SearchComponent";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [userAvatar, setUserAvatar] = useState(avatarDefault);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.Logout();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    setLoading(false);
    navigate("/");
    firebase.auth().signOut();
  };

  useEffect(() => {
    if (user.avatar) setUserAvatar(user.avatar);
    else setUserAvatar(avatarDefault);
  }, [user.avatar]);

  const handleOpenChange = (newOpen) => {
    setIsOpenPopup(newOpen);
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    setIsLoading(true);

    if (value) {
      const data = await ProductService.getAllProduct({
        search: value,
        limit: 10,
        page: 0,
      });
      console.log("Da ta ", data);
      if (data?.data?.length > 0) {
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    } else {
      setSearchResult([]);
    }
    setIsLoading(false);
  };

  return (
    <Loading isLoading={loading}>
      <ContainerHeader>
        <WrapperHeader
          gutter={16}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Col style={{ textAlign: "center" }}>
            <WrapperTextHeader to="/">
              <img src={logoHuongMy} alt="shop hường mỹ" className="styleImg" />
            </WrapperTextHeader>
          </Col>
          <Col span={10}>
            {!isHiddenSearch && (
              <div style={{ position: "relative" }}>
                <SearchComponent
                  dataOptions={searchResult?.data}
                  style={{ width: "100%" }}
                  placeholder="Tìm kiếm sản phẩm"
                  handlerSearch={handleSearch}
                  handlerSelect={(idProduct) => {
                    navigate(`/product-details/${idProduct}`);
                    setSearchResult([]);
                    setSearchTerm("");
                  }}
                  valueSearch={searchTerm}
                  autoClearSearchValue={true}
                />
              </div>
            )}
          </Col>

          <WrapperMenuRight span={6}>
            <WrapperHeaderAccout>
              {user?.access_token && userAvatar ? (
                <Popover
                  content={content}
                  onOpenChange={handleOpenChange}
                  trigger="click"
                  open={isOpenPopup}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}>
                    <Avatar
                      src={userAvatar}
                      style={{
                        height: "40px",
                        width: "40px",
                        objectFit: "cover",
                      }}
                    />
                    <SettingUser>
                      <h3>{user?.name || user?.email || "Not Name"}</h3>
                      <p>Cài đặt</p>
                    </SettingUser>
                  </div>
                </Popover>
              ) : (
                <TooltipComponent
                  children={
                    <Avatar
                      icon={<UserOutlined />}
                      className="styleIconHeader"
                    />
                  }
                  title={"Đăng nhập/Đăng kí"}
                  handlerClick={handleNavigateLogin}
                />
              )}
            </WrapperHeaderAccout>

            <TooltipComponent
              handlerClick={() => {
                navigate("/products-favorite", { state: location?.pathname });
              }}
              title={"Sản phẩm yêu thích"}
              children={
                <Badge count={order?.orderItemsHeart?.length}>
                  <HeartOutlined className="styleIconHeader" />
                </Badge>
              }
            />

            {!isHiddenCart && (
              <TooltipComponent
                title={"Giỏ hàng"}
                children={
                  <Badge count={order?.orderItems?.length}>
                    <ShoppingCartOutlined
                      onClick={() => navigate("/order")}
                      className="styleIconHeader"
                    />
                  </Badge>
                }
              />
            )}
          </WrapperMenuRight>
        </WrapperHeader>
      </ContainerHeader>
    </Loading>
  );
};
export default HeaderComponent;
