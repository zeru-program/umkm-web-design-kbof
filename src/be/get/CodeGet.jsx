import React, { useEffect, useMemo, useState } from "react";
import ProductsGet from "./ProductsGet";

const CodeGet = () => {
  const [dataCode, setDataCode] = useState([]);
  const [dataTableCode, setDataTableCode] = useState([]);
  const [dataFilterCode, setDataFilterCode] = useState([]);
  const [searchCode, setSearchCode] = useState("");
  const [filterCode, setFilterCode] = useState({
    status: "",
  });
  const [loadCode, setLoadCode] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataCode
  const FetchDataCode = () => {
    setLoadCode(true);
    fetch(`${import.meta.env.VITE_DB}product_code.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataCode(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadCode(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataCode();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableCode: transformedCode di return
  const transformedCode = useMemo(() => {
    if (!Array.isArray(dataCode) || dataCode.length === 0) {
      setLoadCode(true)
      return []; // Jangan lakukan apa-apa jika products sedang loading
    }
    if (Array.isArray(dataCode) && dataCode.length > 0) {
      setLoadCode(true);
  
      const transformedData = dataCode.map((data, index) => {
        return {
          key: data.key,
          id: index + 1,
          code_id: data.code_id,
          code_name: data.code_name,
          percentage_promo: data.percentage_promo,
          created_at: data.create_at,
          status: data.status || "Draft",
        };
      });
  
      setDataTableCode(transformedData);
      setDataFilterCode(transformedData);
      setLoadCode(false);
    }
  }, [dataCode]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const filtered = dataTableCode.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchCode.toLowerCase() || filterCode.status.toLowerCase()
        )
    );
    setDataFilterCode(filtered);
  }, [searchCode, filterCode, dataTableCode]);

  return {
    dataCode,
    setDataCode,
    dataTableCode: transformedCode,
    setDataTableCode,
    dataFilterCode,
    setDataFilterCode,
    searchCode,
    setSearchCode,
    filterCode,
    setFilterCode,
    loadCode,
    FetchDataCode,
  };
};

export default CodeGet;
