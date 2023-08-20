import { Badge, Button, Col, Popover } from "antd";
import React from "react";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperBoxAccount,
  ContainerBoxAccount,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/Slice/userSlice";
import Loading from "../LoadingComponent/LoadingComponent";
import ButtonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
//import { searchProduct } from "../../redux/slides/productSlide";
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [userAvatar, setUserAvatar] = useState();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.Logout();
    dispatch(resetUser());

    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    setUserAvatar(user.avatar);
  }, [user.avatar]);

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

  const onSearch = (e) => {
    // setSearch(e.target.value);
    // dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        background: "#9255FD",
        justifyContent: "center",
        padding: "4px 0",
      }}>
      <WrapperHeader
        gutter={16}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Col span={6}>
          <WrapperTextHeader to="/">SHOP</WrapperTextHeader>
        </Col>
        <Col span={12}>
          {!isHiddenSearch && (
            <ButtonInputSearch
              size="large"
              bordered={false}
              placeholder="input search text"
              textButton="Tìm kiếm"
            />
          )}
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}>
          <WrapperHeaderAccout>
            {userAvatar ? (
              <img
                src={userAvatar}
                alt="avatar"
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserOutlined style={{ fontSize: "30px" }} />
            )}
            {user?.access_token ? (
              <Popover content={content} trigger="click" open={isOpenPopup}>
                <div
                  style={{
                    cursor: "pointer",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "40px",
                  }}
                  onClick={() => setIsOpenPopup((prev) => !prev)}>
                  <h3>{user?.name || user?.email || "Not Name"}</h3>
                  <p>Cài đặt</p>
                </div>
              </Popover>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                </div>
              </div>
            )}
          </WrapperHeaderAccout>

          {!isHiddenCart && (
            <div style={{ cursor: "pointer" }}>
              <Badge size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;
