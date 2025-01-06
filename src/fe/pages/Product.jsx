import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import ProductsGet from "../../be/get/ProductsGet";
import PromoGet from "../../be/get/PromoGet";
import Select from "react-select";
import Filter1Product from "../../be/options/Filter1Product";
import AOS from 'aos';
import 'aos/dist/aos.css';
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
const filterStyles = {
    control: (base, state) => ({
        ...base,
        fontWeight: "500",
        width: "140px",
        fontFamily: "var(--satoshi)",
        background: "transparent",
        borderRadius: 7,
        borderColor: "#496653",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          borderColor: "#496653"
        }
      }),    
    menu: base => ({
        ...base,
        zIndex: 100,
    })
}

const SectionWelcoming = ({searchProducts, setSearchProducts, filter, setFilter}) => {
    const { filter1, filter2 } = Filter1Product()
  return (
    <section className="w-100 d-flex flex-column align-content-center container-main section-product">
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-font-color" data-aos="zoom-in">Plants</h2>
        <p className="text-satoshi text-center" data-aos="zoom-in" data-aos-delay="300">
          Discover our curated selection of aesthetic houseplants to transform
          your home into a vibrant.
        </p>
        <div className="w-100 position-relative">
          <input
            data-aos="zoom-in" data-aos-delay="500"
            type="text"
            placeholder="Search Plant Here.."
            value={searchProducts}
            onInput={(e) => setSearchProducts(e.target.value)}
            className="text-satoshi form-control py-2 input-search-product "
          />
          <div className="bg-primary text-light d-flex justify-content-center align-items-center icon-search-product" data-aos="zoom-in" data-aos-delay="500">
            <i className="bi-search"></i>
          </div>
        </div>
      </div>
      <div className="d-flex mt-4 justify-content-between">
        <Select
            placeholder="Sort By"
            styles={filterStyles}
            options={filter1}
            onChange={(item) => {
                setFilter((prevState) => ({
                  ...prevState,
                  type: item.value
                }));
            }}
            data-aos="zoom-in" data-aos-delay="100"
            value={filter1.find((opt) => opt.value === filter.type)}
            required
          />
        <Select
            placeholder="Filter By"
            styles={filterStyles}
            options={filter2}
            onChange={(item) => {
                setFilter((prevState) => ({
                  ...prevState,
                  rating: item.value
                }));
            }}
            value={filter2.find((opt) => opt.value === filter.rating)}
            required
          />
      </div>
    </section>
  );
};

const DisplayProduct = () => {
  const { dataProducts, loadProducts } = ProductsGet();
  const { dataPromo } = PromoGet();
  const [searchProducts, setSearchProducts] = useState('')
  const [filter, setFilter] = useState({
    type: "",
    rating: 0,
  })

  // paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([])
  const [totalDatas, setTotalDatas] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    let filteredProducts = dataProducts.filter((item) => item.status === "active");
  
    if (filter.type === "popular") {
      filteredProducts = filteredProducts.filter((item) => item.is_popular);
    } else if (filter.type === "promo") {
      filteredProducts = filteredProducts.filter((item) => item.is_discount);
    } else if (filter.type === "newest") {
      filteredProducts = filteredProducts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (filter.rating !== 0) {
        // if (filter.rating ) {
            filteredProducts = filteredProducts.filter((item) => item.rating == filter.rating);
        // }
    }
  
    // Search filter
    if (searchProducts) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchProducts.toLowerCase())
      );
    }
  
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));
    setTotalDatas(filteredProducts.length);
    setTotalPages(Math.ceil(totalDatas /itemsPerPage))
  }, [dataProducts, searchProducts, filter, currentPage, totalDatas]);
  

  // console.log(dataProducts)
  return (
    <>
    <SectionWelcoming searchProducts={searchProducts} setSearchProducts={setSearchProducts} filter={filter} setFilter={setFilter} />
      <section className="w-100 mb-3 section section-display-product container-main d-flex flex-wrap gap-4 justify-content-center">
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
                data-aos="zoom-in" data-aos-delay="300"
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
      </section>
      <nav className="pb-5" aria-label="Page navigation example">
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
    </>
  );
};

const Product = () => {
  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true,
    })
}, [])
  return (
    <Base
      mainContent={
        <>
          {/* <SectionWelcoming /> */}
          <DisplayProduct />
        </>
      }
    />
  );
};

export default Product;
