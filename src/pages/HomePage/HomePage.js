import React, { useState, useEffect } from "react";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Rate } from "antd";
import { MenuHeader } from "../../utils/Constant";

const HomePage = () => {
  const [limit, setLimit] = useState(6);
  const typeProducts = ["Trang chủ"];
  const products = [
    {
      _id: 1,
      countInStock: "312",
      description:
        "Thời buổi quá tải thông tin và người tiêu dùng ngày càng có xu hướng né tránh quảng cáo đây là lúc chúng ta cần phát huy vai trò của content marketing",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Hoa",
      price: "312",
      rating: "4",
      selled: "123",
      discount: "12",
      type: "",
    },
    {
      _id: 2,
      countInStock: "1234",
      description:
        "Các Marketer đã và đang đau đầu về việc làm thế nào để quảng cáo trở nên hiệu quả, tăng tương tác, tăng tỉ lệ chuyển đổi và tạo ra đơn hàng đều đặn cho công ty",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Huy",
      price: "4535",
      rating: "431",
      selled: "312",
      discount: "51",
      type: "",
    },
    {
      _id: 3,
      countInStock: "12",
      description:
        "Thời buổi quá tải thông tin và người tiêu dùng ngày càng có xu hướng né tránh quảng cáo đây là lúc chúng ta cần phát huy vai trò của content marketing",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Long",
      price: "312",
      rating: "4",
      selled: "123",
      discount: "12",
      type: "",
    },
    {
      _id: 4,
      countInStock: "312",
      description:
        "Thời buổi quá tải thông tin và người tiêu dùng ngày càng có xu hướng né tránh quảng cáo đây là lúc chúng ta cần phát huy vai trò của content marketing",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Trang",
      price: "1232",
      rating: "4",
      selled: "123",
      type: "",
      discount: "12",
    },
    {
      _id: 1,
      countInStock: "312",
      description:
        "Thời buổi quá tải thông tin và người tiêu dùng ngày càng có xu hướng né tránh quảng cáo đây là lúc chúng ta cần phát huy vai trò của content marketing",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Hoa",
      price: "312",
      rating: "4",
      selled: "123",
      discount: "12",
      type: "",
    },
    {
      _id: 2,
      countInStock: "1234",
      description:
        "Các Marketer đã và đang đau đầu về việc làm thế nào để quảng cáo trở nên hiệu quả, tăng tương tác, tăng tỉ lệ chuyển đổi và tạo ra đơn hàng đều đặn cho công ty",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Huy",
      price: "4535",
      rating: "431",
      selled: "312",
      discount: "51",
      type: "",
    },
    {
      _id: 3,
      countInStock: "12",
      description:
        "Thời buổi quá tải thông tin và người tiêu dùng ngày càng có xu hướng né tránh quảng cáo đây là lúc chúng ta cần phát huy vai trò của content marketing",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Long",
      price: "312",
      rating: "4",
      selled: "123",
      discount: "12",
      type: "",
    },
    {
      _id: 4,
      countInStock: "312",
      description:
        "Thời buổi quá tải thông tin và người tiêu dùng ngày càng có xu hướng né tránh quảng cáo đây là lúc chúng ta cần phát huy vai trò của content marketing",
      image:
        "https://i.pinimg.com/236x/ca/f3/64/caf36488e33ddc28aeb8c2b42c8901f9.jpg",
      name: "Trang",
      price: "1232",
      rating: "4",
      selled: "123",
      type: "",
      discount: "12",
    },
  ];

  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperTypeProduct>
        {MenuHeader.map((item, index) => {
          return <TypeProduct item={item} key={index} />;
        })}
      </WrapperTypeProduct>

      <div className="body" style={{ width: "100%", backgroundColor: "#ccc" }}>
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />

          <WrapperProducts>
            {products?.map((product, index) => {
              return (
                <CardComponent
                  key={index}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>

          <NavbarComponent />

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}>
            <WrapperButtonMore
              textbutton={"Load more"}
              type="outline"
              styleButton={{
                border: `1px solid ${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#9255FD"
                }`,
                color: `${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#9255FD"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextButton={{
                fontWeight: 500,
                color: products?.total === products?.data?.length && "#fff",
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
