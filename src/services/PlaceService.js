import axios from "axios";

let urlApi = process.env.API_DRESS || "https://provinces.open-api.vn/api";

export const Provinces = async () => {
  const res = await axios.get(`${urlApi}/?depth=1`);
  return res.data;
};

//typeValue = {key : name , value : {code : 0 , name : 'Chọn xã/phường'}}

export const DressByProvinces = async ({ key, param, typeValue }) => {
  const res = await axios.get(`${urlApi}/${key}/${param}?depth=2`);

  if (res?.data[typeValue.key]?.length > 0) {
    return [typeValue.value, ...res?.data[typeValue.key]];
  } else {
    return [typeValue.value];
  }
};

// axios.get("https://provinces.open-api.vn/api/?depth=1").then((response) => {
//   setProvinces([{ code: 0, name: "Chọn tỉnh/thành" }, ...response.data]);

//   axios
//     .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
//     .then((response) => {
//       if (response?.data.districts?.length > 0) {
//         setCities([
//           { code: 0, name: "Chọn quận/huyện" },
//           ...response?.data.districts,
//         ]);
//       } else {
//         setCities([{ code: 0, name: "Chọn quận/huyện" }]);
//       }
//     });
// }
