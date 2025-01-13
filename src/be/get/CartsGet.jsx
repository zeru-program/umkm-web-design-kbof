import React, { useEffect, useMemo, useState } from "react";
import ProductsGet from "./ProductsGet";
import Users from "./Users";
import dayjs from "dayjs";

const CartsGet = () => {
  const { dataProducts, loadProducts } = ProductsGet();
  const { dataUsers } = Users();
  const [dataCarts, setDataCarts] = useState([]);
  const [dataTableCarts, setDataTableCarts] = useState([]);
  const [dataFilterCarts, setDataFilterCarts] = useState([]);
  const [dataFilterNowCarts, setDataFilterNowCarts] = useState([]);
  const [searchCarts, setSearchCarts] = useState("");
  const [filterCarts, setFilterCarts] = useState({
    status: "",
  });
  const [loadCarts, setLoadCarts] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataCarts
  const FetchDataCarts = () => {
    setLoadCarts(true);
    fetch(`${import.meta.env.VITE_DB}carts.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataCarts(
          Object.entries(data).map(([key, value]) => ({ key, ...value })) || []
        );
        setLoadCarts(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataCarts();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableCarts: transformedCarts di return
  const transformedCarts = useMemo(() => {
    if (!dataCarts) {
      setLoadCarts(false)
      return [];   
    }
    if (loadProducts || !Array.isArray(dataCarts) || dataCarts.length === 0) {
      setLoadCarts(true)
      return []; 
    }
    if (
      Array.isArray(dataCarts) &&
      dataCarts.length > 0 &&
      Array.isArray(dataProducts)
    ) {
      // console.log(sessionStorage.getItem('id'))
      // console.log(dataProducts.find((item) => item.id_product === "p1fiqmML"))
      setLoadCarts(true);
      const transformedData = dataCarts.filter((item) => item.user_id === sessionStorage.getItem('id')).map((data, index) => {
        const findProd = dataProducts.find((item) => item.id_product === data.product_id);
        if (findProd) {
          // console.log("find", findProd)
        return {
          key: data.key,
          id: index + 1,
          product: data.product_id,
          product_id: data.product_id,
          product_name: findProd.name,
          product_img: findProd.img,
          product_spec: findProd.spesification,
          product_price: findProd.price,
          qty: data.qty,
          total: findProd.price * data.qty,
        };
      }
      });
      // console.log(transformedData)

      setDataTableCarts(transformedData);
      setDataFilterCarts(transformedData);
      setLoadCarts(false);
    }
  }, [dataCarts, dataProducts, loadProducts]);

  return {
    dataCarts,
    setDataCarts,
    dataTableCarts,
    setDataTableCarts,
    dataFilterCarts,
    setDataFilterCarts,
    searchCarts,
    setSearchCarts,
    filterCarts,
    setFilterCarts,
    FetchDataCarts,
    dataFilterNowCarts,
    setDataFilterNowCarts,
    loadCarts,
  };
};

export default CartsGet;
