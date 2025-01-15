import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductsOption from "../../be/options/ProductsOption";
import Select, { components } from "react-select";
import ProductsGet from "../../be/get/ProductsGet";
const searchStyles = {
  control: (base, state) => ({
      ...base,
      fontWeight: "500",
      width: "200px",
      border: "0",
      borderRadius: "10px",
      color: "red",
      background: "#EEEAE7",
      marginRight: "15px",
      paddingInline: "10px",
      textWrap: "nowrap",
      boxShadow: state.isFocused ? "0 0 0 1px #496653" : "none",
      "&:hover": {
        border: "0",
      },
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? "#496653" : state.isFocused ? "#496653" : "#EEEAE7",
      // background: "red",
      color: state.isFocused ? "#FFF" : "#333",
      cursor: "pointer",
      "&:active": {
        background: "#ddd",
      },
    }),
}
const isLoggedIn = sessionStorage.getItem('isLogin');
const role = sessionStorage.getItem('role');
const username = sessionStorage.getItem('username');
const isAdminOrDev = role === 'admin' || role === 'developer';

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    )
  );
};

const SearchIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="38" cy="40" r="20.5" stroke="currentColor" strokeWidth="7" />
    <path
      d="M76.0872 84.4699C78.056 86.4061 81.2217 86.3797 83.158 84.4109C85.0943 82.442 85.0679 79.2763 83.099 77.34L76.0872 84.4699ZM50.4199 59.2273L76.0872 84.4699L83.099 77.34L57.4317 52.0974L50.4199 59.2273Z"
      fill="currentColor"
    />
  </svg>
);

const Navbar = ({ isHide }) => {
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

  useEffect(() => {
    if (location.pathname === '/about-us') {
      setIsScroll(true)
    }
  })

  return (
    <header className={!isHide ? "d-block" : "d-none"}>
      {/* Promo bar */}
      <div className="bg-primary px-1 text-white text-center promo-bar">
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
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`} href="/contact-us">
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Search and icons */}
            <form className="d-flex flex-wrap gap-2 align-items-center">
              <Select
                styles={searchStyles}
                options={productOptClean}
                isSearchable={true}
                isClearable={true}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
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
                <div className="d-flex align-items-center gap-3">
                    {/* <span className="iconify text-primary icon-complementary" data-icon="mdi:person"></span> */}
                    {isLoggedIn && isAdminOrDev ? (
                      <>
                        <a href={isLoggedIn ? "/cart" : ""} className="d-flex mx-2 align-items-center text-primary position-relative" style={{display: isLoggedIn ? "flex" : "none",fontStyle: "normal", textDecoration: "none"}}>
                          <i
                            className={`text-primary icon-complementary ${
                              isLoggedIn ? 'fa-solid fa-basket-shopping' : ''
                            }`}
                          ></i>
                          </a>
                          <a href={!isLoggedIn ? "/auth/sign-in" : "/profile"} className="d-flex gap-3 align-items-center text-primary" style={{fontStyle: "normal", textDecoration: "none"}}>
                          <i
                            className={`text-primary icon-complementary bi bi-${
                              isLoggedIn ? 'person-fill' : 'box-arrow-in-right'
                            }`}
                          ></i>
                          </a>
                          <div className="dropdown">
                            <div className='d-flex gap-1' data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer"}}>
                              <span className='fw-bold'>Hi, {sessionStorage.getItem('username')}</span>
                              <i className='bi-caret-down-fill'></i>
                            </div>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => window.location.href = '/profile'}>Profile</a></li>
                              <li><a className="dropdown-item" href="/dashboard">Go Dashboard</a></li>
                              <li><a className="dropdown-item" href="/auth/logout"><span className="text-danger">Logout</span></a></li>
                            </ul>
                          </div>
                          {/* <a href="/dashboard" className="d-flex gap-3 align-items-center text-primary" style={{fontStyle: "normal", textDecoration: "none"}}>
                            <i className="text-primary icon-complementary bi bi-clipboard-data-fill"></i>
                            <span className="text-nowrap">Go Dashboard</span>
                          </a> */}
                        </>
                      ) : (
                        <>
                        <a href={isLoggedIn ? "/cart" : ""} className="d-flex mx-2 align-items-center text-primary position-relative" style={{display: isLoggedIn ? "flex" : "none",fontStyle: "normal", textDecoration: "none"}}>
                          <i
                            className={`text-primary icon-complementary ${
                              isLoggedIn ? 'fa-solid fa-basket-shopping' : ''
                            }`}
                          ></i>
                          {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">99+<span class="visually-hidden">unread messages</span></span> */}
                          </a>
                        <a href={!isLoggedIn ? "/auth/sign-in" : "/profile"} className="d-flex gap-3 align-items-center text-primary" style={{fontStyle: "normal", textDecoration: "none"}}>
                          <i
                            className={`text-primary icon-complementary bi bi-${
                              isLoggedIn ? 'person-fill' : 'box-arrow-in-right'
                            }`}
                          ></i>
                          </a>
                          {
                            isLoggedIn ?  (
                            <div className="dropdown">
                            <div className='d-flex gap-1' data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer"}}>
                              <span className='fw-bold'>Hi, {sessionStorage.getItem('username')}</span>
                              <i className='bi-caret-down-fill'></i>
                            </div>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => window.location.href = '/profile'}>Profile</a></li>
                              {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
                              <li><a className="dropdown-item text-danger" href="/auth/logout">Logout</a></li>
                            </ul>
                          </div>
                            ) : (<span className="text-nowrap" onClick={() => window.location.href = "/auth/sign-in"} style={{cursor: "pointer", color: "#496653"}}>Sign</span>) 
                          }
                        </>
                      )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
