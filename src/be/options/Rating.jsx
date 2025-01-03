import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const Rating = () => {
  const { dataProducts } = ProductsGet();
  const [ratingOpt, setStatusOpt] = useState([
    { value: 1, label: "X1" },
    { value: 2, label: "X2" },
    { value: 3, label: "X3" },
    { value: 4, label: "X4" },
    { value: 5, label: "X5" },
  ]);
  return { ratingOpt };
};

export default Rating;
