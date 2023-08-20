import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async ({ search, limit, token }) => {
  let res = {};
  if (search && search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  } else if (limit) {
    res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-all?limit=${limit}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-all`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
  return res.data;
};

export const getProductType = async ({ type, page, limit, token }) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/product/create`,
    data
  );
  return res.data;
};

export const getDetailsProduct = async ({ id, token }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/product/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const updateProduct = async ({ id, token, data }) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_BASE_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async ({ id, token }) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_BASE_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyProduct = async ({ data, token }) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BASE_URL}/product/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getAllTypeProduct = async ({ token }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/product/get-all-type`,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
