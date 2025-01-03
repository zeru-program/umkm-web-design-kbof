import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BtnToTop from "../components/BtnToTop";

const Base = ({ mainContent }) => {

  return (
    <>
      <section id="content">
        <Navbar />
        <main>{mainContent}</main>
        <Footer />
        <BtnToTop />
      </section>
    </>
  );
};

export default Base;
