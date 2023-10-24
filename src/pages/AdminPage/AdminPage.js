import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { getItem } from "../../utils/getBase64";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/Admin/AdminUser/AdminUser";
import AdminProduct from "../../components/Admin/AdminProduct/AdminProduct";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import Content from "./Components/Content";
import { useSelector } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import AdminOrder from "../../components/Admin/AdminOrder/AdminOrder";
import { ContainerAdminPage, WrapperMenuLeft } from "./style";

const AdminPage = () => {
  const user = useSelector((state) => state?.user);

  const items = [
    getItem("Người dùng", "users", <UserOutlined />),
    getItem("Sản phẩm", "products", <AppstoreOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return { data: res?.data, key: "orders" };
  };

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct({
      token: user?.access_token,
    });
    return { data: res?.data, key: "products" };
  };

  const getAllUsers = async () => {
    const res = await UserService.GetAllUser(user?.access_token);
    return { data: res?.data, key: "users" };
  };

  const queries = useQueries({
    queries: [
      { queryKey: ["products"], queryFn: getAllProducts, staleTime: 1000 * 60 },
      { queryKey: ["users"], queryFn: getAllUsers, staleTime: 1000 * 60 },
      { queryKey: ["orders"], queryFn: getAllOrder, staleTime: 1000 * 60 },
    ],
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const memoCount = useMemo(() => {
    const result = {};
    try {
      if (queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length;
        });
      }
      return result;
    } catch (error) {
      return result;
    }
  }, [queries]);
  const COLORS = {
    users: ["#e66465", "#9198e5"],
    products: ["#a8c0ff", "#3f2b96"],
    orders: ["#11998e", "#38ef7d"],
  };

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUser />;
      case "products":
        return <AdminProduct />;
      case "orders":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <ContainerAdminPage>
        {items?.length === 3 && (
          <WrapperMenuLeft>
            <Menu mode="inline" items={items} onClick={handleOnCLick} />
          </WrapperMenuLeft>
        )}
        <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
          <Loading isLoading={!memoCount && !Object.keys(memoCount)}>
            {!keySelected && (
              <Content
                data={memoCount}
                colors={COLORS}
                setKeySelected={setKeySelected}
              />
            )}
          </Loading>
          {renderPage(keySelected)}
        </div>
      </ContainerAdminPage>
    </>
  );
};

export default AdminPage;
