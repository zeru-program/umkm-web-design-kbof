import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const TrueFalse = () => {
  const [trueFalse] = useState([
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ]);
  const [maleFemale] = useState([
    { value: true, label: "Male" },
    { value: false, label: "Female" },
  ]);
  return { trueFalse, maleFemale };
};

export default TrueFalse;
