import React, { useEffect } from "react";
import Base from "../layouts/Base";
import AOS from "aos";
import "aos/dist/aos.css";

const GetInTouch = () => {
  return (
    <section className="section container-main mb-5 section-contactus">
      <div className="mb-5">
        <h1 className="text-center w-100 text-primary">Contact Us</h1>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-3 contain-touch">
        <div className="d-flex flex-column">
          <h2>Get In Touch</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            magnam veritatis, quaerat nesciunt omnis pariatur autem consequuntur
            vitae ducimus, nostrum perferendis fugit totam exercitationem
            dolores.
          </p>
          <div className="d-flex gap-3 mb-3 align-items-center text-primary">
            <i className="bi-geo-alt icon-contact"></i>
            <div className="d-flex flex-column">
              <h3 className="fw-bold">Our Address</h3>
              <h5 className="text-dark text-satoshi">
                Jl. Raya Tajur, Kp. Buntar RT.02/RW.08, Kel. Muara sari, Kec.
                Bogor Selatan, RT.03/RW.08, Muarasari, Kec. Bogor Sel., Kota
                Bogor, Jawa Barat 16137
              </h5>
            </div>
          </div>
          <div className="d-flex gap-3 mb-3 align-items-center text-primary">
            <i className="bi-envelope icon-contact"></i>
            <div className="d-flex flex-column">
              <h3 className="fw-bold">Our Email</h3>
              <h5 className="text-dark text-satoshi">contact@greenhouse.com</h5>
            </div>
          </div>
          <div className="d-flex gap-3 mb-3 align-items-center text-primary">
            <i className="bi-telephone icon-contact"></i>
            <div className="d-flex flex-column">
              <h3 className="fw-bold">Call Us</h3>
              <h5 className="text-dark text-satoshi">+6287774487198</h5>
            </div>
          </div>
        </div>
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.04983961244!2d106.82211897499403!3d-6.640733393353795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8b16ee07ef5%3A0x14ab253dd267de49!2sSMK%20Negeri%204%20Bogor%20(Nebrazka)!5e0!3m2!1sid!2sid!4v1736333512068!5m2!1sid!2sid"
            width={600}
            height={450}
            style={{ border: "0" }}
            allowFullScreen
            className="iframe-map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

const ContactUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <Base
      mainContent={
        <>
          <GetInTouch />
        </>
      }
    />
  );
};

export default ContactUs;
