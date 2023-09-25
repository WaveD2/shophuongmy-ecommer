import React, { useEffect } from "react";

import {
  ContainerButton,
  WrapperButton,
  WrapperContainerLeft,
  WrapperTextLight,
} from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/Slice/userSlice";
import { SignInSchema, fieldsSignIn } from "../../utils/YubSchema";
import FormFormik from "../../components/InputForm/FormFormik";
import Message from "../../components/Message/Message";
import { Watermark } from "antd";
import { WrapperBox, WrapperContainer } from "../SignUpPage/style";
import { FacebookOutlined, GooglePlusOutlined } from "@ant-design/icons";

const SignInPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => {
    return UserService.LogIn(data);
  });
  const { data, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state, { state: location?.pathname });
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      localStorage.setItem("name", JSON.stringify(data?.name));
      localStorage.setItem("avatar", JSON.stringify(data?.avatar));
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser({
            id: decoded?.id,
            accessToken: data?.access_token,
          });
        }
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error)
      return Message({
        typeMes: "error",
        mes: error?.response?.data?.message.message,
      });
  }, [isError && error]);

  const handleGetDetailsUser = async ({ id, accessToken }) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.GetDetailsUser({ id, accessToken });
    dispatch(
      updateUser({ ...res?.data, access_token: accessToken, refreshToken })
    );
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const onSubmit = (values) => {
    mutation.mutate(values);
  };
  return (
    <Watermark content={["Shop", "Hường Mỹ"]}>
      <WrapperContainer>
        <WrapperBox>
          <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>Đăng nhập vào tạo tài khoản</p>

            <FormFormik
              initialValues={fieldsSignIn.initialValuesSignIn}
              validationSchema={SignInSchema}
              onSubmit={onSubmit}
              fields={fieldsSignIn.fields}
              textButton1={"Đăng nhập"}
            />
            <ContainerButton>
              <WrapperButton size="40" type="submit">
                <GooglePlusOutlined
                  style={{ fontSize: "30px", color: "#935d5d" }}
                />
                <span>Đăng nhập Google</span>
              </WrapperButton>
              <WrapperButton size="40" type="submit">
                <FacebookOutlined
                  style={{ fontSize: "30px", color: "#2e68d5" }}
                />
                <span>Đăng nhập Facebook</span>
              </WrapperButton>
            </ContainerButton>
            <p>
              <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            </p>
            <p>
              Chưa có tài khoản?{" "}
              <WrapperTextLight onClick={handleNavigateSignUp}>
                Tạo tài khoản
              </WrapperTextLight>
            </p>
          </WrapperContainerLeft>
        </WrapperBox>
      </WrapperContainer>
    </Watermark>
  );
};

export default SignInPage;
