import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "./components/Toast";
import SidebarProfile from "./components/SidebarProfile";
import Base from "./layouts/Base";
import OrdersGet from "../be/get/OrdersGet";
import ProductsGet from "../be/get/ProductsGet";
import Modal from "./components/dashboard/Modal";
import Select from "react-select";
import ReviewOption from "../be/options/ReviewOption";
import ReviewPost from "../be/post/ReviewPost";
import ReviewsGet from "../be/get/ReviewsGet";

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

const HistoryCanvas = () => {
  // const [comuledted, setComuled]
  const [dataReview, setDataReview] = useState({
    id_product: "",
    id_order: "",
    id_user: "",
    rating: "",
    feeling: ""
  })

  const { dataOrders } = OrdersGet();
  const { dataProducts } = ProductsGet();
  const { dataReviews } = ReviewsGet()
  const [orderFind, setOrderFind] = useState(null)
  const [productFind, setProductFind] = useState(null)
  const { feelOpt, star } = ReviewOption()
  const { handlePost } = ReviewPost()
  const [load, setLoad] = useState(true);
  // paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
    let filteredProducts = dataOrders.filter(
      (item) =>
        item.id_user === sessionStorage.getItem("id") &&
        item.status === "success"
    );

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));
    setTotalDatas(filteredProducts.length);
    setTotalPages(Math.ceil(totalDatas / itemsPerPage));
    setLoad(false);
  }, [dataProducts, currentPage, totalDatas]);

  useEffect(() => {
      const findO = dataOrders.find((item) => item.id_order === dataReview.id_order)
      if (findO) {
        console.log(findO)
        setOrderFind(findO)
    }
    const findP = dataProducts.find((item) => item.id_product === dataReview.id_product)
    if (findP) {
        setProductFind(findP)
    }
  }, [dataReview])

  const handleReview = async () => {
    const isEmpty = Object.values(dataReview).some((value) => !value);

    if (isEmpty) {
      return Toast.fire({
        icon: "error",
        title: "Please fill in all fields!",
      });
    }
    console.log("Submitting review:", dataReview);
    try {
        const res = await handlePost(dataReview)
        if (res) {
            sessionStorage.setItem('success', 'Success Created Review !')
            location.reload()
        }
    } catch (error) {

    }
  }

  useEffect((item) => {
    if (sessionStorage.getItem('success')) {
        Toast.fire({
          icon: "success",
          title: sessionStorage.getItem('success'),
        });
        sessionStorage.removeItem("success");
    }
  })
  return (
    <section className="w-100 d-flex gap-3 align-items-center py-3 ">
      <div className="w-100 container-main d-flex flex-column my-3">
        <div className="w-100 d-flex justify-content-center  flex-column my-3">
          <h1 className="text-center mt-5" data-aos="fade-down">My History</h1>
          <div className="d-flex gap-3 flex-column w-100 mt-5">
            {!load ? (
              currentItems.length > 0 ? (
                currentItems.map((data, index) => {
                  const find = dataProducts.filter(
                    (product) => product.id_product === data.id_product
                  );
                  if (find) {
                    return (
                      <div
                        data-aos="zoom-in" data-aos-delay="500"
                        key={index}
                        className="box-history rounded-3 overflow-hidden w-100 py-4 d-flex flex-wrap justify-content-between px-5 align-items-center"
                        style={{ background: "#E8EFEA" }}
                      >
                        <div className="d-flex flex-wrap w-auto gap-3 align-items-center">
                          <img
                            src={
                              find[0].img ||
                              "https://speptdrwxksyzfydiuzf.supabase.co/storage/v1/object/public/products/default-plant2.jpg"
                            }
                            alt={find[0].name}
                          />
                          <div>
                            <h3 className="text-satoshi text-left">
                              {find[0].name}{" "}
                              <span className="">x{data.qty}</span>
                            </h3>
                            <p className="text-primary">
                              Rp{" "}
                              {parseFloat(data.total).toLocaleString("id-ID")}
                            </p>
                            {
                                dataReviews.find((item) => item.id_order === data.id_order) ? (
                                    <>
                                    </>
                                ) : (
                                    <button className="btn bg-primary text-light" data-bs-toggle="modal" data-bs-target="#modalReview" onClick={() => setDataReview({...dataReview, id_order: data.id_order, id_product: data.id_product, id_user: data.id_user})}>
                                        Review
                                    </button>

                                )
                            }
                          </div>
                        </div>
                        <div className="gap-2 d-flex star-product">
                          {Array.from({ length: 5 }, (_, i) => {
                            const findRating = dataReviews.find((item) => item.id_order === data.id_order)

                            if (findRating) {
                                return (
                                <i
                                  key={i}
                                  className={`bi-star${
                                    i < findRating.rating ? "-fill" : ""
                                  }`}
                                ></i>
                                )
                            } else {
                                return (
                                <i
                                  key={i}
                                  className={`bi-star${
                                    i < find[0].rating ? "-fill" : ""
                                  }`}
                                ></i>
                                )
                            }
                        })}
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                          <span className="text-satoshi fw-bold">
                            {data.status}
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    setLoad(true);
                  }
                })
              ) : (
                <div className="w-100 d-flex justify-content-center text-center text-satoshi">
                  <span data-aos="fade-down" data-aos-delay="500">You have never ordered any products.</span>
                </div>
              )
            ) : (
              <div className="w-100 d-flex justify-content-center text-center text-satoshi">
                <span data-aos="fade-down" data-aos-delay="500">You have never ordered any products.</span>
              </div>
            )}
            <Modal modalConfirmClicked={handleReview} modalTitle="Review Product" modalName={"modalReview"} modalConfirmText="Review" modalContent={<>
                {
                    orderFind && productFind ? (
                    <form>
                        <div className="row">
                            <div className="col-12 justify-content-center w-100 d-flex mb-3">
                                <img src={productFind.img} className="img-thumbnail" style={{width: "150px"}} alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label>Product Name</label>
                                <input type="text" name="" value={productFind.name} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-2">
                                <label>Order Id</label>
                                <input type="text" name="" value={orderFind.id_order} disabled className="form-control" />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Recipient Name</label>
                                <input type="text" name="" value={orderFind.recipient_name} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label>Star</label>
                                <Select
                                    options={star}
                                    onChange={(item) => {
                                        setDataReview((prevState) => ({
                                        ...prevState,
                                        rating: item.value
                                        }));
                                    }}
                                    value={star.find((opt) => opt.value === dataReview.rating)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label>Feeling</label>
                                <Select
                                    options={feelOpt}
                                    onChange={(item) => {
                                        setDataReview((prevState) => ({
                                        ...prevState,
                                        feeling: item.value
                                        }));
                                    }}
                                    value={feelOpt.find((opt) => opt.value === dataReview.feeling)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    ) : ""
                }
                </>} />
            <nav className="pt-5 pb-3" aria-label="Page navigation example">
              <p className="text-center">
                Showing {totalPages} page of {totalDatas} Datas.
              </p>

              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handlePrevPage}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
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
          </div>
        </div>
      </div>
    </section>
  );
};

const MyHistory = () => {
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
            {/* <OrderContent /> */}
            {/* <ButtonTrigSidebar /> */}
            <HistoryCanvas />
          </section>
        </>
      }
    />
  );
};

export default MyHistory;
