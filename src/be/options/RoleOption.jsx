import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const RoleOption = () => {
  const [roleOpt] = useState([
    { value: "admin", label: "Admin" },
    { value: "developer", label: "Developer" },
    { value: "pembeli", label: "Pembeli" },
    { value: "seller", label: "Seller" },
  ]);
  return { roleOpt };
};

export default RoleOption;
