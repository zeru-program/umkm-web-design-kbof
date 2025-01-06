import React, { useEffect, useState } from "react";
import ProductsGet from "../get/ProductsGet";

const ProductsOption = () => {
  const { dataProducts } = ProductsGet();
  const [productOpt, setproductOpt] = useState([]);
  const [productOptClean, setproductOptClean] = useState([]);
  useEffect(() => {
    if (Array.isArray(dataProducts) && dataProducts.length > 0) {
      const transformedData = dataProducts.map((data) => ({
        value: data.id_product,
        label: data.name + " - " + data.id_product,
      }));
      setproductOpt(transformedData);


      const transformedDataClean = dataProducts.map((data) => ({
        value: data.id_product,
        label: data.name,
      }));
      setproductOptClean(transformedDataClean);
    }
  }, [dataProducts]);
  return { productOpt, productOptClean };
};

export default ProductsOption;
