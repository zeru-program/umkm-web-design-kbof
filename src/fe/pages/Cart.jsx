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
  const { CartTh } = TheadCart()
  const { loadCarts, filterCarts, dataTableCarts } = CartsGet()
  const [selectedRow, setSelectedRow] = useState([]);
  // console.log(dataTableCarts)
  return (
    <>
      <div className="container-main w-100 py-5">
        <div className="w-100 d-flex flex-column py-3 mt-5">
          <h1 className="text-center mb-5" data-aos="fade-down">My Cart</h1>
          <div className="text-satoshi">
            <DataTable
              columns={CartTh}
              data={dataTableCarts}
              pagination
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
              selectableRows
              onSelectedRowsChange={(row) => setSelectedRow(row.selectedRows)}
              persistTableHead
              striped
              auto
              responsive
              customStyles={customStyles}
            />
          </div>
          {/* <nav className="pt-5 pb-3" aria-label="Page navigation example">
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
          </nav> */}
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
