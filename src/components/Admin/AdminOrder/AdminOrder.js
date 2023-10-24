import { Button, Space } from "antd";
import React, { useState } from "react";
import { WrapperHeader } from "./style";
import InputComponent from "../../InputComponent/InputComponent";
import * as OrderService from "../../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PieChartComponent from "./PieChart";
import TableComponent from "../../TableComponent/TableComponent";
import { convertPrice } from "../../../utils/convert";
import { Payments, orderConstant } from "../../../utils/Constant";
import ModalComponent from "../../ModalComponent/ModalComponent";

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);

  const [openDetailOrderModal, setOpenDetailOrderModal] = useState(false);
  const [idOrder, setIdOrder] = useState();

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

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
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
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
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Tên",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Gía tiền",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Chi tiết",
      dataIndex: "age",
      render: (_, record) => (
        <button
          title="Chi tiết"
          onClick={() => {
            setOpenDetailOrderModal(true);
            setIdOrder(record);
          }}>
          Chi tiết
        </button>
      ),
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      const payment = Payments.find(
        (item) => item?.value === order?.paymentMethod
      );

      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: payment.title,
        isPaid: order?.isPaid ? "TRUE" : "FALSE",
        isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ height: 200, width: 200 }}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
        />
      </div>

      <ModalComponent
        title={`Chi tiết đơn hàng ${idOrder?.shippingAddress?.fullName}`}
        open={openDetailOrderModal}
        onOk={() => setOpenDetailOrderModal(false)}
        onCancel={() => setOpenDetailOrderModal(false)}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div>
            <p>
              Tên <span>{idOrder?.shippingAddress?.fullName}</span>
            </p>
            <p>{idOrder?.shippingAddress?.phone}</p>
            <p>
              Địa chỉ :<span>{idOrder?.shippingAddress?.district} </span>
              <span>{idOrder?.shippingAddress?.city} </span>
              <span>{idOrder?.shippingAddress?.province} </span>
            </p>
          </div>
          <div>
            <p>Sản phẩm</p>
            <div>
              {idOrder?.orderItems?.map((item) => (
                <div style={{ display: "flex", gap: "8px" }} key={item._id}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <p>{item.name}</p>
                    <img
                      src={item?.image}
                      alt="Ảnh sản phẩm"
                      className="styleImg"
                    />
                  </div>
                  <div>
                    <h3>{item?.name}</h3>
                    <div>
                      <h3>Tên sản phẩm : {item?.amount}</h3>
                      <p>
                        Số lượng : {item?.amount} - {item?.size}
                        <span> Gía tiền :</span>
                        {item?.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default AdminOrder;
