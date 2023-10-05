import axios from "axios";

export const getConfigPayment = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/payment/config`
  );
  return res.data;
};
