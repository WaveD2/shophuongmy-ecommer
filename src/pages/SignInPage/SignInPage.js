import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormField from "../../components/InputForm/FormField";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/Slice/userSlice";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { SignInSchema, fieldsSignIn } from "../../utils/YubSchema";
import FormFormik from "../../components/InputForm/FormFormik";

const SignInPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("fieldsSignIn", fieldsSignIn.fields);
  const mutation = useMutationHooks((data) => {
    return UserService.LogIn(data);
  });
  const { data, isLoading, isSuccess, isError, error } = mutation;
  console.log(mutation);
  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) return message.error("Đăng nhập không thành công");
  }, [isError && error]);

  const handleGetDetailsUser = async (id, accessToken) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.GetDetailsUser(id, accessToken);
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
        overflowY: "scroll",
      }}>
      <div
        style={{
          width: "800px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}>
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

          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              {" "}
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="iamge-logo"
            height="203px"
            width="203px"
          />
          <h4>Mua sắm tại LTTD</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
