import React, { useEffect, useState, useMemo } from "react";
import CryptoJS from "crypto-js";
import Users from "./Users";
import ProductsGet from "./ProductsGet";

const Reviews = () => {
  const [dataReviews, setDataReviews] = useState([]);
  const [dataTableReviews, setDataTableReviews] = useState([]);
  const [dataFilterReviews, setDataFilterReviews] = useState([]);
  const [searchReviews, setSearchReviews] = useState("");
  const [filterReviews, setFilterReviews] = useState({
    status: "",
  });
  const [loadReviews, setLoadReviews] = useState(true);
  const { dataUsers } = Users()
  const { dataProducts } = ProductsGet()

  // init atau fetch pertama kali lalu set data ke dataReviews
  const FetchDataReviews = () => {
    setLoadReviews(true);
    fetch(`${import.meta.env.VITE_DB}reviews.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataReviews(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadReviews(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataReviews();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableReviews: transformedReviews di return
  const transformedReviews = useMemo(() => {
    setLoadReviews(true);
    if (Array.isArray(dataReviews) && dataReviews.length > 0 && dataUsers.length > 0 && dataProducts.length > 0) {
      const transformedData = dataReviews.map((data, index) => {
        const find = dataUsers.find((item) => item.id === data.id_user)
        const findProd = dataProducts.find((item) => item.id_product === data.id_product)
        return {
          key: data.key,
          id: index + 1,
          id_order: data.id_order,
          id_product: findProd.name,
          id_user: find.username,
          rating: data.rating,
          feeling: data.feeling,
        }
      });

      setDataTableReviews(transformedData);
      setDataFilterReviews(transformedData);
      setLoadReviews(false);
    }
  }, [dataReviews, dataUsers]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const filtered = dataTableReviews.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchReviews.toLowerCase() || filterReviews.status.toLowerCase())
    );
    setDataFilterReviews(filtered);
  }, [searchReviews, filterReviews, dataTableReviews]);

  return { 
    dataReviews,
    setDataReviews,
    dataTableReviews: transformedReviews,
    setDataTableReviews,
    dataFilterReviews,
    setDataFilterReviews,
    searchReviews,
    setSearchReviews,
    filterReviews,
    setFilterReviews,
    loadReviews,
    FetchDataReviews,
  };
};

export default Reviews;
