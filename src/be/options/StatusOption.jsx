import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const StatusOption = () => {
  const { dataProducts } = ProductsGet();
  const [statusOptOrders, setStatusOpt] = useState([
    { value: "success", label: "Success" },
    { value: "shipping", label: "Shipping" },
    { value: "pending", label: "Pending" },
  ]);
  const [statusOptProducts, setStatusOptProducts] = useState([
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
  ]);
  return { statusOptOrders, statusOptProducts };
};

export default StatusOption;
