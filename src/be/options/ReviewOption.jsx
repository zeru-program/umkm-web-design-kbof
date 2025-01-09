import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const ReviewOption = () => {
    const [feelOpt] = useState([
      { value: "happy", label: "Happy 😆" },
      { value: "not bad", label: "Not Bad 😊" },
      { value: "poor", label: "Poor 🙄" },
    ]);
    const [star] = useState([
      { value: 1, label: "⭐" },
      { value: 2, label: "⭐⭐" },
      { value: 3, label: "⭐⭐⭐" },
      { value: 4, label: "⭐⭐⭐⭐" },
      { value: 5, label: "⭐⭐⭐⭐⭐" },
    ]);
    return { feelOpt, star };
};
  

export default ReviewOption;