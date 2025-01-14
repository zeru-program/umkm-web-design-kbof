import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import { data, useParams } from "react-router-dom";
import ProductsGet from "../../be/get/ProductsGet";
import N404 from "./N404";
import GenerateString from "../../be/GenerateString";
import PromoGet from "../../be/get/PromoGet";
import BoxDash from "../components/dashboard/BoxDash";
import Users from "../../be/get/Users";
import CodeGet from "../../be/get/CodeGet";
import Toast from "../components/Toast";
import Swal from "sweetalert2";
import OrdersPost from "../../be/post/OrdersPost";
import OrdersGet from "../../be/get/OrdersGet";
import OrdersEdit from "../../be/edit/OrdersEdit";
const now = new Date();
const formattedDate =
  now.getFullYear() +
  "-" +
  String(now.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(now.getDate()).padStart(2, "0") +
  "T" +
  String(now.getHours()).padStart(2, "0") +
  ":" +
  String(now.getMinutes()).padStart(2, "0");

const Detail = ({ find, idO, findProduct }) => {
  const { handleEdit } = OrdersEdit()
  const [badgeStatus, setBadgeStatus] = useState("");
  useEffect(() => {
    if (find.status === "success") {
      setBadgeStatus("success");
    } else if (find.status === "shipping") {
      setBadgeStatus("info");
    } else if (find.status === "pending") {
      setBadgeStatus("warning");
    }
  }, [find]);

  const confirmPay = async () => {
    // console.log(find);
  
    if (!find || !find.token_payment) {
      console.error("Token payment is not available in `find`");
      return;
    }
  
    if (typeof snap === "undefined") {
      console.error("Snap is not initialized");
      return;
    }
    // console.log(find)
    snap.pay(find.token_payment, {
      onSuccess: async (result) => {
        console.log("Payment success:", result);
        try {
          const res = await handleEdit({ status: "success" }, find.key || "");
          if (res) {
            window.location.href = "/payment/" + idO;
          }
        } catch (error) {
          console.error("Error during success callback:", error);
        }
      },
      onPending: (result) => console.log("Payment pending:", result),
      onError: (result) => console.error("Payment error:", result),
      onClose: () => console.warn("Customer closed the payment popup"),
    });
  };
  


  return (
    <>
      <section className="mb-5 pb-5">
        <BoxDash
          title
          content={
            <>
              <div className="d-flex flex-wrap align-items-center ">
                <div className="w50-res p-4 mb-2">
                  <img
                    src={findProduct.img ? findProduct.img : ""}
                    alt={findProduct.name}
                    className="w-100"
                  />
                </div>
                <div className="d-flex w50-res gap-2 flex-column">
                  <span className="fw-bold">Order #{idO}</span>
                  <div>
                    <span className={`badge bg-${badgeStatus}`}>
                      {find.status.toUpperCase()}
                    </span>
                  </div>
                  <span>
                    Created At{" "}
                    {find.created_at
                      .replace("-", "/")
                      .replace("-", "/")
                      .replace("T", "-")}
                  </span>
                  <div className="d-flex justify-content-between">
                      <span>Item Ordered</span>
                  </div>
                  <div className="d-flex justify-content-between">
                      <span>{findProduct.name}</span>
                      <span>x{find.qty}</span>
                      {/* <span>Rp{parseFloat(find.total).toLocaleString("id-ID")}</span> */}
                  </div>
                  <div className="d-flex justify-content-between">
                      <span className="fw-bold">Totals (Include Tax)</span>
                      {/* <span>x{find.qty}</span> */}
                      <span className="fw-bold">Rp{parseFloat(find.total).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="mt-2">
                    {
                      find.payment_method === "digital" && find.status === "pending" ? (
                        <button className="btn bg-primary text-light" onClick={confirmPay}>Confirm Payment</button>
                      ) : find.payment_method === "cod" && find.status === "pending" ? (
                        <span className="text-danger">You choose cash on delivery as your payment method, please prepare it</span>
                      ) : ""
                    }
                  </div>
                </div>
              </div>
            </>
          }
        />
      </section>
    </>
  );
};

const OrderDetail = () => {
  const { idO } = useParams();
  const { dataProducts, loadProducts } = ProductsGet();
  const { dataPromo } = PromoGet();
  const { handleEdit } = OrdersEdit()
  const { dataOrders, loadOrders } = OrdersGet();
  const [find, setFind] = useState(null);
  const [findProduct, setFindProduct] = useState(null);

  
  useEffect(() => {
    if (dataOrders && dataProducts && dataOrders.length > 0 && dataProducts.length > 0) {
      const foundOrders = dataOrders.find((item) => item.id_order === idO);
      if (foundOrders) {
        const foundProduct = dataProducts.find((item) => item.id_product === foundOrders.id_product);
        setFind(foundOrders || null);
        setFindProduct(foundProduct || null);
      } else {
        setFind(null);
        setFindProduct(null);
      }
    }
  }, [dataOrders, dataProducts, idO]);

  useEffect(() => {
    const snapJs = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT;
  
    if (!document.querySelector(`script[src="${snapJs}"]`)) {
      const script = document.createElement("script");
      script.src = snapJs;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;
  
      script.onload = () => {
        console.log("Snap script loaded");
      };
  
      document.body.appendChild(script);
    }
  }, []);
  
  useEffect(() => {
    if (dataOrders && dataProducts && dataOrders.length > 0 && dataProducts.length > 0) {
      const findOrder = dataOrders.find((item) => item.id_order === idO);
      
      if (findOrder && sessionStorage.getItem("first_pay")) {
        const token = sessionStorage.getItem("first_pay");
        snap.pay(token, {
          onSuccess: async (result) => {
            console.log("Payment success:", result);
            try {
              const res = await handleEdit({ status: "success" }, findOrder.key || "");
              if (res) {
                window.location.href = "/payment/" + idO;
              }
            } catch (error) {
              console.error("Error during success callback:", error);
            }
          },
          onPending: (result) => console.log("Payment pending:", result),
          onError: (result) => console.error("Payment error:", result),
          onClose: () => console.warn("Customer closed the payment popup"),
        });
        sessionStorage.removeItem("first_pay"); 
      }
    }
  }, [dataOrders, dataProducts, idO]);
  
  


  // Tampilkan spinner saat data sedang dimuat
  if (loadOrders) {
    return (
      <div className="py-2 w-100 vh-100 d-flex justify-content-center align-items-center mt-4 px-4">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Tampilkan halaman 404 jika produk tidak ditemukan
  if (!find && !findProduct) {
    return <N404 />;
  }

  // Render halaman detail produk
  return (
    <Base
      mainContent={
        <section className="section-all-detail-product container-main">
          <Detail find={find} idO={idO} findProduct={findProduct} />
        </section>
      }
    />
  );
};

export default OrderDetail;
