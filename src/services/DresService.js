import axios from "axios";
export const Provinces = async () => {
  const res = await axios.get(`${process.env.API_DRESS}/?depth=1`);
  return res.data;
};

export const DressByProvinces = async ({ key, param }) => {
  const res = await axios.get(
    `${process.env.API_DRESS}/${key}/${param}?depth=2`
  );
  return res.data;
};
