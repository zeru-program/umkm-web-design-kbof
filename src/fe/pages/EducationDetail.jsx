import React, { useEffect, useState } from "react";
import Base from "../layouts/Base";
import { useParams } from "react-router-dom";
import N404 from "./N404";
import BlogsGet from "../../be/get/BlogsGet";
import Users from "../../be/get/Users";
import DOMPurify from "dompurify";
import dayjs from "dayjs";


const Detail = ({find, findAuthor}) => {
    const sanitizedContent = DOMPurify.sanitize(find.content);

  return (
    <section className="section section-detail-education d-flex flex-column align-items-center">
      <div className="w-100">
        <img src={find.img ? find.img : "/images/plants2-bg.jpg"} alt="" className="w-100" style={{height: "350px", objectFit: "cover"}} />
      </div>
      <div className="box-content-education py-5 d-flex flex-column py-4 container-main">
        <h3>
          {find.title}
        </h3>
        <div className="creator-education-detail mt-2 d-flex gap-2 align-items-center">
          <img src={findAuthor.img ? findAuthor.img : "/images/man1.jpg"} alt="" />
          <span>{findAuthor.username}</span>
        </div>
        <div className="mt-4">
           <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
            </div>
        </div>
      </div>
    </section>
  );
};

const Recomendation = ({dataBlogs, find, loadBlogs}) => {
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
        let filteredBlogs = dataBlogs.filter((item) => item.status === "active" && item.id !== find.id);
      
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
  return (
    <section className="section section-recomend mt-5 py-5">
      <h1>Recomendation</h1>
      <div className="d-flex mt-4 flex-wrap gap-4">
        {!loadBlogs ? (
            currentItems.map((item, index) => {
            return (
                <div className='box-education' key={index + 1}>
                <div className='date-type-education text-satoshi d-flex justify-content-between'>
                    <p>{dayjs(item.created_at).locale("id").format("D MMMM YYYY")}</p>
                    <div className='bg-primary rounded-3 px-2 text-light' style={{height: "26px"}}>
                        <p className='m-0'>{item.category}</p>
                    </div>
                </div>
                <div className='img-education'>
                    <img src={item.img ? item.img : ""} alt={item.title} />
                </div>
                <div className='mt-4'>
                    <h5 className="p-elipsis">{item.title}</h5>
                    <p className='text-satoshi p-elipsis'>{item.short_desc}</p>
                </div>
                <div>
                    <button className='btn bg-primary text-light' onClick={() => window.location.href = '/education/' + item.title}>Explore Now</button>
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
    </section>
  );
};

const EducationDetail = () => {
  const { idE } = useParams();
  const { dataBlogs, loadBlogs } = BlogsGet();
  const { dataUsers, loadUsers } = Users();
  const [find, setFind] = useState(null);
  const [findAuthor, setFindAuthor] = useState(null);
  useEffect(() => {
    if (dataBlogs && dataUsers && dataBlogs.length > 0) {
      const foundBlogs = dataBlogs.find((item) => item.title === idE);
      if (foundBlogs) {
        const findAuthors = dataUsers.find((item) => item.id === foundBlogs.created_by)
        // console.log(dataUsers)
        console.log(findAuthors)
        if (findAuthors) {
            setFindAuthor(findAuthors || null)
        }
        setFind(foundBlogs || null);
      } else {
        setFind(null);
      }
    }
  }, [dataBlogs, idE]);
  // Tampilkan spinner saat data sedang dimuat
  if (loadBlogs) {
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
  return (
    <Base
      mainContent={
        <>
          <section className="section-all-detail-product container-main">
            <Detail find={find} findAuthor={findAuthor} />
            <Recomendation dataBlogs={dataBlogs} find={find} loadBlogs={loadBlogs} />
          </section>
        </>
      }
    />
  );
};

export default EducationDetail;
