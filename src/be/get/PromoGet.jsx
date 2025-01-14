import React, { useEffect, useMemo, useState } from "react";
import ProductsGet from "./ProductsGet";

const PromoGet = () => {
  const { dataProducts, loadProducts } = ProductsGet()
  const [dataPromo, setDataPromo] = useState([]);
  const [dataTablePromo, setDataTablePromo] = useState([]);
  const [dataFilterPromo, setDataFilterPromo] = useState([]);
  const [searchPromo, setSearchPromo] = useState("");
  const [filterPromo, setFilterPromo] = useState({
    status: "",
  });
  const [loadPromo, setLoadPromo] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataPromo
  const FetchDataPromo = () => {
    setLoadPromo(true);
    fetch(`${import.meta.env.VITE_DB}product_promo.json`)
      .then((res) => res.json())
      .then((data) => {
        // if (data) {
        // }
        setDataPromo(Object.entries(data).map(([key, value]) => ({ key, ...value })));
        setLoadPromo(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataPromo();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTablePromo: transformedPromo di return
  const transformedPromo = useMemo(() => {
    if (loadProducts || !Array.isArray(dataPromo) || dataPromo.length === 0) {
      setLoadPromo(true)
      return []; // Jangan lakukan apa-apa jika products sedang loading
    }
    if (Array.isArray(dataPromo) && dataPromo.length > 0 && Array.isArray(dataProducts)) {
      setLoadPromo(true);
  
      const productMap = new Map(
        dataProducts.map((product) => [product.id_product, product.price])
      );
  
      const transformedData = dataPromo.map((data, index) => {
        const percentagePromo = parseFloat(data.percentage_promo.replace('%', '')) / 100;
        const initialPrice = productMap.get(data.id_product);
        const resultPrice = initialPrice - (percentagePromo * initialPrice);
        // console.log(percentagePromo)

        // if (initialPrice && resultPrice)
  
        return {
          key: data.key,
          id: index + 1,
          id_product: data.id_product,
          product_name: dataProducts.find((product) => product.id_product === data.id_product).name,
          percentage_promo: data.percentage_promo,
          initial_price: initialPrice || "Loading..",
          result_price: Math.max(resultPrice, 0) || "Loading..", 
          periode_start: data.periode_start,
          periode_end: data.periode_end,
          periode: `${data.periode_start} - ${data.periode_end}`,
          created_at: data.create_at,
          status: data.status || "Draft",
        };
      });
  
      setDataTablePromo(transformedData);
      setDataFilterPromo(transformedData);
      setLoadPromo(false);
    }
  }, [dataPromo, dataProducts, loadProducts]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const filtered = dataTablePromo.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchPromo.toLowerCase() || filterPromo.status.toLowerCase()
        )
    );
    setDataFilterPromo(filtered);
  }, [searchPromo, filterPromo, dataTablePromo]);

  return {
    dataPromo,
    setDataPromo,
    dataTablePromo: transformedPromo,
    setDataTablePromo,
    dataFilterPromo,
    setDataFilterPromo,
    searchPromo,
    setSearchPromo,
    filterPromo,
    setFilterPromo,
    loadPromo,
    FetchDataPromo,
  };
};

export default PromoGet;
