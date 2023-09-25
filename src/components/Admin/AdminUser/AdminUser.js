import React, { useEffect, useState, useRef } from "react";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { useSelector } from "react-redux";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../../TableComponent/TableComponent";
import DrawerComponent from "../../DrawerComponent/DrawerComponent";
import ModalComponent from "../../ModalComponent/ModalComponent";
import { getBase64 } from "../../../utils/getBase64";
import Message from "../../Message/Message";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as UserService from "../../../services/UserService";
import InputComponent from "../../InputComponent/InputComponent";
import Loading from "../../LoadingComponent/LoadingComponent";
import {
  InfoUserSchema,
  SignUpSchema,
  fieldsInfoUser,
} from "../../../utils/YubSchema";
import FormFormik from "../../InputForm/FormFormik";
import FormImage from "../../InputForm/FormImage";

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [avatarUser, setAvatarUser] = useState();
  const [tableUser, setTableUser] = useState();
  const [stateUserDetails, setStateUserDetails] = useState({});

  const user = useSelector((state) => state?.user);

  const searchInput = useRef(null);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.UpdateUser({
      id,
      accessToken: token,
      data: rests,
    });
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ids } = data;
    const res = UserService.DeleteManyUser({
      ids,
      accessToken: token,
    });
    return res;
  });

  const handleDeleteManyUsers = (ids) => {
    mutationDeletedMany.mutate(
      { ids, token: user?.access_token },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["users"]);
        },
      }
    );
  };

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.DeleteUser(id, token);
    return res;
  });

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.GetDetailsUser({
      id: rowSelected,
      accessToken: user.access_token,
    });
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address || "",
        city: res?.data?.city || "",
      });

      setAvatarUser(res.data?.avatar);
    }
    setIsLoading(false);
  };

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelete,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeleteMany,
    isSuccess: isSuccessDeleteMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  const queryClient = useQueryClient();
  const users = queryClient.getQueryData(["users"]);
  const isFetchingUser = useIsFetching(["users"]);

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => {
            setIsModalOpenDelete(true);
          }}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a?.name?.length - b?.name?.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        return a.email?.length - b.email?.length;
      },
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => {
        if (!a.address && !b.address) {
          a.address = "";
          b.address = "";
        }
        return a?.address?.length - b?.address?.length;
      },
      ...getColumnSearchProps("address"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a?.phone - b?.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  useEffect(() => {
    const dataTable =
      users?.data?.length > 0 &&
      users?.data?.map((user) => {
        return {
          ...user,
          key: user._id,
          isAdmin: user.isAdmin ? "TRUE" : "FALSE",
        };
      });
    setTableUser(dataTable);
  }, [users || isLoadingDeleteMany]);

  useEffect(() => {
    if (isSuccessDelete && dataDeleted?.status === "OK") {
      Message({ typeMes: "success", mes: dataDeleted.message });
      handleCancelDelete();
    } else if (isErrorDeleted) {
      Message({ typeMes: "error", mes: dataDeleted.message });
    }
  }, [isSuccessDelete]);

  useEffect(() => {
    if (isSuccessDeleteMany && dataDeletedMany?.status === "OK") {
      Message({ typeMes: "success", mes: dataDeletedMany.message });
    } else if (isErrorDeletedMany) {
      Message({ typeMes: "error", mes: dataDeletedMany.message });
    }
  }, [isSuccessDeleteMany]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({});
    setAvatarUser();
    setRowSelected();
  };

  useEffect(() => {
    if (!isOpenDrawer) handleCloseDrawer();
  }, [isOpenDrawer]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      Message({ typeMes: "success", mes: dataUpdated?.message });
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      Message({ typeMes: "error", mes: dataUpdated?.message });
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["users"]);
        },
      }
    );
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatarUser(file.preview);
  };
  const onUpdateUser = (values) => {
    setIsLoading(true);
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        avatar: avatarUser || "",
        ...values,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["users"]);
        },
      }
    );
  };
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUsers}
          columns={columns}
          isLoading={isFetchingUser || isLoadingUpdated || isLoadingDeleteMany}
          data={tableUser}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setIsLoading(true);
                fetchGetDetailsUser(record._id);
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={handleCloseDrawer}
        width="50%">
        <Loading isLoading={isLoading}>
          <FormImage
            maxCount={1}
            srcAvatar={avatarUser}
            onchangeAvatar={handleOnchangeAvatarDetails}
          />
          {Object.keys(stateUserDetails).length !== 0 && (
            <FormFormik
              initialValues={stateUserDetails}
              validationSchema={InfoUserSchema}
              onSubmit={onUpdateUser}
              fields={fieldsInfoUser.fields}
              textButton1={"Thay đổi"}
            />
          )}
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}>
        <Loading isLoading={isLoadingDeleted || isLoading}>
          <div>
            Bạn có chắc xóa tài khoản{" "}
            <span
              style={{
                fontSize: "18px",
                color: "#df3939",
                textDecoration: "uppercase",
              }}>
              {stateUserDetails.name}
            </span>{" "}
            này không?
          </div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
