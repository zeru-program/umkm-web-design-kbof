import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const TrueFalse = () => {
  const [trueFalse, setStatusOpt] = useState([
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ]);
  return { trueFalse };
};

export default TrueFalse;
