import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const Filter1Product = () => {
    const [filter1] = useState([
      { value: "popular", label: "Popular" },
      { value: "promo", label: "Promo" },
      { value: "newest", label: "Newest" },
    ]);
    const [filter2] = useState([
      { value: 1, label: "⭐" },
      { value: 2, label: "⭐⭐" },
      { value: 3, label: "⭐⭐⭐" },
      { value: 4, label: "⭐⭐⭐⭐" },
      { value: 5, label: "⭐⭐⭐⭐⭐" },
    ]);
    return { filter1, filter2 };
};
  

export default Filter1Product;