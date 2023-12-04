import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Button, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { WrapperHeader } from "./style";
import InputComponent from "../../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../../utils/getBase64";
import * as ProductService from "../../../services/ProductService";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import Message from "../../../components/Message/Message";
import DrawerComponent from "../../DrawerComponent/DrawerComponent";
import ModalComponent from "../../ModalComponent/ModalComponent";
import TableComponent from "../../TableComponent/TableComponent";
import Loading from "../../LoadingComponent/LoadingComponent";
import { ProductSchema, fieldsCreateProduct } from "../../../utils/YubSchema";
import FormFormik from "../../InputForm/FormFormik";
import FormImage from "../../InputForm/FormImage";
import { convertTypeProduct } from "../../../utils/convert";
import {
  optionsColorsProduct,
  optionsSizeProduct,
} from "../../../utils/Constant";
import TagsComponent from "../../SelectedComponent/TagsComponent";

const AdminProduct = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isStatusUpdateProduct, setIsStatusUpdateProduct] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [listProduct, setListProduct] = useState();
  const [isLoadingLtProduct, setIsLoadingListProduct] = useState(false);

  const [fileImagesList, setFileImagesList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [srcPreviewImage, setSrcPreviewImage] = useState("");
  const [rowSelected, setRowSelected] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [sizesProduct, setSizesProduct] = useState([]);
  const [nameSizesProduct, setNameSizesProduct] = useState("");

  const user = useSelector((state) => state?.user);

  const searchInput = useRef(null);

  const [stateProductDetails, setStateProductDetails] = useState({});
  console.log("stateProductDetails", stateProductDetails);
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: [],
      countInStock: "",
    });
  };

  const getAllProducts = async () => {
    setIsLoadingListProduct(true);
    const res = await ProductService.getAllProduct({
      token: user?.access_token,
    });
    setIsLoadingListProduct(false);
    setListProduct(res?.data);
  };

  const dataTable =
    listProduct?.length > 0 &&
    listProduct?.map((product) => {
      return { ...product, key: product._id };
    });

  const mutation = useMutationHooks((data) => {
    const { token, type, ...values } = data;
    const typeProduct = convertTypeProduct(type);
    const res = ProductService.createProduct({
      token: token,
      data: {
        type: typeProduct,
        ...values,
      },
    });
    return res;
  });

  const mutationUpdate = useMutationHooks(async (data) => {
    const res = await ProductService.updateProduct(data);
    await getAllProducts();

    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct({ id, token });
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ids } = data;
    const res = ProductService.deleteManyProduct({ ids, token });
    return res;
  });

  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token });
  };

  //GET ALL TYPE PRODUCT
  // useEffect(() => {
  //   const res = ProductService.getAllTypeProduct();
  //   if (res?.status === "OK") setListTypeProduct(res?.data);
  // }, []);

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct({
      id: rowSelected,
      token: user?.access_token,
    });
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
        color: res?.data?.color,
        size: res?.data?.size,
        _id: res?.data?._id,
      });

      setFileImagesList(res?.data?.images);
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const { data, error, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  // get all product
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoading || isLoadingUpdated || isLoadingDeleted || isLoadingDeletedMany,
  ]);

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Gía tiền",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },

    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      handleCancelCreateProduct();
      Message({ typeMes: "success", mes: data.message });
    } else if (isError) {
      Message({
        typeMes: "error",
        mes: error?.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (dataDeletedMany?.status === "OK") {
      Message({ typeMes: "success", mes: "Xóa thành công" });
    } else if (isErrorDeletedMany) {
      Message({ typeMes: "error", mes: "Có lỗi xảy ra" });
    }
  }, [isSuccessDeletedMany]);

  useEffect(() => {
    if (dataDeleted?.status === "OK") {
      Message({ typeMes: "success", mes: "Xóa thành công" });

      handleCancelDelete();
    } else if (isErrorDeleted) {
      Message({ typeMes: "error", mes: "Có lỗi xảy ra" });
    }
  }, [isSuccessDelected]);

  useEffect(() => {
    if (dataUpdated?.status === "OK") {
      Message({ typeMes: "success", mes: "Cập nhật thành công" });
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      Message({ typeMes: "error", mes: "Có lỗi xảy ra" });
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token });
    setRowSelected();
  };

  const handleCancel = () => {
    setStateProductDetails({});
    setFileImagesList([]);
    setRowSelected();
  };

  const handleCancelCreateProduct = () => {
    setFileImagesList([]);
    setIsModalOpen(false);
  };

  const handleOnchangeImgFile = ({ fileList }) => {
    setFileImagesList(fileList);
  };

  useEffect(() => {
    if (isStatusUpdateProduct === 1) {
      mutationUpdate.mutate({
        id: rowSelected,
        token: user?.access_token,
        images: fileImagesList,
        ...stateProductDetails,
      });
      setStateProductDetails({});
      setIsStatusUpdateProduct(0);
    }
  }, [isStatusUpdateProduct]);

  const onUpdateProduct = (values) => {
    setStateProductDetails(values);
    setIsStatusUpdateProduct(1);
  };
  const onCreateProduct = (values) => {
    mutation.mutate({
      token: user.access_token,
      images: fileImagesList,
      ...values,
    });
  };

  const handleAddSizeProduct = (e) => {
    e.preventDefault();
    setSizesProduct([...sizesProduct, nameSizesProduct]);
    setNameSizesProduct("");
  };
  const handleOnChangeNameSizeProduct = (event) => {
    setNameSizesProduct(event.target.value);
  };

  // Preview Images
  const handleCancelPreview = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setSrcPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}>
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyProducts}
          columns={columns}
          isLoading={isLoadingLtProduct}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                fetchGetDetailsProduct(record._id);
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancelCreateProduct}
        footer={null}>
        <Loading isLoading={isLoading}>
          {
            <FormImage
              maxCount={6}
              fileList={fileImagesList}
              onchangeAvatar={handleOnchangeImgFile}
              listType="picture-card"
              handlePreview={handlePreview}
              handleCancelPreview={handleCancelPreview}
              previewOpen={previewOpen}
              previewTitle={previewTitle}
              srcPreviewImage={srcPreviewImage}
            />
          }

          <FormFormik
            initialValues={fieldsCreateProduct.initialCreateProduct}
            validationSchema={ProductSchema}
            onSubmit={onCreateProduct}
            fields={fieldsCreateProduct.fields}
            textButton1={"Tạo sản phẩm"}
          />
        </Loading>
      </ModalComponent>

      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => {
          handleCancel();
          setIsOpenDrawer(false);
        }}
        width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          {
            <FormImage
              maxCount={6}
              fileList={fileImagesList}
              onchangeAvatar={handleOnchangeImgFile}
              listType="picture-card"
              handlePreview={handlePreview}
              handleCancelPreview={handleCancelPreview}
              previewOpen={previewOpen}
              previewTitle={previewTitle}
              srcPreviewImage={srcPreviewImage}
            />
          }

          {Object.keys(stateProductDetails).length !== 0 && (
            <div>
              <FormFormik
                initialValues={stateProductDetails}
                validationSchema={ProductSchema}
                onSubmit={onUpdateProduct}
                fields={fieldsCreateProduct.fields}
                textButton1={"Thay đổi"}
              />
            </div>
          )}
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
