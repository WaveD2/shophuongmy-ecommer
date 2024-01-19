import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
const SearchComponent = ({
  style = {},
  placeholder = "",
  handlerSearch,
  handlerSelect,
  title,
  dataOptions,
  valueSearch,
  rest,
}) => {
  const [dataRenderOptions, setDataRenderOptions] = useState([]);

  useEffect(() => {
    if (dataOptions?.length > 0) {
      let listOptions = dataOptions?.map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      });
      setDataRenderOptions(listOptions);
    }
  }, [dataOptions]);

  console.log("Data", dataRenderOptions);
  return (
    <AutoComplete
      allowClear={true}
      style={style}
      value={valueSearch}
      options={dataRenderOptions}
      filterOption={true}
      placeholder={placeholder}
      onSelect={handlerSelect}
      onSearch={handlerSearch}
      {...rest}
    />
  );
};

export default SearchComponent;
