import React, { useEffect, useMemo, useState } from "react";
import ProductsGet from "./ProductsGet";
import Users from "./Users";
import dayjs from "dayjs";

const OrdersGet = () => {
  const { dataProducts } = ProductsGet();
  const { dataUsers } = Users();
  const [dataOrders, setDataOrders] = useState([]);
  const [dataTableOrders, setDataTableOrders] = useState([]);
  const [dataFilterOrders, setDataFilterOrders] = useState([]);
  const [dataFilterNowOrders, setDataFilterNowOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState("");
  const [filterOrders, setFilterOrders] = useState({
    status: "",
  });
  const [loadOrders, setLoadOrders] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataOrders
  const FetchDataOrders = () => {
    setLoadOrders(true);
    fetch(`${import.meta.env.VITE_DB}orders.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataOrders(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadOrders(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataOrders();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableOrders: transformedOrders di return
  const transformedOrders = useMemo(() => {
    setLoadOrders(true);
    if (
      Array.isArray(dataOrders) &&
      dataOrders.length > 0 &&
      Array.isArray(dataProducts) &&
      Array.isArray(dataUsers)
    ) {
      const productMap = new Map(
        dataProducts.map((product) => [product.id_product, product.name])
      );
      const userMap = new Map(
        dataUsers.map((user) => [user.id, user.username])
      );
      const transformedData = dataOrders.map((data, index) => {
        return {
          key: data.key,
          id: index + 1,
          orderID: data.id_order,
          productID: data.id_product,
          productName: productMap.get(data.id_product) || "Loading..",
          id_user: data.id_user || "Loading..",
          orderer: userMap.get(data.id_user) || "Loading..",
          qty: data.qty || 0,
          total: data.total || 0,
          location_client: data.location_client || 0,
          recipient_name: data.recipient_name || 0,
          payment_method: data.payment_method || 0,
          order_note: data.order_note || 0,
          token: data.token || 0,
          created_at: data.created_at || 0,
          status: data.status || "Pending",
          statusDisplay: data.status || "Pending",
        };
      });

      setDataTableOrders(transformedData);
      setDataFilterOrders(transformedData);
      setLoadOrders(false);
    }
  }, [dataOrders, dataProducts]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const sortedData = [...dataTableOrders].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    const filtered = sortedData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchOrders.toLowerCase() || filterOrders.status.toLowerCase()
        )
    );

    // filtered data now date (hanya tanggal sekarang yang akan tampil di page dashboard home)
    const today = dayjs().format("YYYY-MM-DD");
    const productMap = new Map(
      dataProducts.map((product) => [product.id_product, product.name])
    );
    const userMap = new Map(dataUsers.map((user) => [user.id, user.username]));
    const sortedDataToday = dataOrders
      .filter((item) => {
        const createdAtMatch = item.created_at.includes(today);
        const searchMatch = searchOrders
          ? Object.values(item)
              .join(" ")
              .toLowerCase()
              .includes(searchOrders.toLowerCase())
          : true; // true jika searchOrders kosong
        const statusMatch = filterOrders.status
          ? item.status
              .toLowerCase()
              .includes(filterOrders.status.toLowerCase())
          : true; // true jika filterOrders.status kosong

        // Gabungkan semua kondisi
        return createdAtMatch && searchMatch && statusMatch;
      })
      .map((data, index) => {
        return {
          key: data.key,
          id: index + 1,
          orderID: data.id_order,
          productID: data.id_product,
          productName: productMap.get(data.id_product) || "Loading..",
          id_user: data.id_user || "Loading..",
          orderer: userMap.get(data.id_user) || "Loading..",
          qty: data.qty || 0,
          total: data.total || 0,
          location_client: data.location_client || 0,
          recipient_name: data.recipient_name || 0,
          payment_method: data.payment_method || 0,
          order_note: data.order_note || 0,
          token: data.token || 0,
          created_at: data.created_at || 0,
          status: data.status || "Pending",
          statusDisplay: data.status || "Pending",
        };
      });

    setDataFilterOrders(filtered);
    setDataFilterNowOrders(sortedDataToday);
  }, [searchOrders, filterOrders, dataTableOrders]);

  return {
    dataOrders,
    setDataOrders,
    dataTableOrders: transformedOrders,
    setDataTableOrders,
    dataFilterOrders,
    setDataFilterOrders,
    searchOrders,
    setSearchOrders,
    filterOrders,
    setFilterOrders,
    FetchDataOrders,
    dataFilterNowOrders,
    setDataFilterNowOrders,
    loadOrders,
  };
};

export default OrdersGet;
