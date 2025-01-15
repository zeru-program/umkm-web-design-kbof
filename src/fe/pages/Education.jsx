import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import BlogsGet from "../../be/get/BlogsGet";
import PromoGet from "../../be/get/PromoGet";
import Select from "react-select";
import Filter1Product from "../../be/options/Filter1Product";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import locale bahasa Indonesia
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
        // match with the menu
        borderRadius: 7,
        // Overwrittes the different states of border
        borderColor: "#496653",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: "#496653"
        }
      }),    
    menu: base => ({
        ...base,
        zIndex: 100,
        // background: "red"
    })
}

const SectionWelcoming = ({searchBlogs, setSearchBlogs, filter, setFilter}) => {
    const { filter1, filter2 } = Filter1Product()
  return (
    <section className="w-100 d-flex flex-column align-items-center mb-4 container-main section-product">
      <div className="d-flex w-title-products flex-column align-items-center">
        <h2 className="text-font-color" data-aos="zoom-in">Educations</h2>
        <p className="text-satoshi text-center" data-aos="zoom-in" data-aos-delay="300">
        Explore our curated articles on aesthetic houseplants to transform your home into a vibrant and lively space
        </p>
        <div className="w-100 position-relative">
          <input
            type="text"
            data-aos="zoom-in" data-aos-delay="500"
            placeholder="Search Education Here.."
            value={searchBlogs}
            onInput={(e) => setSearchBlogs(e.target.value)}
            className="text-satoshi form-control py-4 px-4 input-search-product"
          />
          <div className="bg-primary text-light d-flex justify-content-center align-items-center icon-search-product" data-aos="zoom-in" data-aos-delay="500">
            <i className="bi-search"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

const DisplayEducation = () => {
  const { dataBlogs, loadBlogs } = BlogsGet();
  const { dataPromo } = PromoGet();
  const [searchBlogs, setSearchBlogs] = useState('')
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
    let filteredBlogs = dataBlogs.filter((item) => item.status === "active");
  
    if (filter.type === "popular") {
      filteredBlogs = filteredBlogs.filter((item) => item.is_popular);
    } else if (filter.type === "newest") {
      filteredBlogs = filteredBlogs.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (filter.rating !== 0) {
        // if (filter.rating ) {
            filteredBlogs = filteredBlogs.filter((item) => item.rating == filter.rating);
        // }
    }
  
    // Search filter
    if (searchBlogs) {
      filteredBlogs = filteredBlogs.filter((item) =>
        item.title.toLowerCase().includes(searchBlogs.toLowerCase())
      );
    }
  
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(filteredBlogs.slice(indexOfFirstItem, indexOfLastItem));
    setTotalDatas(filteredBlogs.length);
    setTotalPages(Math.ceil(totalDatas /itemsPerPage))
  }, [dataBlogs, searchBlogs, filter, currentPage, totalDatas]);
  

  // console.log(dataBlogs)
  return (
    <>
    <SectionWelcoming searchBlogs={searchBlogs} setSearchBlogs={setSearchBlogs} filter={filter} setFilter={setFilter} />
      <section className="w-100 mb-3 section section-display-product container-main d-flex flex-wrap gap-4 justify-content-center" style={{marginTop: "-230px"}}>
        {!loadBlogs ? (
          currentItems.map((item, index) => {
            return (
                <div className='box-education' key={index + 1} data-aos="zoom-in" data-aos-delay="300">
                <div className='date-type-education text-satoshi d-flex justify-content-between'>
                    <p>{dayjs(item.created_at).locale("id").format("D MMMM YYYY")}</p>
                    <div className='bg-primary rounded-3 px-2 text-light' style={{height: "26px"}}>
                        <p className='m-0'>{item.category}</p>
                    </div>
                </div>
                <div className='img-education'>
                    <img src={item.img ? item.img : ""} alt={item.title} />
                </div>
                <div className='mt-4 overflow-hidden' style={{ height: "140px"}}>
                    <h5 className="title-elipsis">{item.title}</h5>
                    <p className='text-satoshi p-elipsis'>{item.short_desc}</p>
                </div>
                <div className="position-absolute" style={{bottom: "20px"}}>
                    <button className='btn bg-primary text-light' onClick={() => window.location.href = '/education/' + item.title}>Read Now</button>
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

const Education = () => {
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
          <DisplayEducation />
        </>
      }
    />
  );
};

export default Education;
