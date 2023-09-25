import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Col,
  Input,
  Modal,
  Popover,
  Spin,
} from "antd";
import React from "react";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperBoxAccount,
  ContainerBoxAccount,
  ContainerHeader,
  BoxTippy,
  WrapperTippy,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
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
import ButtonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
import { isJsonString } from "../../utils/convert";
import jwt_decode from "jwt-decode";
import { useHistoryListener } from "../../utils/useHistory";
import TooltipComponent from "../TooltipComponent/TooltipComponent";
import { searchProduct } from "../../redux/Slice/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [search, setSearch] = useState("");
  const [userAvatar, setUserAvatar] = useState();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTippy, setIsTippy] = useState(false);

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
  };

  useEffect(() => {
    setUserAvatar(user.avatar);
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

  const onSearch = (value) => {
    //e.target.value
    if (value) {
      setSearchTerm(value);
    } else {
      setSearchResult([]);
    }
  };

  useEffect(() => {
    let timer;
    const fetchData = async () => {
      setIsLoading(true);

      if (searchTerm) {
        const data = await ProductService.getAllProduct({
          search: searchTerm,
          limit: 10,
          page: 0,
        });
        if (data?.data?.length > 0) {
          setSearchResult(data);
          setIsTippy(true);
        }
        setIsLoading(false);
      }
    };
    if (searchTerm) {
      timer = setTimeout(() => {
        fetchData();
      }, 1200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  console.log("searchResult", searchResult);
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
            <WrapperTextHeader to="/">SHOP HƯỜNG MỸ</WrapperTextHeader>
          </Col>
          <Col span={12}>
            {!isHiddenSearch && (
              <div style={{ position: "relative" }}>
                {/* <ButtonInputSearch
                size="large"
                bordered={false}
                textButton="Tìm kiếm"
                placeholder="Tìm kiếm sản phầm"
                onChange={onSearch}
              /> */}
                {/* {isTippy && (
                  <WrapperTippy>
                      <h3>Tất cả : {searchResult?.total}</h3>
                      {searchResult?.data?.map((item) => {
                        return (
                          <BoxTippy
                            onClick={() =>
                              navigate(`/product-details/${item?._id}`)
                            }>
                            <img
                              src={item?.images[0]?.thumbUrl}
                              alt="ảnh sản phẩm"
                              style={{ width: "50px", height: "50px" }}
                            />
                            <span>{item?.name}</span>
                          </BoxTippy>
                        );
                      })}
                  </WrapperTippy>
                )} */}
                {
                  <div style={{ position: "relative" }}>
                    <AutoComplete
                      style={{ width: 300 }}
                      placeholder="Search"
                      onSearch={onSearch}
                    />
                    {isLoading ? <Spin /> : null}
                    {searchResult?.data?.length > 0 && (
                      <WrapperTippy>
                        {searchResult?.data?.map((result, index) => (
                          <BoxTippy
                            key={index}
                            onClick={() => {
                              navigate(`/product-details/${result?._id}`);
                              setSearchResult([]);
                            }}>
                            <img
                              src={result?.images[0]?.thumbUrl}
                              alt="ảnh sản phẩm"
                              style={{ width: "50px", height: "50px" }}
                            />
                            <span>{result?.name}</span>
                          </BoxTippy>
                        ))}
                      </WrapperTippy>
                    )}
                  </div>
                }
              </div>
            )}
          </Col>
          <Col
            span={6}
            style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <WrapperHeaderAccout>
              {user?.access_token && userAvatar ? (
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
                  <Popover
                    content={content}
                    onOpenChange={handleOpenChange}
                    trigger="click"
                    open={isOpenPopup}>
                    <div
                      style={{
                        cursor: "pointer",
                        maxWidth: 100,
                        textOverflow: "ellipsis",
                        height: "40px",
                      }}>
                      <h3>{user?.name || user?.email || "Not Name"}</h3>
                      <p>Cài đặt</p>
                    </div>
                  </Popover>
                </div>
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
          </Col>
        </WrapperHeader>
      </ContainerHeader>
    </Loading>
  );
};
export default HeaderComponent;
