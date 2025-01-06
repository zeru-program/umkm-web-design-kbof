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
  const [statusOptBlogs, setStatusOptBlogs] = useState([
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
  ]);
  const [statusOptUsers, setStatusOptUsers] = useState([
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
  ]);
  const [statusOptPromo, setStatusOptPromo] = useState([
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
  ]);
  const [statusOptCode, setStatusOptCode] = useState([
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
  ]);
  return { statusOptOrders, statusOptProducts, statusOptBlogs, statusOptUsers, statusOptPromo, statusOptCode };
};

export default StatusOption;
