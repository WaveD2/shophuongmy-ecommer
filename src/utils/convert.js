import { orderConstant } from "./Constant";

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};
export const convertDataChart = (data, type) => {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((opt) => {
        if (!object[opt[type]]) {
          object[opt[type]] = 1;
        } else {
          object[opt[type]] += 1;
        }
      });
    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: orderConstant.payment[item],
          value: object[item],
        };
      });
    return results;
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

export const convertTypeProduct = ({ type }) => {
  const newTypeProduct = type
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  return newTypeProduct;
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
