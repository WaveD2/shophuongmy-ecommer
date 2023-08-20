import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import FormField from "../../components/InputForm/FormField";
import { SignUpSchema, fieldsSignUp } from "../../utils/YubSchema";
import FormFormik from "../../components/InputForm/FormFormik";
const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const mutation = useMutationHooks((data) => UserService.Register(data));

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
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
        overflow: "hidden",
      }}>
      <div
        style={{
          maxWidth: "800px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng ký tài khoản</p>

          <FormFormik
            initialValues={fieldsSignUp.initialValuesSignUp}
            validationSchema={SignUpSchema}
            onSubmit={onSubmit}
            fields={fieldsSignUp.fields}
            textButton1={"Đăng ký"}
          />
          <p>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
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

export default SignUpPage;
