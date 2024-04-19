import axios from "axios";

let urlApi =
  process.env.API_DRESS || "https://vnprovinces.pythonanywhere.com/api";

export const Provinces = async () => {
  const res = await axios.get(`${urlApi}/?basic=true&limit=100
`);
  return res.data;
};

//typeValue = {key : name , value : {code : 0 , name : 'Chọn xã/phường'}}

//vnprovinces.pythonanywhere.com/api/districts/?province_id=24&basic=true&limit=100
export const DressByProvinces = async ({key, param, typeValue}) => {
  console.log("param", param);
  const res = await axios.get(`${urlApi}/${key}/?${param}&basic=true&limit=100
`);

  if (res?.data.results.length > 0) {
    return [typeValue.value, ...res?.data.results];
  } else {
    return [typeValue.value];
  }
};

// axios.get("https://vnprovinces.pythonanywhere.com/api/?depth=1").then((response) => {
//   setProvinces([{ code: 0, name: "Chọn tỉnh/thành" }, ...response.data]);

//   axios
//     .get(`https://vnprovinces.pythonanywhere.com/api/p/${selectedProvince}?depth=2`)
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
