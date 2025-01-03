import React, { useEffect, useMemo, useState } from "react";

const ProductsGet = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [dataTableProducts, setDataTableProducts] = useState([]);
  const [dataFilterProducts, setDataFilterProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [filterProducts, setFilterProducts] = useState({
    status: "",
  });
  const [loadProducts, setLoadProducts] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataProducts
  const FetchDataProducts = () => {
    setLoadProducts(true);
    fetch(`${import.meta.env.VITE_DB}products.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataProducts(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadProducts(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataProducts();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableProducts: transformedOrders di return
  const transformedOrders = useMemo(() => {
    setLoadProducts(true);
    if (Array.isArray(dataProducts) && dataProducts.length > 0) {
      const transformedData = dataProducts.map((data, index) => ({
        key: data.key,
        id: index + 1,
        img: data.img,
        productID: data.id_product,
        productName: data.name || "Unknown",
        price: data.price || 0,
        popular: data.popular || false,
        promo: data.promo || false,
        status: data.status || "Pending",
        description: data.description || "-",
        rating: data.rating || 0,
        type: data.type || 0,
        spesification: {
          weight: data.spesification.weight || 0,
          height: data.spesification.height || 0,
          is_fresh: data.spesificationis_fresh || true,
        },
      }));

      setDataTableProducts(transformedData);
      setDataFilterProducts(transformedData);
      setLoadProducts(false);
    }
  }, [dataProducts]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const filtered = dataTableProducts.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchProducts.toLowerCase() || filterProducts.status.toLowerCase()
        )
    );
    setDataFilterProducts(filtered);
  }, [searchProducts, filterProducts, dataTableProducts]);

  return {
    dataProducts,
    setDataProducts,
    dataTableProducts: transformedOrders,
    setDataTableProducts,
    dataFilterProducts,
    setDataFilterProducts,
    searchProducts,
    setSearchProducts,
    filterProducts,
    setFilterProducts,
    loadProducts,
    FetchDataProducts,
  };
};

export default ProductsGet;
