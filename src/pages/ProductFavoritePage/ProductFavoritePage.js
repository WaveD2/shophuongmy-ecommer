import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContainerProducts, WrapperProducts } from "../HomePage/style";
import CardComponent from "../../components/CardComponent/CardComponent";
import { TextProductFavorite, TitleProductFavorite } from "./style";

const ProductFavoritePage = () => {
  const ProductFavorite = useSelector((state) => state.order);

  return (
    <div className="containerBoxPage">
      <TitleProductFavorite>Sản phẩm yêu thích</TitleProductFavorite>
      {ProductFavorite?.orderItemsHeart?.length > 0 ? (
        <ContainerProducts>
          <WrapperProducts>
            {ProductFavorite?.orderItemsHeart?.map((product, index) => {
              return (
                <CardComponent
                  key={index}
                  countInStock={product.countInStock}
                  description={product.description}
                  images={product.image}
                  name={product.name}
                  price={product.price}
                  type={product.type}
                  discount={product.discount}
                  id={product.id}
                  isIconDelete={true}
                />
              );
            })}
          </WrapperProducts>
        </ContainerProducts>
      ) : (
        <TextProductFavorite>
          Chưa có sản phẩm yêu thích! Nhấp vào đây Hãy lựa chọn những sản phẩm
          ưa thích của mình nào.
        </TextProductFavorite>
      )}
    </div>
  );
};

export default ProductFavoritePage;
