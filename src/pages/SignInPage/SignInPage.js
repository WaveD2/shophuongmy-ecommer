import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
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

const config = {
  apiKey: "AIzaSyBXSIanhZwKd08kUuPbK6buvWL2_irwcRI",
  authDomain: "shop-ecommer-huongmy.firebaseapp.com",
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => true,
  },
};

const SignInPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [inForUser, setInForUser] = useState();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user?.multiFactor?.user?.email) {
          const res = await UserService.CheckGmailGG({
            email: user?.multiFactor?.user?.email,
          });
          if (res?.status !== 200) {
            const res = await UserService.CreateAccRefresh_Token(
              user?.multiFactor?.user
            );

            let infoUser = {
              name: res?.data?.data?.newUser?.name,
              email: res?.data?.data?.newUser?.email,
              _id: res?.data?.data?.newUser?._id,
              avatar: res?.data?.data?.newUser?.avatar,
              isAdmin: res?.data?.data?.newUser?.isAdmin,
              phone: " ",
              city: " ",
              access_token: res?.data?.data?.access_token,
              refreshToken: res?.data?.data?.refresh_token,
            };
            dispatch(updateUser(infoUser));
            setInForUser(infoUser);
            setIsSignedIn(!!user);
          } else {
            dispatch(
              updateUser({
                ...res?.data?.user,
                access_token: res?.data?.access_token,
                refreshToken: res?.data?.access_token,
              })
            );

            setInForUser({
              ...res?.data?.user,
              access_token: res?.data?.access_token,
              refreshToken: res?.data?.access_token,
            });
            setIsSignedIn(!!res?.data?.user);
          }
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  const mutation = useMutationHooks((data) => {
    return UserService.LogIn(data);
  });
  const { data, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess || isSignedIn) {
      const infoUser = isSuccess && !isSignedIn ? data : inForUser;

      if (location?.state) {
        navigate(location?.state, { state: location?.pathname });
      } else {
        navigate("/");
      }
      localStorage.setItem(
        "access_token",
        JSON.stringify(infoUser?.access_token || infoUser?.accessToken)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(infoUser?.refresh_token || infoUser?.refreshToken)
      );
      localStorage.setItem(
        "name",
        JSON.stringify(infoUser?.name || infoUser?.displayName)
      );
      localStorage.setItem(
        "avatar",
        JSON.stringify(infoUser?.avatar || infoUser?.photoURL)
      );

      if (infoUser?.access_token || infoUser?.accessToken) {
        const decoded = jwt_decode(
          infoUser?.access_token || infoUser?.accessToken
        );

        if (decoded?.id) {
          handleGetDetailsUser({
            id: decoded?.id,
            accessToken: infoUser?.access_token,
          });
        }
      }
    }
  }, [isSuccess, isSignedIn]);

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

            <div>
              {firebase && (
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
            </div>

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
