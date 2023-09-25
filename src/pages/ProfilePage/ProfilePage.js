import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WrapperHeader, WrapperForm } from "./style";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import Message from "../../components/Message/Message";
import { resetUser, updateUser } from "../../redux/Slice/userSlice";
import { getBase64 } from "../../utils/getBase64";
import { useMutationHooks } from "../../hooks/useMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useNavigate } from "react-router-dom";
import FormFormik from "../../components/InputForm/FormFormik";
import { InfoUserSchema, fieldsInfoUser } from "../../utils/YubSchema";
import FormImage from "../../components/InputForm/FormImage";

const ProfilePage = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  console.log("user", user);
  const [avatar, setAvatar] = useState(() => user?.avatar || "");
  const [openModal, setOpenModal] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);

  const mutation = useMutationHooks(async (data) => {
    console.log("data", data);

    const { id, access_token, ...rests } = data;

    await UserService.UpdateUser({
      id,
      accessToken: access_token,
      data: rests,
    });
  });
  const { variables, isLoading, isSuccess, isError, error } = mutation;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      Message({ typeMes: "success", mes: "Cập nhật thành công" });
      dispatch(updateUser(variables));
    } else if (isError) {
      Message({
        typeMes: "error",
        mes: "Cập nhật thất bại",
      });
    }
  }, [isSuccess, isError]);

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleDeleteUser = async () => {
    setOpenModal(false);
    const res = await UserService.DeleteUser(user.id, user.access_token);
    if (res.status === "OK") {
      Message({ typeMes: "success" });
      await UserService.Logout();
      dispatch(resetUser());
      navigate("/");
    } else {
      Message({
        typeMes: "error",
        mes: res?.message,
      });
    }
  };

  const onSubmit = (values) => {
    mutation.mutate({
      id: user?.id,
      access_token: user?.access_token,
      ...values,
      avatar,
    });
  };

  return (
    <div className="containerBoxPage">
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperForm>
        <FormImage
          onchangeAvatar={handleOnchangeAvatar}
          srcAvatar={avatar}
          maxCount={1}
        />
        <FormFormik
          initialValues={{
            name: user?.name,
            phone: user?.phone,
            address: user?.address,
            email: user?.email,
            city: user?.city,
          }}
          validationSchema={InfoUserSchema}
          onSubmit={onSubmit}
          fields={fieldsInfoUser.fields}
          textButton1={"Cập nhật"}
          isButton2={true}
          textButton2={"Xóa tài khoản"}
          handleDelete={() => setOpenModal(true)}
        />
      </WrapperForm>
      {
        <ModalComponent
          isOpen={openModal}
          handleCancel={() => {
            setOpenModal(false);
          }}
          handleOk={handleDeleteUser}
          titleModal={"Xóa tài khoản"}>
          <p> {`Bạn đồng ý xóa tài khoản ${user.name} `}</p>
        </ModalComponent>
      }
    </div>
  );
};

export default ProfilePage;
