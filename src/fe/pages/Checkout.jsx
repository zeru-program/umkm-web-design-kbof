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
import Select from 'react-select';
import Toast from "../components/Toast";
import Swal from "sweetalert2";
import OrdersPost from "../../be/post/OrdersPost";
import Payment from "../../be/options/Payment";
import PostOrder from "../../be/midtrans/PostOrder";
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

const SupportText = ({ idC, find, dataProducts }) => {
  return (
    <div className="support-text d-none">
      <h2 className="text-font-color">{find.name}</h2>
      <p>{find.description}</p>
    </div>
  );
};

const ImgProduct = ({ find, findPromo }) => {
  return (
    <div className="img-product-detail position-relative">
      {findPromo && (findPromo.periode_start <= formattedDate.slice(0, 10) && findPromo.periode_end >= formattedDate.slice(0, 10)) ? (
        <div className="bg-primary text-satoshi discount-text px-3 position-absolute top-0 start-0 text-light">
          <span className="">- {findPromo.percentage_promo}</span>
        </div>
      ) : (
        ""
      )}
      <img src={find.img ? find.img : "/images/plants1-full2.png"} alt="" />
    </div>
  );
};

const CardCheckout = ({ find, findPromo }) => {
  const { dataCode } = CodeGet()
  const { handlePost } = OrdersPost()
  const { paymentOpt } = Payment()
  const { postPayment } = PostOrder()
  const { dataProducts } = ProductsGet()
  const [disabledButton, setDissabledButton] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [discountPrice, setDiscountPrice] = useState('')
  const [dataCheckout, setDataCheckout] = useState({
    id_product: find.id_product,
    id_order: GenerateString(9),
    id_user: sessionStorage.getItem('id'),
    location_client: '',
    recipient_name: '',
    recipient_phone: '',
    payment_method: '',
    order_note: '',
    qty: '1',
    status: 'pending',
    token: GenerateString(15),
    token_payment: '',
    total: '',
    created_at: formattedDate,
  })
  const [totals, setTotals] = useState(0)
  const [codePromo, setCodePromo] = useState('')
  const { dataUsers } = Users()
  const [tax1, setTax1] = useState(0)
  const [tax2, setTax2] = useState(0)
  const userFind = dataUsers.find((item) => item.id === sessionStorage.getItem('id'))
  
  const calculateTotal = (quantity) => {
    const basePrice = findPromo
      ? find.is_discount && findPromo.periode_start <= formattedDate.slice(0, 10) && findPromo.periode_end >= formattedDate.slice(0, 10)
        ? findPromo.result_price
        : find.price
      : find.price;
  
    const subtotal = basePrice * quantity;
    const tax1 = subtotal * (11 / 100); // 11% pajak
    const tax2 = subtotal * (2 / 100); // 2% admin pajak
  
    const total = subtotal + tax1 + tax2;
    setTax1(tax1); // Set nilai tax1
    setTax2(tax2); // Set nilai tax2
  
    return total.toFixed(0);
  };
  
  useEffect(() => {
    const baseTotal = calculateTotal(dataCheckout.qty);
    const promo = dataCode.find((item) => item.code_name === codePromo);

    if (promo && codePromo) {
      const discount = (parseInt(promo.percentage_promo.replace("%", ""), 10) / 100) * baseTotal;
      // console.log(discount)
      setDiscountPrice(discount)
      const newTotal = baseTotal - discount;
      setTotals(newTotal);
      setDataCheckout({ ...dataCheckout, total: newTotal });
      return
    }
    const updatedTotal = calculateTotal(dataCheckout.qty);
    setTotals(updatedTotal);
    setDataCheckout({ ...dataCheckout, total: updatedTotal });
  }, [dataCheckout.qty, find.price]);
  

  const handleApplyPromo = () => {
    const baseTotal = calculateTotal(dataCheckout.qty);
    const promo = dataCode.find((item) => item.code_name === codePromo);

    if (promo) {
      const discount = (parseInt(promo.percentage_promo.replace("%", ""), 10) / 100) * baseTotal;
      // console.log(discount)
      setDiscountPrice(discount)
      const newTotal = baseTotal - discount;
      setTotals(newTotal.toFixed(0));
      setIsCode(true)
      setDataCheckout({...dataCheckout, total: newTotal.toFixed(0)}); 
      Swal.fire({
        title: "Success",
        text: "Code applied successfully",
        icon: "success"
      });
    } else {
      setTotals(baseTotal); 
      setIsCode(false)
      setDataCheckout({...dataCheckout, total: baseTotal}); 
      Swal.fire({
        title: "Failed",
        text: "Oops, Code cannot be used.",
        icon: "error"
      });
    }
  };

  const handleCheckout = () => {
    const form = document.getElementById("form-checkout");
    if (form) {
      if (form.checkValidity()) {
        if (dataCheckout.recipient_phone.length <= 8) {
          return  Toast.fire('Input Recipient Phone Must Minimal 8 Character !', '', 'error')
        }
        if (!dataCheckout.payment_method) {
          return  Toast.fire('Input Payment is required !', '', 'error')
        }
        setDissabledButton(true)
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      } else {
        // Jika validasi gagal, tampilkan pesan error
        form.reportValidity();
      }
    }
  }

  const handleSubmitCheckout = async (e) => {
    e.preventDefault()
    // console.log('submit')
    try {
      let tokenPay = {...dataCheckout, token_payment: "" }
      if (dataCheckout.payment_method === 'digital') {
        const find = dataProducts.find((item) => item.id_product === dataCheckout.id_product)
        if (find) {
          const res = await postPayment(dataCheckout.id_order, find.id_product, find.name, parseFloat(findPromo ? findPromo.result_price : find.price), dataCheckout.total, parseInt(dataCheckout.qty), dataCheckout.id_user, sessionStorage.getItem('username'), discountPrice)
          if (res) {
            console.log(res)
            tokenPay = {...dataCheckout, token_payment: res.token }
            setDataCheckout({...dataCheckout, token_payment: res.token })
            sessionStorage.setItem(`order_session_${dataCheckout.id_order}`, res.token)
            sessionStorage.setItem('first_pay', res.token)
            // return
          } else {
            console.error("failed to fetch midtrans")
            return
          }
        } else {
          Toast.fire({
            icon: "error",
            title: "Cannot find a product",
          });
          return
        }
      }
      const res = await handlePost(tokenPay)
      if (res) {
        sessionStorage.setItem('success', "Success Created Order")
        window.location.href = '/detail/order/' + dataCheckout.id_order
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    // console.log(find)
    if (find.is_discount) {

    }
    // setDataCheckout({...dataCheckout, price: })
  }, [find])


  return (
    <div className=" w-100 mt-5 d-flex flex-wrap justify-content-between">
      <form className="w50-res pb-3" id="form-checkout" onSubmit={(e) => handleSubmitCheckout(e)}>
        <div className="row">
          <div className="col-12 mb-3">
            <label>Product Name</label>
            <input type="text" disabled placeholder="" required value={find.name + " - " + find.id_product} onInput={(e) => setDataCheckout({...dataCheckout, recipient_name: e.target.value})} className="form-control" id="" />
          </div>
          <div className="col-12 mb-3">
            <label>Product Price (1 unit)</label>
            <input type="text" placeholder="Input recipient name here.." disabled required value={"Rp" + parseFloat(find.is_discount ? findPromo.result_price : find.price).toLocaleString("id-ID")} className="form-control" id="" />
          </div>
          <div className="col-12 mb-3">
            <label>Recipient Name</label>
            <input type="text" placeholder="Input recipient name here.." required value={dataCheckout.recipient_name} onInput={(e) => setDataCheckout({...dataCheckout, recipient_name: e.target.value})} className="form-control" id="" />
          </div>
          <div className="col-12 mb-3">
            <label>Recipient Phone</label>
            <div className="input-group">
              <span className="input-group-text">+62</span>
              <input type="number" placeholder="Input recipient name here.." minLength={8} value={dataCheckout.recipient_phone} required onInput={(e) => setDataCheckout({...dataCheckout, recipient_phone: e.target.value})} className="form-control" id="" />
            </div>
          </div>
          <div className="col-12 mb-3">
            <label>Your Address</label>
            <input type="text" placeholder="Input your address here.." required value={dataCheckout.location_client} onInput={(e) => setDataCheckout({...dataCheckout, location_client: e.target.value})} className="form-control" id="" />
          </div>
          <div className="col-12 mb-3">
            <label>Quantity Product</label>
            <div className="input-group">
              <span className="input-group-text">x</span>
              <input type="number" placeholder="Input quantity product.." min={1} max={30} value={dataCheckout.qty} onInput={(e) => {
                setDataCheckout({...dataCheckout, qty: e.target.value})
                setTotals((find.price * dataCheckout.qty) + (find.price * (11 / 100)) + (find.price * (2 / 100)))
              }} required  className="form-control" id="" />
            </div>
          </div>
        </div>
      </form>
      <div className="w50-res">
        <div className="w-100 d-flex flex-column">
          <div className="w-100 mb-3 justify-content-between align-items-center d-flex">
            <div className="d-flex gap-3 align-items-center">
            <img src={find.img} className="img-thumbnail img-tbody" alt="" />
            <span>x{dataCheckout.qty || 1}</span>
            </div>
            <span>Rp{parseFloat(find.is_discount && findPromo && (findPromo.periode_start <= formattedDate.slice(0, 10) && findPromo.periode_end >= formattedDate.slice(0, 10)) ? findPromo.result_price * dataCheckout.qty : find.price * dataCheckout.qty).toLocaleString("id-ID")}</span>
          </div>
          <div className="w-100 mb-3 justify-content-between  d-flex">
            <span>Total Product</span>
            <span>x{dataCheckout.qty}</span>
          </div>
          <div className="w-100 mb-3 justify-content-between  d-flex">
            <span>Total Price Product</span>
            <span>Rp{parseFloat(find.is_discount && findPromo && (findPromo.periode_start <= formattedDate.slice(0, 10) && findPromo.periode_end >= formattedDate.slice(0, 10)) ? findPromo.result_price * dataCheckout.qty : find.price * dataCheckout.qty).toLocaleString("id-ID")}</span>
          </div>
          <div className="w-100 mb-3 justify-content-between  d-flex">
            <span>Tax @11% (Indonesia)</span>
            <span>Rp{parseInt(tax1).toLocaleString("id-ID")}</span>
          </div>
          <div className="w-100 mb-3 justify-content-between  d-flex">
            <span>Admin Tax @2%</span>
            <span>Rp{parseFloat(tax2.toFixed(0)).toLocaleString("id-ID")}</span>
          </div>
          <div className="text-font-color mb-2  justify-content-between gap-5" style={{display: isCode ? "flex" : "none"}}>
            <span>Code - {codePromo}</span>
            <span>- Rp{parseFloat(discountPrice).toLocaleString("id-ID")}</span>
          </div>
          <div className="w-100 mb-0 justify-content-between  d-flex">
            <span className="fw-bold">Totals</span>
            <div className="d-flex flex-column">
              <span className="fw-bold">Rp{parseFloat(totals).toLocaleString("id-ID")}</span>
              <s className="fw-bold text-danger" style={{display: isCode ? "flex" : "none"}}>Rp{parseFloat(find.is_discount && findPromo && (findPromo.periode_start <= formattedDate.slice(0, 10) && findPromo.periode_end >= formattedDate.slice(0, 10)) ? (findPromo.result_price * dataCheckout.qty) + tax1 + tax2 : (find.price * dataCheckout.qty) + tax1 + tax2).toLocaleString("id-ID")}</s>
            </div>
          </div>
          <div className="mb-3 w-100">
            <label className="fw-normal mt-2">Payment</label>
              <Select
                options={paymentOpt}
                className="w-auto"
                placeholder="Select here.."
                onChange={(item) => {
                  setDataCheckout({ ...dataCheckout, payment_method: item.value });
                }}
                value={paymentOpt.find((opt) => opt.value === dataCheckout.payment_method)}
                required
              />
          </div>
          <div className="w-100 mb-3 flex-column align-items-start d-flex">
            <span>Have A Code?</span>
            <input type="text" placeholder="Drop here.." value={codePromo} onInput={(e) => setCodePromo(e.target.value)} disabled={discountPrice ? true : false} className="form-control mt-2" />
            <button className={`mt-3 btn w-100 border-${discountPrice ? " bg-primary text-light" : "primary text-primary"} text-satoshi`} disabled={discountPrice ? true : false} onClick={() => handleApplyPromo()}>Apply</button>
            {/* <span className="text-danger text-center mt-3" style={{fontSize: "13px"}}>All of these products only support COD payments</span> */}
          </div>
        </div>
      </div>
      <button className="mt-3 py-3 btn w-100 bg-primary text-satoshi text-light" disabled={disabledButton ? true : false} onClick={() => handleCheckout()}>Checkout</button>
    </div>
  );
};

const Detail = ({ idC, find, findPromo, dataProducts }) => {
  return (
    <section className="section section-detail-product mb-5 pb-5">
      <BoxDash
        content={
          <>
            <div className="w-100 d-flex contain-detail flex-column align-items-center">
              <ImgProduct find={find} findPromo={findPromo} />
              <CardCheckout find={find} findPromo={findPromo} />
            </div>
          </>
        }
      />
    </section>
  );
};

const Checkout = () => {
  const { idC } = useParams();
  const { dataProducts, loadProducts } = ProductsGet();
  const { dataPromo } = PromoGet();
  const [find, setFind] = useState(null);
  const [findPromo, setFindPromo] = useState(null);

  useEffect(() => {
    if (dataProducts && dataProducts.length > 0) {
      const foundProduct = dataProducts.find((item) => item.name === idC);
      const foundProductPromo = dataPromo.find(
        (item) => item.id_product === foundProduct.id_product
      );
      if (foundProductPromo) {
        // console.log('product is promo')
        setFindPromo(foundProductPromo || null);
      }
      setFind(foundProduct || null); // Jika tidak ditemukan, set ke null
    }
  }, [dataProducts, idC]);

  // Tampilkan spinner saat data sedang dimuat
  if (loadProducts) {
    return (
      <div className="py-2 w-100 vh-100 d-flex justify-content-center align-items-center mt-4 px-4">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    // Tampilkan halaman 404 jika produk tidak ditemukan
    if (!find) {
      return <N404 />;
    }
  }


  // Render halaman detail produk
  return (
    <Base
      mainContent={
        <section className="section-all-detail-product container-main">
          <Detail
            idC={idC}
            find={find}
            findPromo={findPromo}
            dataProducts={dataProducts}
          />
        </section>
      }
    />
  );
};

export default Checkout;
