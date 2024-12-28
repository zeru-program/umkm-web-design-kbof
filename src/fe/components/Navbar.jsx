import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Navbar = () => {
  const location = useLocation()
  const { idP } = useParams()
  const { idE } = useParams()
  const [isScroll, setIsScroll] = useState(false)

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
            <form className="d-flex align-items-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search a Product"
                aria-label="Search"
              />
              <div className="gap-3 d-flex">
                <a href="/">
                  <span className="iconify text-primary icon-complementary" data-icon="mdi:bell"></span>
                </a>
                <a href="/">
                  <span className="iconify text-primary icon-complementary" data-icon="mdi:person"></span>
                </a>
                <a href="/">
                  <span className="iconify text-primary icon-complementary" data-icon="fa6-solid:bucket"></span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
