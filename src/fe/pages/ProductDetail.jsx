import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import { data, useParams } from "react-router-dom";
import ProductsGet from "../../be/get/ProductsGet";
import N404 from "./N404";
import PromoGet from "../../be/get/PromoGet";
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
      <h2 className="text-font-color">{find.name}</h2>
      <p>{find.description}</p>
    </div>
  );
};

const ImgProduct = ({ find, findPromo }) => {
  return (
    <div className="img-product-detail text-center position-relative">
        {findPromo ? (
             <div className="bg-primary text-satoshi discount-text px-3 position-absolute top-0 start-0 text-light">
                <span className="">- {findPromo.percentage_promo}</span>
            </div>
        ) : ""}
      <img src={find.img ? find.img : "/images/plants1-full2.png"} className="mb-4" alt="" />
      <span className="text-danger w-100">You must sign in if you wan to but this product</span>
    </div>
  );
};

const ReadyCheckout = ({ find, findPromo }) => {
  return (
    <div className="ready-checkout">
      <div className="img-spec mb-3">
        <img src={find.img ? find.img : "/images/plants1-full2.png"} alt="" />
      </div>
      <div className="gap-2 d-flex align-items-end contain-spec flex-column">
        <div className="d-flex gap-2">
          <span>{find.spesification.height}cm Height</span>
        </div>
        <div className="d-flex gap-2">
          <span>{find.spesification.weight}kg Weight</span>
        </div>
        <div className="d-flex gap-2">
          <span>
            {find.spesification.is_fresh
              ? "Lush and healthy plants"
              : "Old production plants"}
          </span>
        </div>
      </div>
      <div className="d-flex flex-column contain-spec align-items-end">
          {findPromo ? (
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
        <button className="btn bg-primary px-5 text-light" onClick={() => window.location.href = '/checkout/' + find.name}>Buy Now</button>
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

const Recomendation = ({ find }) => {
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
      <h1>Recomendation</h1>
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
                findTemporary.periode_start === formattedDate.slice(0, 10) &&
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
          {Array.from({ length: totalPages }, (_, i) => (
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
          ))}
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
          const foundProductPromo = dataPromo.find((item) => item.id_product === foundProduct.id_product);
          if (foundProductPromo) {
            // console.log('product is promo')
            setFindPromo(foundProductPromo || null)
          }
          setFind(foundProduct || null); // Jika tidak ditemukan, set ke null
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
  }

  // Tampilkan halaman 404 jika produk tidak ditemukan
  if (!find) {
    return <N404 />;
  }

  // Render halaman detail produk
  return (
    <Base
      mainContent={
        <section className="section-all-detail-product container-main">
          <Detail idP={idP} find={find} findPromo={findPromo} dataProducts={dataProducts} />
          <Recomendation idP={idP} find={find} />
        </section>
      }
    />
  );
};

export default ProductDetail;
