import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import { data, useParams } from "react-router-dom";
import ProductsGet from "../../be/get/ProductsGet";
import N404 from "./N404";
import PromoGet from "../../be/get/PromoGet";
import AOS from "aos";
import 'animate.css';
import "aos/dist/aos.css";
import Modal from "../components/dashboard/Modal";
import Modal2 from "../components/dashboard/Modal2";
import CartsPost from "../../be/post/CartsPost";
import Toast from "../components/Toast";
import CartsEdit from "../../be/edit/CartsEdit";
import CartsGet from "../../be/get/CartsGet";
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

const SupportText = ({ idP, find, dataProducts }) => {
  return (
    <div className="support-text d-none">
      <h2 className="text-font-color" data-aos="fade-right">{find.name}</h2>
      <p data-aos="fade-right" data-aos-delay="500">{find.description}</p>
    </div>
  );
};

const ImgProduct = ({ find, findPromo }) => {
  return (
    <div className="img-product-detail text-center position-relative">
        {findPromo ? (
             <div className="bg-primary text-satoshi discount-text px-3 position-absolute top-0 start-0 text-light" data-aos="zoom-in" data-aos-delay="800" style={{zIndex: 100}}>
                <span className="">- {findPromo.percentage_promo}</span>
            </div>
        ) : ""}
      <img src={find.img ? find.img : "/images/plants1-full2.png"} className="mb-4" data-aos="zoom-in" data-aos-delay="500" alt="" />
      <span className="text-danger w-100" data-aos="zoom-in" data-aos-delay="500">You must sign in if you want to buy this product</span>
    </div>
  );
};

const ReadyCheckout = ({ find, findPromo }) => {
  const [qtyCart, setQtyCart] = useState(1)
  const { handlePost } = CartsPost()
  const { handleEdit } = CartsEdit()
  const { dataCarts } = CartsGet()
  const handleBuy = () => {
    if (!sessionStorage.getItem('isLogin')) {
        sessionStorage.setItem('error', 'You must log in to order products!')
        window.location.href = '/auth/sign-in/'
      }
    window.location.href = '/checkout/' + find.name
  }
  const handleAddCart = async (e) => {
    e.preventDefault()
    try {
      const productInUserExist = dataCarts.find((item) => item.user_id === sessionStorage.getItem('id') && item.product_id === find.id_product)
      if (productInUserExist) {
        const dataExist = {
          qty: productInUserExist.qty + qtyCart
        }

        const resEdit = await handleEdit(dataExist, productInUserExist.key)
        if (resEdit) {
          sessionStorage.setItem('success', 'Success Add ' + qtyCart + ' Items to cart')
        } else {
          alert('something wrong..')
        }
      } else {
        const data = {
          cart_id: "",
          product_id: find.id_product,
          user_id: sessionStorage.getItem('id'),
          qty: qtyCart,
        }
        // console.log(data)
        const res = await handlePost(data)

        if (res) {
          sessionStorage.setItem('success', 'Success Add ' + qtyCart + ' Product to cart')
        } else {
          alert('something wrong..')
        }
     }
      location.reload()
    } catch (error) {
      console.error(error)
      alert('failed to fetch')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('success')) {
      Toast.fire({
        icon: "success",
        title: sessionStorage.getItem('success'),
      });
      sessionStorage.removeItem("success");
  }
  }, [])
  return (
    <div className="ready-checkout">
      <div className="img-spec mb-3">
        <img src={find.img ? find.img : "/images/plants1-full2.png"} data-aos="zoom-in" data-aos-delay="500" alt="" />
      </div>
      <div className="gap-2 d-flex align-items-end contain-spec flex-column">
        <div>
          <h1 className="d-mobile" data-aos="fade-left" >{find.name}</h1>
        </div>
        <div className="d-flex gap-2">
          <span data-aos="fade-left" data-aos-delay="300">{find.spesification.height}cm Height</span>
        </div>
        <div className="d-flex gap-2">
          <span data-aos="fade-left" data-aos-delay="500">{find.spesification.weight}kg Weight</span>
        </div>
        <div className="d-flex gap-2">
          <span data-aos="fade-left" data-aos-delay="800">
            {find.spesification.is_fresh
              ? "Lush and healthy plants"
              : "Old production plants"}
          </span>
        </div>
      </div>
      <div className="d-flex flex-column contain-spec align-items-end" data-aos="fade-left" data-aos-delay="500">
          {findPromo && findPromo.result_price && findPromo.initial_price ? (
            <>
            <h3 className="text-font-color">
                Rp{parseFloat(findPromo.result_price).toLocaleString("id-ID")}
            </h3>
            <s className="text-danger">Rp{parseFloat(findPromo.initial_price).toLocaleString("id-ID")}</s>
            </>
          ) : <>
                <h3 className="text-font-color">
                    Rp{parseFloat(find.price).toLocaleString("id-ID")}
                </h3>
          </>}
      </div>
      <div className="d-flex mt-3 gap-3">
        <button className="btn bg-transparent align-items-center border-primary px-3 text-primary" style={{display: sessionStorage.getItem('isLogin') ? "flex" : "none"}} data-bs-toggle="modal" data-bs-target="#addCart">
          <i className="fa-solid fa-basket-shopping" style={{paddingRight: "10px"}}></i>
          Add To Cart
        </button>
        <Modal2
            modalName={"addCart"}
            modalLable={"addCartModal"}
            modalTitle={"Add Produk To Cart"}
            cancelButton={true}
            confirmButton={true}
            modalConfirmText={"Add"}
            handleSubmitForm={(e) => handleAddCart(e)}
            modalContent={
              <>
                <div className="form-group mb-2 w-100 d-flex flex-column align-items-center justify-content-center h-100">
                  <input type="number" className="bg-transparent w-100 text-center border-0 text-dark" value={qtyCart} readOnly />
                  <div className="d-flex gap-3 mt-3">
                      <button type="button" onClick={(e) => setQtyCart((prevQty) => (prevQty > 1 ? prevQty - 1 : 1))} className="btn bg-transparent border-primary text-primary px-4">-</button>
                      <button type="button" onClick={(e) => setQtyCart(qtyCart + 1)} className="btn bg-primary text-light px-4">+</button>
                  </div>
                </div>
                {/* <FormDetailBlogs dataDetail={selectedRow} /> */}
              </>
            }
          />
        <button className="btn bg-primary px-4 text-light" onClick={() => handleBuy()}>Buy Now</button>
        {/* <button
          className="btn bg-transparent text-primary"
          style={{ border: "1.5px solid #496653" }}
        >
          Add To Chart
        </button> */}
      </div>
    </div>
  );
};

const Detail = ({ idP, find, findPromo, dataProducts }) => {
  return (
    <section className="section section-detail-product">
      <div className="w-100 d-flex contain-detail justify-content-between">
        <SupportText idP={idP} find={find} dataProducts={dataProducts} />
        <ImgProduct find={find} findPromo={findPromo} />
        <ReadyCheckout find={find} findPromo={findPromo} />
      </div>
    </section>
  );
};

const Recomendation = ({ find, findPromo }) => {
  const { dataProducts, loadProducts } = ProductsGet();
  const { dataPromo } = PromoGet();
  // paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const [totalDatas, setTotalDatas] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    let filteredProducts = dataProducts.filter(
      (item) => item.status === "active" && item.id_product !== find.id_product
    );

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));
    setTotalDatas(filteredProducts.length);
    setTotalPages(Math.ceil(totalDatas / itemsPerPage));
  }, [dataProducts, currentPage, totalDatas]);

  return (
    <section className="section section-recomend mt-5 py-5">
      <h1 data-aos="fade-right">Recomendation</h1>
      <div className="d-flex mt-4 flex-wrap w-100 justify-content-center gap-4">
        {!loadProducts ? (
          currentItems.map((item, index) => {
            let find;
            let isFind;
            if (item.is_discount) {
              const findTemporary = dataPromo.find(
                (data) => data.id_product === item.id_product
              );
              if (
                findTemporary &&
                findTemporary.periode_start <= formattedDate.slice(0, 10) &&
                findTemporary.periode_end >= formattedDate.slice(0, 10)
              ) {
                find = findTemporary;
                isFind = (
                  <div className="bg-primary discount-text px-3 position-absolute top-0 start-0 text-light">
                    <span className="">- {find.percentage_promo}</span>
                  </div>
                );
              }
            }
            return (
              <div
                key={index + 1}
                className="box-product d-flex flex-column align-items-center text-satoshi position-relative"
                onClick={() => (window.location.href = "/plants/" + item.name)}
                 data-aos="zoom-in" data-aos-delay="500"
              >
                {isFind}
                <div>
                  <img src={item.img} className="img-product" alt="" />
                </div>
                <div className="d-flex flex-column w-100">
                  <span className="fw-bold title-product">{item.name}</span>
                  <div className="d-flex w-100 contain-star-product">
                    <div className="d-flex gap-2">
                      <span className="price-product">
                        Rp
                        {find
                          ? parseFloat(find.result_price).toLocaleString(
                              "id-ID"
                            )
                          : parseFloat(item.price).toLocaleString("id-ID")}
                      </span>
                      {find ? (
                        <s className="text-danger">
                          Rp
                          {parseFloat(find.initial_price).toLocaleString(
                            "id-ID"
                          )}
                        </s>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="gap-2 d-flex star-product">
                      {Array.from({ length: 5 }, (_, i) => (
                        <i
                          key={i}
                          className={`bi-star${i < item.rating ? "-fill" : ""}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="py-2 mt-4 px-4">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
      </div>

      <nav aria-label="Page navigation example" className="mt-5">
        <p className="text-center">
          Showing {totalPages} page of {totalDatas} Datas.
        </p>

        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
         {/* {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))} */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

const ProductDetail = () => {
  const { idP } = useParams();
  const { dataProducts, loadProducts } = ProductsGet();
  const { dataPromo } = PromoGet();
  const [find, setFind] = useState(null);
  const [findPromo, setFindPromo] = useState(null);

  useEffect(() => {
    if (dataProducts && dataProducts.length > 0) {
      const foundProduct = dataProducts.find((item) => item.name === idP);
      if (foundProduct) {
          const foundProductPromo = dataPromo.find((item) => item.id_product === foundProduct.id_product && (item.status === "active" && item.periode_start <= formattedDate.slice(0, 10) && item.periode_end >= formattedDate.slice(0, 10)));
          if (foundProductPromo) {
            // console.log('product is promo')
            console.log(formattedDate.slice(0, 10))
            setFindPromo(foundProductPromo || null)
          }
          setFind(foundProduct || null); // Jika tidak ditemukan, set ke null
          
      AOS.init({
        duration: 1000,
        once: true,
      });
      } else {
        setFind(null)
        setFindPromo(null)
      }
    }


  }, [dataProducts, idP]);

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
        <section className="section-all-detail-product container">
          <Detail idP={idP} find={find} findPromo={findPromo} dataProducts={dataProducts} />
          <Recomendation idP={idP} find={find} findPromo={findPromo} />
        </section>
      }
    />
  );
};

export default ProductDetail;
