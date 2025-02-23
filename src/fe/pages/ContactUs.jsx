import React, { useEffect } from "react";
import Base from "../layouts/Base";
import AOS from "aos";
import "aos/dist/aos.css";

const GetInTouch = () => {
  return (
    <section className="section container mb-5 pb-5 pi30 section-contactus">
      <div className="mb-5">
        <h1 className="text-center w-100 text-primary" data-aos="fade-up">Contact Us</h1>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-3 contain-touch">
        <div className="d-flex flex-column">
        <h2 className="text-primary" data-aos="fade-up" data-aos-delay="300">Get In Touch</h2>
          <p className="" data-aos="fade-up" data-aos-delay="500">
          Green House bridges ornamental plant sellers in Bogor with plant lovers across Indonesia, making buying and selling plants effortless and enjoyable
          </p>
          <div className="d-flex gap-3 mb-3 mt-3 align-items-center text-primary" data-aos="fade-up" data-aos-delay="600">
            <i className="bi-geo-alt icon-contact"></i>
            <div className="d-flex flex-column">
              <h3 className="fw-bold">Our Address</h3>
              <p className="text-font-color text-satoshi">
                Jl. Raya Tajur, Kp. Buntar RT.02/RW.08, Kel. Muara sari, Kec.
                Bogor Selatan
              </p>
            </div>
          </div>
          <div className="d-flex gap-3 mb-3 align-items-center text-primary" data-aos="fade-up">
            <i className="bi-envelope icon-contact"></i>
            <div className="d-flex flex-column">
              <h3 className="fw-bold">Our Email</h3>
              <p className="text-font-color text-satoshi">contact@greenhouse.com</p>
            </div>
          </div>
          <div className="d-flex gap-3 mb-3 align-items-center text-primary" data-aos="fade-up">
            <i className="bi-telephone icon-contact"></i>
            <div className="d-flex flex-column">
              <h3 className="fw-bold">Call Us</h3>
              <p className="text-font-color text-satoshi">+6287774487198</p>
            </div>
          </div>
        </div>
        <div className="mb-5" data-aos="zoom-in" data-aos-delay="500">
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
      <SendUsMessage />
    </section>
  );
};

const SendUsMessage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    const text = `
    Hi Justine, I'm ${e.target[0].value} My Email ${e.target[1].value}, I will contact you with the title is ${e.target[2].value}, My Message is ${e.target[3].value}
    `;
    const numberOwner = "6287774487198"
    const apiWa = "https://wa.me/" + numberOwner + "?text=" + text
    window.open(apiWa, "_blank")
  }
  return (
    <section className="w-100 container mt-5">
      <h2  className="text-font-color text-center" data-aos="fade-up">Send Us a Message</h2  >
      <p className="text-font-color pb-4 text-center" data-aos="fade-up">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat laboriosam repellat dicta quis at?</p>
      <form className="d-flex flex-column text-satoshi" data-aos="fade-up" onSubmit={(e) => handleSubmit(e)}>
        <div className="row mb-3">
          <div className="col-6">
            <label>Name</label>
            <input type="text" className="form-control bg-transparent border-primary text-satoshi" required placeholder="Enter full name.." />
          </div>
          <div className="col-6">
            <label>Email</label>
            <input type="email" className="form-control bg-transparent border-primary text-satoshi" required placeholder="Enter Your Email Address.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <label>Subject</label>
            <input type="text" className="form-control bg-transparent border-primary text-satoshi" required placeholder="Enter the subject of your message.." />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>Message</label>
            <textarea className="form-control bg-transparent border-primary text-satoshi" rows={5} required placeholder="Enter your message Here.." />
          </div>
        </div>
        <div className="mt-4">
          <button className="btn bg-primary text-light">Send Message</button>
        </div>
      </form>
    </section>
  )
}

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
