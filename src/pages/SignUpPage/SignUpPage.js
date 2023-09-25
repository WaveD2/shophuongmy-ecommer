import React from "react";
import {
  WrapperBox,
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { Image, Watermark } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Message from "../../components/Message/Message";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { SignUpSchema, fieldsSignUp } from "../../utils/YubSchema";
import FormFormik from "../../components/InputForm/FormFormik";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const mutation = useMutationHooks((data) => UserService.Register(data));

  const { data, isLoading, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      Message({ typeMes: "success", mes: "Tạo tài khoản thành công" });
      handleNavigateSignIn();
    } else if (isError) {
      Message({
        typeMes: "error",
        mes: error?.response?.data?.message,
      });
    }
  }, [isSuccess, isError]);

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
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
            <p>Đăng ký tài khoản</p>

            <FormFormik
              initialValues={fieldsSignUp.initialValuesSignUp}
              validationSchema={SignUpSchema}
              onSubmit={onSubmit}
              fields={fieldsSignUp.fields}
              textButton1={"Đăng ký"}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Bạn đã có tài khoản?{" "}
                <WrapperTextLight onClick={handleNavigateSignIn}>
                  Đăng nhập
                </WrapperTextLight>
              </p>
              <WrapperTextLight onClick={() => navigate("/")}>
                Quay lại trang chủ
              </WrapperTextLight>
            </div>
          </WrapperContainerLeft>
        </WrapperBox>
      </WrapperContainer>
    </Watermark>
  );
};

export default SignUpPage;
