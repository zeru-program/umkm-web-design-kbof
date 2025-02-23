import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BtnToTop from "../components/BtnToTop";
import GreenAi from "../components/GreenAi";

const Base = ({ mainContent, isHide = false }) => {

  return (
    <>
      <section id="content">
        <GreenAi />
        <Navbar isHide={isHide} />
        <main>{mainContent}</main>
        <Footer />
        <BtnToTop />
      </section>
    </>
  );
};

export default Base;
