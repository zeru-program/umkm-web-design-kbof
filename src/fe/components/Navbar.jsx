import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductsOption from "../../be/options/ProductsOption";
import Select from "react-select";
import ProductsGet from "../../be/get/ProductsGet";
const searchStyles = {
  control: (base) => ({
      ...base,
      fontWeight: "500",
      width: "180px",
      marginRight: "15px",
      textWrap: "nowrap"
    }),
}
const isLoggedIn = sessionStorage.getItem('isLogin');
const role = sessionStorage.getItem('role');
const username = sessionStorage.getItem('username');
const isAdminOrDev = role === 'admin' || role === 'developer';



const Navbar = () => {
  const location = useLocation()
  const { idP } = useParams()
  const { idE } = useParams()
  const { productOptClean } = ProductsOption()
  const { dataProducts } = ProductsGet()
  const [isScroll, setIsScroll] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(".hero");
      const heroHeight = heroSection?.offsetHeight || 0;
      
      if (window.scrollY > heroHeight) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  useEffect(() => {
    const find = dataProducts.find((item) => item.id_product === search)
    if (find) {
      window.location.href = "/plants/" + find.name
    }
  }, [search])

  return (
    <header>
      {/* Promo bar */}
      <div className="bg-primary text-white text-center promo-bar">
        🌱 Limited Time Offer! Get 15% Off All Indoor Plants — Use Code{" "}
        <strong>GREEN15</strong> At Checkout! 🌱
      </div>

      {/* Main navbar */}
      <nav className={`navbar navbar-expand-lg  navbar-light w-100 ${isScroll ? 'bg-light shadow-sm' : 'bg-transparent blur'}`}>
          {/* Logo */}
          <a className="navbar-brand w-100 d-flex justify-content-center position-absolute fw-bold" href="/">
            <img src="/images/logo-navbar.png" alt="logo-navbar" />
          </a>
        <div className="container w-100 justify-content-end position-relative">
          {/* Toggler for mobile */}
          <button
            className={`navbar-toggler ${isScroll ? '' : 'bg-primary text-light'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="bi-list nav-tog-icon"></span>
          </button>
          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/plants' || idP ? 'active' : ''}`} href="/plants">
                  Plants
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/education' || idE ? 'active' : ''}`} href="/education">
                  Education
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/about-us' ? 'active' : ''}`} href="/about-us">
                  About Us
                </a>
              </li>
            </ul>

            {/* Search and icons */}
            <form className="d-flex flex-wrap gap-2 align-items-center">
              <Select
              styles={searchStyles}
                options={productOptClean}
                placeholder='Search A Product'
                onChange={(item) => {
                  setSearch(item.value)
                }}
                value={productOptClean.find((opt) => opt.value === search)}
                required
              />
              <div className="gap-3 d-flex">
                {/* <a href="/">
                  <span className="iconify text-primary icon-complementary" data-icon="mdi:bell"></span>
                </a> */}
                <div className="d-flex align-items-center gap-2">
                    {/* <span className="iconify text-primary icon-complementary" data-icon="mdi:person"></span> */}
                    {isLoggedIn && isAdminOrDev ? (
                      <>
                          <a href="/dashboard" className="d-flex gap-3 align-items-center text-primary" style={{fontStyle: "normal", textDecoration: "none"}}>
                            <i className="text-primary icon-complementary bi bi-clipboard-data-fill"></i>
                            <span className="text-nowrap">Go Dashboard</span>
                          </a>
                        </>
                      ) : (
                        <>
                        <a href={!isLoggedIn ? "/auth/sign-in" : "#"} className="d-flex gap-3 align-items-center text-primary" style={{fontStyle: "normal", textDecoration: "none"}}>
                          <i
                            className={`text-primary icon-complementary bi bi-${
                              isLoggedIn ? 'person-fill' : 'box-arrow-in-right'
                            }`}
                          ></i>
                          {
                            isLoggedIn ?  (
                            <div className="dropdown">
                            <div className='d-flex gap-1' data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer"}}>
                              <span className='fw-bold'>Hi, {sessionStorage.getItem('username')}</span>
                              <i className='bi-caret-down-fill'></i>
                            </div>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => document.getElementById('iClick').click()}>Profile</a></li>
                              {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
                              <li><a className="dropdown-item text-danger" href="/auth/logout">Logout</a></li>
                            </ul>
                          </div>
                            ) : (<span className="text-nowrap">Sign</span>) 
                          }
                          </a>
                        </>
                      )}
                </div>
                {/* <a href="/">
                  <span className="iconify text-primary icon-complementary" data-icon="fa6-solid:bucket"></span>
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
