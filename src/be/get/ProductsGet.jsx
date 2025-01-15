import React, { useEffect, useMemo, useState } from "react";

const ProductsGet = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [dataTableProducts, setDataTableProducts] = useState([]);
  const [dataFilterProducts, setDataFilterProducts] = useState([]);
  const [dataFilterProductsDisplay, setDataFilterProductsDisplay] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [filterProducts, setFilterProducts] = useState({
    status: "",
  });
  const [loadProducts, setLoadProducts] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataProducts
  const FetchDataProducts = async () => {
    setLoadProducts(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_DB}products.json`);
      const data = await res.json();
      setDataProducts(
        Object.entries(data).map(([key, value]) => ({ key, ...value }))
      );
      setLoadProducts(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoadProducts(false);
    }
  };

  useEffect(() => {
    FetchDataProducts();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableProducts: transformedProducts di return
  const transformedProducts = useMemo(() => {
    setLoadProducts(true);
    if (Array.isArray(dataProducts) && dataProducts.length > 0) {
      const transformedData = dataProducts.map((data, index) => ({
        key: data.key,
        id: index + 1,
        img: data.img,
        productID: data.id_product,
        productName: data.name || "Unknown",
        price: data.price || 0,
        popular: data.is_popular || false,
        promo: data.is_discount || false,
        status: data.status || "Pending",
        created_at: data.created_at || "Unknown",
        description: data.description || "-",
        rating: data.rating || 0,
        type: data.type || 0,
        stock: data.stock || 0,
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
    const sortedData = [...dataTableProducts].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    const filtered = sortedData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchProducts.toLowerCase() || filterProducts.status.toLowerCase()
        )
    );
    const filteredProductsDisplay = dataProducts.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchProducts.toLowerCase() || filterProducts.status.toLowerCase()
        )
    );
    setDataFilterProducts(filtered);
    setDataFilterProductsDisplay(filteredProductsDisplay)
  }, [searchProducts, filterProducts, dataTableProducts]);

  return {
    dataProducts,
    setDataProducts,
    dataTableProducts: transformedProducts,
    setDataTableProducts,
    dataFilterProducts,
    setDataFilterProducts,
    searchProducts,
    setSearchProducts,
    filterProducts,
    setFilterProducts,
    loadProducts,
    dataFilterProductsDisplay,
    FetchDataProducts,
  };
};

export default ProductsGet;
