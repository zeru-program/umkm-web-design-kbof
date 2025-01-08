import React, { useEffect } from "react";
import Base from "../layouts/Base";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  return (
    <div className="hero hero-home"  data-aos="fade-down">
      <div className="container-main d-flex align-items-center h-100">
        <div className="w-hero-title-home">
          <h1 data-aos="fade-right">Bring Nature Into Your Space</h1>
          <p data-aos="fade-right" data-aos-delay="300">
            Discover our curated selection of aesthetic houseplants to transform
            your home into a vibrant, calming retreat. Green House—where nature
            meets elegance.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn bg-primary text-light" data-aos="fade-right" data-aos-delay="800">Explore Now</button>
            <button className="btn bg-transparent border-primary text-primary" data-aos="fade-right" data-aos-delay="500">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionExcess = () => {
  return (
    <section className="section section-excess text-primary">
      <div className="d-flex align-items-center wrapper-excess justify-content-center container-main h-100">
        <div className="position-relative contain-img-excess">
          <img src="/images/plants3.jpg" className="img-excess" data-aos="fade-right" data-aos-delay="500" alt="" />
          <div className="bg-primary frame-img-excess"></div>
        </div>
        <div className="d-flex contain-text-excess flex-column">
          <h1 className="text-font-color" data-aos="fade-left">Handpicked Aesthetic Plants</h1>
          <p className="text-font-color" data-aos="fade-left" data-aos-delay="300">
            Carefully selected indoor plants to add elegance and freshness to
            your living space.
          </p>
          <div className="d-flex gap-3">
            <i
              className="iconify icon-excess"
              data-icon="game-icons:tree-branch"
              data-aos="zoom-in" data-aos-delay="1000"
            ></i>
            <div>
              <h3 data-aos="fade-left" data-aos-delay="500">Discover our curated</h3>
              <p data-aos="fade-left" data-aos-delay="800">
                Discover our curated selection of aesthetic houseplants to
                transform your home int
              </p>
            </div>
          </div>
          <div className="d-flex gap-3">
            <i
              className="iconify icon-excess"
              data-icon="emojione-monotone:deciduous-tree"
               data-aos="zoom-in" data-aos-delay="1300"
            ></i>
            <div>
              <h3 data-aos="fade-left" data-aos-delay="800">Eco-Friendly Solutions</h3>
              <p data-aos="fade-left" data-aos-delay="800">
                Our plants and pots are sourced with sustainability in mind, for
                a greener future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaSection1 = () => {
  return (
    <section className="section section-cta1 position-relative">
      <div className="d-flex flex-column wrapper-text-cta1 text-light container-main bg-primary">
        <div>
          <h1 data-aos="fade-right" >Elevate Your Space with the Beauty of Stunning Plants!</h1>
          <p data-aos="fade-right" data-aos-delay="300">
            Elevate your home with our handpicked collection of vibrant, fresh plants. Shop now and create a greener, more inspiring environment today!
          </p>
          <div>
            <button className="btn btn-light text-primary" data-aos="fade-right" data-aos-delay="500" onClick={() => window.location.href = '/plants'}>Go To Plant</button>
          </div>
        </div>
      </div>
      <div className="wrapper-img-cta1">
        <img src="/images/man1.jpg" alt="" data-aos="fade-left" data-aos-delay="500" />
      </div>
    </section>
  );
};

const CtaSection2 = () => {
  return (
    <section className="section section-cta2 d-flex flex-column justify-content-center">
      <div className="d-flex gap-3 w-100 justify-content-center align-items-center wrapper-img-cta2">
        <img src="/images/man2.jpg" alt=""data-aos="zoom-in" />
        <img src="/images/man3.jpg" alt="" data-aos="zoom-in" data-aos-delay="300" />
        <img src="/images/woman1.jpg" alt="" data-aos="zoom-in" data-aos-delay="500" />
      </div>
      <div className="text-center container-main w-100 d-flex flex-column mt-5 align-items-center">
        <h1 data-aos="fade-up">Unlock the Secrets to Thriving Plants!</h1>
        <p data-aos="fade-up" data-aos-delay="300">
          Learn the best care techniques and plant care hacks in our Education section. Elevate your skills and let your plants flourish like never before!
        </p>
        <div>
          <button className="btn bg-primary text-light" data-aos="fade-up" data-aos-delay="500" onClick={() => window.location.href = '/education'}>Go To Education</button>
        </div>
      </div>
    </section>
  );
};

const CtaSection3 = () => {
  return (
    <section className="section section-cta3 d-flex bg-primary container-main">
      <div className="wrapper-img-cta3 d-flex align-items-center">
        <img src="/images/plants1-full.png" className="" alt="" data-aos="fade-right" />
      </div>
      <div className="d-flex flex-column justify-content-center wrapper-text-cta3 text-light">
        <div>
          <h1 data-aos="fade-left">Get to Know Us – The Passion Behind Green House!</h1>
          <p data-aos="fade-left" data-aos-delay="100">
          Discover the story, vision, and dedication that drive our mission to bring nature closer to you. Learn how we’re committed to transforming spaces and building greener futures together.
          </p>
          <div>
            <button className="btn btn-light text-primary" data-aos="fade-left" data-aos-delay="300" onClick={() => window.location.href = '/about-us'}>Go To About Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlantsQuote = () => {
  return (
    <section className="section  section-plants-quote d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex justify-content-beetwen container-main">
        <div>
          <h1 data-aos="fade-down" className="text-left">Handpicked Aesthetic Plants Handpicked Aesthetic</h1>
          <p data-aos="fade-down" data-aos-delay="100">
            Carefully selected indoor plants to add elegance and freshness to
            your living space.
          </p>
        </div>
        <div>
          <i className="bi bi-quote qute" data-aos="fade-down" data-aos-delay="100"></i>
        </div>
      </div>
      <div className="d-flex mt-5 gap-4 justify-content-center align-items-center flex-wrap">
        <div className="box-quote text-center px-5 d-flex justify-content-center align-items-center flex-column" data-aos="zoom-in" data-aos-delay="300">
          <div>
            <p>
              “Carefully selected indoor plants to add elegance and freshness to
              your living space.elegance and freshness to your living space.”
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src="/images/woman1.jpg" alt="" />
              <p className="m-0">Muhhamad Farhan</p>
            </div>
          </div>
        </div>
        <div className="box-quote text-center px-5 d-flex justify-content-center align-items-center flex-column" data-aos="zoom-in" data-aos-delay="500">
          <div>
            <p>
              “Carefully selected indoor plants to add elegance and freshness to
              your living space.elegance and freshness to your living space.”
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src="/images/woman1.jpg" alt="" />
              <p className="m-0">Justine</p>
            </div>
          </div>
        </div>
        <div className="box-quote text-center px-5 d-flex justify-content-center align-items-center flex-column" data-aos="zoom-in" data-aos-delay="700">
          <div>
            <p>
              “Carefully selected indoor plants to add elegance and freshness to
              your living space.elegance and freshness to your living space.”
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src="/images/woman1.jpg" alt="" />
              <p className="m-0">Muhhamad Farhan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
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
          <Hero />
          <SectionExcess />
          <CtaSection1 />
          <CtaSection2 />
          <CtaSection3 />
          <PlantsQuote />
        </>
      }
    />
  );
};

export default Home;