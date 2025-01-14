import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import UsersEdit from "../../be/edit/UsersEdit";
import Users from "../../be/get/Users";
import Toast from "../components/Toast";
import SidebarProfile from "../components/SidebarProfile";
import OrdersGet from "../../be/get/OrdersGet";
import ProductsGet from "../../be/get/ProductsGet";
import DataTable from "react-data-table-component";
import TheadCart from "../../be/datatables/TheadCart";
import CartsGet from "../../be/get/CartsGet";
import CodeGet from "../../be/get/CodeGet";
import Swal from "sweetalert2";
import GenerateString from "../../be/GenerateString";
import Modal2 from "../components/dashboard/Modal2";
import Payment from "../../be/options/Payment";
import Select from "react-select";
import OrdersPost from "../../be/post/OrdersPost";
import PostOrder from "../../be/midtrans/PostOrder";
import CartsDelete from "../../be/delete/CartsDelete";
import './Carts.css'
const customStyles = {
  headCells: {
    style: {
      justifyContent: "center",
      textAlign: "center"
    },
  },
  cells: {
    style: {
      justifyContent: "center",
      textAlign: "center", 
    },
  },
};
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


const ButtonTrigSidebar = () => {
  return (
    <div className="d-flex container-main gap-3 w-100 bg-primary text-light py-3 align-items-center">
      <div
        className=""
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas"
        role="button"
        id="iClick"
      >
        <i
          className="bi-list fw-bold cursor-pointer"
          style={{ cursor: "pointer", fontSize: "25px" }}
        ></i>
      </div>
      {/* <div className='d-flex align-items-center gap-2' style={{cursor: "pointer"}} onClick={() => history.back()}>
                <i className='bi bi-arrow-left'></i>
                <span>Back</span>
            </div> */}
    </div>
  );
};

const OrderContent = () => {
  const { CartTh, qtyAll, totalAll } = TheadCart()
  const { dataCode } = CodeGet()
  const { dataProducts } = ProductsGet()
  const { handlePost } = OrdersPost()
  const { paymentOpt } = Payment()
  const { postPayment } = PostOrder()
  const { loadCarts, filterCarts, dataTableCarts } = CartsGet()
  const { handleDelete } = CartsDelete()
  const [selectedRow, setSelectedRow] = useState([]);
  const [totalAllProd, setTotalAllProd] = useState(0);
  const [tax1, setTax1] = useState(0)
  const [tax2, setTax2] = useState(0)
  const [discountPrice, setDiscountPrice] = useState('')
  const [codePromo, setCodePromo] = useState('')
  const [resultWithTax, setResultWithTax] = useState(0)
  const [isCode, setIsCode] = useState(false)
  const [dataNotAvaible, setdataNotAvaible] = useState(false)
  const [totals, setTotals] = useState(0)
  const [idOrder, setIdOrder] = useState(GenerateString(9))
  const [infoCust, setInfoCust] = useState({
    location_client: '',
    recipient_name: '',
    recipient_phone: '',
    payment_method: '',
  })
  const [dataCheckout, setDataCheckout] = useState(null)

  const handleApplyPromo = () => {
    const baseTotal = resultWithTax;
    const promo = dataCode.find((item) => item.code_name === codePromo);

    if (promo) {
      const discount = (parseInt(promo.percentage_promo.replace("%", ""), 10) / 100) * baseTotal;
      // console.log(discount)
      setDiscountPrice(discount.toFixed(0))
      const newTotal = baseTotal - discount;
      setTotals(newTotal.toFixed(0));
      setIsCode(true)
      
      Swal.fire({
        title: "Success",
        text: "Code applied successfully",
        icon: "success"
      });
    } else {
      setIsCode(false)
      setTotals(baseTotal);
      Swal.fire({
        title: "Failed",
        text: "Oops, Code cannot be used.",
        icon: "error"
      });
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    if (dataTableCarts) {
      try {
        // Buat array promises untuk semua operasi asinkron
        const promises = dataTableCarts.map((item, index) => {
          const newData = {
            id_order: idOrder,
            id_product: item.product,
            id_user: sessionStorage.getItem("id"),
            location_client: infoCust.location_client,
            recipient_name: infoCust.recipient_name,
            recipient_phone: infoCust.recipient_phone,
            payment_method: infoCust.payment_method,
            order_note: "",
            qty: qtyAll[index],
            status: "pending",
            token: GenerateString(15),
            token_payment: "",
            total: isCode ? totals : resultWithTax,
            created_at: formattedDate,
          };
  
          return (async () => {
            const resPostData = await handlePost(newData);
            if (resPostData) {
              await handleDelete(item.key);
            }
          })();
        });
  
        // Tunggu semua promises selesai
        await Promise.all(promises);
  
        // Setelah semua berhasil, lakukan operasi berikut
        sessionStorage.setItem(
          "success",
          `Success checkout ${dataTableCarts.length} items in carts`
        );
        location.reload();
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };
  

  useEffect(() => {
    const grandTotal = Object.values(totalAll).reduce((acc, total) => acc + total, 0);
    setTotalAllProd(grandTotal || 0);
  }, [totalAll]);

  useEffect(() => {
    setTax1((totalAllProd * (11 / 100)).toFixed(0) || 0)
    setTax2((totalAllProd * (2 / 100)).toFixed(0) || 0)
  }, [totalAllProd])

  useEffect(() => {
    setResultWithTax(totalAllProd + parseFloat(tax1) + parseFloat(tax2))
  }, [totalAllProd, tax1, tax2])

  useEffect(() => {
    if (dataTableCarts.length < 1) {
      setdataNotAvaible(true)
    } else {
      setdataNotAvaible(false)
    }
  }, [dataTableCarts])
  
  
  return (
    <>
      <div className="container-main w-100 py-5">
        <div className="w-100 d-flex flex-column py-3 mt-5">
          <h1 className="text-center mb-5" data-aos="fade-down">My Carts</h1>
          <div className="text-satoshi mb-4">
            {loadCarts ? (
              <div className="w-100 d-flex justify-content-center">
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : dataTableCarts.length > 0 ? (
                <DataTable
                  columns={CartTh}
                  data={dataTableCarts}
                  // pagination
                  paginationPerPage={20}
                  highlightOnHover
                  progressPending={loadCarts}
                  progressComponent={
                    <div className="py-2 mt-4 px-4">
                      <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  }
                  onRowClicked={(row) => window.location.href = "/plants/" + row.product_name}
                  persistTableHead
                  striped
                  auto
                  responsive
                  customStyles={customStyles}
                />
              ) : (
                <div className="w-100 d-flex justify-content-center text-center text-satoshi">
                  <span data-aos="fade-down" data-aos-delay="500">There are no products in your cart.</span>
                </div>
              )
            }
          </div>
          <div className="" style={{marginTop: "5px"}}>
            <div className="w-100 rounded-3 py-4 bg-sec d-flex contain-cart-chechkout px-4 align-items-center justify-content-around">
              <div className="code-div d-flex flex-column gap-3">
                <span className="text-satoshi fw-bold text-primary">Have A Code?</span>
                <input type="text" value={codePromo} onInput={(e) => setCodePromo(e.target.value)} disabled={discountPrice || dataNotAvaible ? true : false} className="bg-transparent form-control text-satoshi border-primary text-primary" placeholder="Drop code here.." />
                <div>
                  <button className="btn bg-primary text-light" disabled={discountPrice || dataNotAvaible ? true : false} onClick={() => handleApplyPromo()}>Apply</button>
                </div>
              </div>
              <div className="total-div d-flex flex-column text-satoshi">
                <div className="text-font-color d-flex justify-content-between gap-5">
                  <span>Total Price Product</span>
                  <span>Rp{parseFloat(totalAllProd).toLocaleString("id-ID")}</span>
                </div>
                <div className="text-font-color d-flex justify-content-between gap-5">
                  <span>Tax @11%</span>
                  <span>Rp{parseFloat(tax1).toLocaleString("id-ID")}</span>
                </div>
                <div className="text-font-color d-flex justify-content-between gap-5">
                  <span>Admin Tax @2%</span>
                  <span>Rp{parseFloat(tax2).toLocaleString("id-ID")}</span>
                </div>
                <div className="text-font-color justify-content-between gap-5" style={{display: isCode ? "flex" : "none"}}>
                  <span>Code - {codePromo}</span>
                  <span>- Rp{parseFloat(discountPrice).toLocaleString("id-ID")}</span>
                </div>
                <hr />
                <div className="text-font-color d-flex justify-content-between gap-5 mb-2">
                  <span className="fw-bold text-primary">Totals</span>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-primary">Rp{parseFloat(isCode ? totals : resultWithTax).toLocaleString("id-ID")}</span>
                    <s className="fw-bold text-danger" style={{display: isCode ? "flex" : "none"}}>Rp{parseFloat(resultWithTax).toLocaleString("id-ID")}</s>
                  </div>
                </div>
                <button className="btn bg-primary text-light" disabled={dataNotAvaible ? true : false} data-bs-toggle="modal" data-bs-target="#cartCheckout">Buy Now</button>
                <Modal2
                  modalName={"cartCheckout"}
                  modalLable={"cartCheckout"}
                  modalTitle={"Confirm Orders"}
                  cancelButton={true}
                  confirmButton={true}
                  modalConfirmText={"Checkout"}
                  handleSubmitForm={(e) => handleBuy(e)}
                  modalContent={
                    <>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <label>Recipient Name</label>
                          <input type="text" value={infoCust.recipient_name} onInput={(e) => setInfoCust({...infoCust, recipient_name: e.target.value})} required className="form-control" placeholder="Input recipient name here.." />
                        </div>
                        <div className="col-12 mb-3">
                          <label>Recipient Phone</label>
                          <input type="number" value={infoCust.recipient_phone} onInput={(e) => setInfoCust({...infoCust, recipient_phone: e.target.value})} required className="form-control" placeholder="Input recipient phone here.." />
                        </div>
                        <div className="col-12 mb-3">
                          <label>Your Address</label>
                          <input type="text" value={infoCust.location_client} onInput={(e) => setInfoCust({...infoCust, location_client: e.target.value})} required className="form-control" placeholder="Input your address here.." />
                        </div>
                        <div className="col-12 mb-3">
                          <label>Payment Method</label>
                          <Select
                            options={paymentOpt}
                            className="w-auto mb-3"
                            placeholder="Select here.."
                            onChange={(item) => {
                              setInfoCust({ ...infoCust, payment_method: item.value });
                            }}
                            isDisabled
                            value={paymentOpt.find((opt) => opt.value === "cod")}
                            required
                          />
                          <span className="text-danger">Product transactions in the cart can only use the COD payment method</span>
                        </div>
                      </div>
                      {/* <FormDetailBlogs dataDetail={selectedRow} /> */}
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  useEffect(() => {
    if (sessionStorage.getItem("success")) {
      Toast.fire({
        icon: "success",
        title: sessionStorage.getItem("success"),
      });
      sessionStorage.removeItem("success");
    }

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <Base
      isHide={true}
      mainContent={
        <>
          <SidebarProfile />
          <ButtonTrigSidebar />
          <section
            className=""
            style={{ background: "url('/images/bekron.png')" }}
          >
            <OrderContent />
          </section>
        </>
      }
    />
  );
};

export default Cart;
