import { orderConstant } from "./Constant";
import { Random_rgba } from "./RanDomColorRgba";

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result}₫`;
  } catch (error) {
    return null;
  }
};

export const convertDataChart = (data, type) => {
  try {
    const countMap = {};

    data.forEach((item) => {
      const value = item[type];
      countMap[value] = (countMap[value] || 0) + 1;
    });
    console.log("result", Object.entries(countMap));

    const result = Object.entries(countMap).map(([name, value]) => ({
      [type]: name,
      value,
      color: Random_rgba(),
    }));
    return result;
  } catch (e) {
    return [];
  }
};

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const convertTypeProduct = (str) => {
  console.log("str", str);
  if (str.length > 0 && Array.isArray(str)) {
    const newArrayType = str.map((item) => {
      const newStr = item
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return newStr.replace(/\s+/g, "-");
    });
    return newArrayType;
  } else {
    const newStr = str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return newStr.replace(/\s+/g, "-");
  }
};

export const convertDate = (date) => {
  const currentTime = new Date(date);

  const ngayThang = currentTime.getDate();
  const thang = currentTime.getMonth() + 1;
  const nam = currentTime.getFullYear();

  const gio = currentTime.getHours();
  const phut = currentTime.getMinutes();
  const giay = currentTime.getSeconds();

  const chuoiNgayThang = `ngày ${ngayThang} tháng ${thang} năm ${nam}`;
  const chuoiThoiGian = `${gio}:${phut}:${giay}`;

  return ` ${chuoiThoiGian} ${chuoiNgayThang}`;
};
