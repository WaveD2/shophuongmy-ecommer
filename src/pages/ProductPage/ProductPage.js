import React from "react";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Message from "../../components/Message/Message";

const ProductPage = () => {
  let type = "quan-ao-nam";
  const fetchMyOrder = async () => {
    const res = await ProductService.getListProductType({
      type: type,
    });
    return res.data;
  };

  const queryGetType = useQuery({
    queryKey: ["product-type"],
    queryFn: fetchMyOrder,
  });
  const { isLoading, data } = queryGetType;

  return <div>ProductPage</div>;
};

export default ProductPage;
