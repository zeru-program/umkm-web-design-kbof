import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const ProductsOption = () => {
  const { dataProducts } = ProductsGet();
  const [productOpt, setproductOpt] = useState([]);
  useEffect(() => {
    if (Array.isArray(dataProducts) && dataProducts.length > 0) {
      const transformedData = dataProducts.map((data) => ({
        value: data.id_product,
        label: data.name + " - " + data.id_product,
      }));
      setproductOpt(transformedData);
      //   console.log(productOpt)
    }
  }, [dataProducts]);
  return { productOpt };
};

export default ProductsOption;
