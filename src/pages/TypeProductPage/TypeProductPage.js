import React, { useState } from "react";
import TabsComponent from "../../components/TabsComponent/TabsComponent";
import { Tag } from "antd";
import { optionsColorsProduct, optionsSizeProduct } from "../../utils/Constant";

const TypeProductPage = () => {
  const [listSize, setListSize] = useState([]);
  const [listColor, setListColor] = useState([]);
  const handleChange = (value) => {
    console.log(value[0]);
    optionsColorsProduct.some((item) => item.value === value[0])
      ? setListColor(value)
      : setListSize(value);
  };
  console.log(listSize);
  console.log(listColor);

  return (
    <div className="containerBoxPage">
      <TabsComponent
        options={optionsColorsProduct}
        handleChange={handleChange}
      />
      <TabsComponent options={optionsSizeProduct} handleChange={handleChange} />
    </div>
  );
};

export default TypeProductPage;
