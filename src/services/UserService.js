import axios from "axios";
export const axiosJWT = axios.create();

export const Logout = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/log-out`
  );

  return res;
};
export const LogIn = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/sign-in`,
    data
  );

  return res.data;
};
export const Register = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/sign-up`,
    data
  );

  return res.data;
};

export const GetDetailsUser = async (id, accessToken) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BASE_URL}/user/get-detail/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};
export const GetAllUser = async (accessToken) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BASE_URL}/user/getAll`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};
export const UpdateUser = async (id, accessToken, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_BASE_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};

export const DeleteUser = async (id, accessToken) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_BASE_URL}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};
export const DeleteManyUser = async (id, accessToken) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_BASE_URL}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};
