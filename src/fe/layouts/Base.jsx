import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Base = ({ mainContent }) => {

  return (
    <>
      <section id="content">
        <Navbar />
        <main>{mainContent}</main>
        <Footer />
      </section>
    </>
  );
};

export default Base;
