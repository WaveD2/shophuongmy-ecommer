import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async ({
  search,
  limit,
  token,
  page,
  price,
  discount,
}) => {
  let res = {};

  // get products search
  if (search && search?.length > 0 && !price && !discount) {
    res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}&page=${page}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  } else if (price || discount) {
    res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-all`, {
      params: {
        discount: discount,
        price: price,
        page: page,
        limit: limit,
      },
      headers: {
        token: `Bearer ${token}`,
      },
    });
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-all?page=${page}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  }
  return res.data.data;
};

export const getProductType = async ({ type, page, limit, token }) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-all?filter=${type}&limit=${limit}&page=${page}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
};

export const createProduct = async ({ token, data }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/product/create`,
    data,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsProduct = async ({ id }) => {
  if (id) {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/get-details/${id}`
    );
    return res.data;
  }
};

export const updateProduct = async (data) => {
  const { id, token, ...rest } = data;
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_BASE_URL}/product/update/${id}`,
    rest,
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

export const deleteManyProduct = async ({ ids, token }) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BASE_URL}/product/delete-many`,
    { ids: ids },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/product/get-all-type`
  );
  return res.data;
};

export const getListProductType = async ({ type, page }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/product/type/${type}/${page}`
  );

  return res.data;
};
