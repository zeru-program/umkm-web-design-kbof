import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Toast from './components/Toast';
import SidebarProfile from './components/SidebarProfile';
import Base from './layouts/Base';
import OrdersGet from '../be/get/OrdersGet';
import ProductsGet from '../be/get/ProductsGet';

const ButtonTrigSidebar = () => {
    return (
        <div className='d-flex gap-3 align-items-center'>
            <div className='' data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button" id='iClick'>
            <i className='bi-list fw-bold cursor-pointer' style={{cursor: "pointer", fontSize: "25px"}} ></i>
            </div>
            <div className='d-flex align-items-center gap-2' style={{cursor: "pointer"}} onClick={() => history.back()}>
                <i className='bi bi-arrow-left'></i>
                <span>Back</span>
            </div>
        </div>
    )
}

const HistoryCanvas = () => {
    // const [comuledted, setComuled]
    
    const { dataOrders } = OrdersGet()
    const { dataProducts } = ProductsGet()
    const [load, setLoad] = useState(true)
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
          let filteredProducts = dataOrders.filter((item) => item.id_user === sessionStorage.getItem('id') && item.status === "success");
        
          // Pagination
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          setCurrentItems(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));
          setTotalDatas(filteredProducts.length);
          setTotalPages(Math.ceil(totalDatas /itemsPerPage))
          setLoad(false)
        }, [dataProducts, currentPage, totalDatas]);
    return (
        <section className='w-100 d-flex gap-3 align-items-center py-3 '>
            <div className='w-100 container-main d-flex flex-column my-3'>
                <ButtonTrigSidebar />
                <div className='w-100 d-flex justify-content-center  flex-column my-3'>
                    <h1 className='text-center mt-5'>My History</h1>
                    <div className='d-flex gap-3 flex-column w-100 mt-5'>
                    {
                        !load ?
                        currentItems.length > 0 ? 
                        currentItems.map((data, index) => {
                            const find = dataProducts.filter((product) => product.id_product === data.id_product)
                            return (
                            <div key={index} className='box-history rounded-3 overflow-hidden w-100 py-4 d-flex flex-wrap justify-content-between px-5 align-items-center' style={{background: "#E8EFEA"}}>
                            <div className='d-flex flex-wrap w-auto gap-3 align-items-center'>
                                <img src={find[0].img || "https://speptdrwxksyzfydiuzf.supabase.co/storage/v1/object/public/products/default-plant2.jpg"} alt={find[0].name} />
                                <div>
                                    <h3 className='text-satoshi text-left'>{find[0].name} <span className=''>x{data.qty}</span></h3>
                                    <p className='text-primary'>Rp {parseFloat(data.total).toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                            <div className="gap-2 d-flex star-product">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <i
                                    key={i}
                                    className={`bi-star${i < find[0].rating ? "-fill" : ""}`}
                                    ></i>
                                ))}
                            </div>
                            <div>
                                <span className='text-satoshi fw-bold'>{data.status}</span>
                            </div>
                        </div>
                            );
                        }) : (
                            <div className='w-100 d-flex justify-content-center text-center text-satoshi'>
                                <span>You have never ordered any products.</span>
                            </div>
                            )
                            : "tes"
                    }
                    <nav className="pt-5 pb-3" aria-label="Page navigation example">
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
                    </div>
                </div>
            </div>
        </section>
    )
}


const MyHistory = () => {
    useEffect(() => {
        
      if (sessionStorage.getItem('success')) {
        Toast.fire({
          icon: "success",
          title: sessionStorage.getItem('success'),
        });
        sessionStorage.removeItem("success");
    }

      AOS.init({
          duration: 1000,
          once: true,
      })
  }, [])
    return (
      <Base
      isHide={true}
        mainContent={
          <>
          <SidebarProfile/>
          <section className='' style={{background: "url('/images/bekron.png')"}}>
            {/* <OrderContent /> */}
            {/* <ButtonTrigSidebar /> */}
            <HistoryCanvas />
          </section>
          </>
        }
      />
    );
}

export default MyHistory