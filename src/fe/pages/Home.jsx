import React from "react";
import Base from "../layouts/Base";

const Hero = () => {
  return (
    <div className="hero hero-home">
      <div className="container-main d-flex align-items-center h-100">
        <div className="w-hero-title-home">
          <h1>Bring Nature Into Your Space</h1>
          <p>
            Discover our curated selection of aesthetic houseplants to transform
            your home into a vibrant, calming retreat. Green House—where nature
            meets elegance.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn bg-primary text-light">Explore Now</button>
            <button className="btn bg-transparent border-primary text-primary">
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
          <img src="/images/plants3.jpg" className="img-excess" alt="" />
          <div className="bg-primary frame-img-excess"></div>
        </div>
        <div className="d-flex flex-column">
          <h2 className="text-font-color">Handpicked Aesthetic Plants</h2>
          <p className="text-font-color">
            Carefully selected indoor plants to add elegance and freshness to
            your living space.
          </p>
          <div className="d-flex gap-3">
            <i
              className="iconify icon-excess"
              data-icon="game-icons:tree-branch"
            ></i>
            <div>
              <h3>Discover our curated</h3>
              <p>
                Discover our curated selection of aesthetic houseplants to
                transform your home int
              </p>
            </div>
          </div>
          <div className="d-flex gap-3">
            <i
              className="iconify icon-excess"
              data-icon="emojione-monotone:deciduous-tree"
            ></i>
            <div>
              <h3>Eco-Friendly Solutions</h3>
              <p>
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
          <h2>Handpicked Aesthetic Plants Handpicked Aesthetic</h2>
          <p>
            Carefully selected indoor plants to add elegance and freshness to
            your living space.Carefully selected indoor plants to add elegance
            and freshness to your living space.
          </p>
          <div>
            <button className="btn btn-light text-primary">Explore Now</button>
          </div>
        </div>
      </div>
      <div className="wrapper-img-cta1">
        <img src="/images/man1.jpg" alt="" />
      </div>
    </section>
  );
};

const CtaSection2 = () => {
  return (
    <section className="section section-cta2 d-flex flex-column justify-content-center">
      <div className="d-flex gap-3 w-100 justify-content-center align-items-center wrapper-img-cta2">
        <img src="/images/man2.jpg" alt="" />
        <img src="/images/man3.jpg" alt="" />
        <img src="/images/woman1.jpg" alt="" />
      </div>
      <div className="text-center w-100 d-flex flex-column mt-5 align-items-center">
        <h2>Handpicked Aesthetic Plants Handpicked Aesthetic</h2>
        <p>
          Carefully selected indoor plants to add elegance and freshness to your
          living space.
        </p>
        <div>
          <button className="btn bg-primary text-light">Explore Now</button>
        </div>
      </div>
    </section>
  );
};

const CtaSection3 = () => {
  return (
    <section className="section section-cta3 d-flex bg-primary container-main">
      <div className="wrapper-img-cta3 d-flex align-items-center">
        <img src="/images/plants1-full.png" className="" alt="" />
      </div>
      <div className="d-flex flex-column justify-content-center wrapper-text-cta3 text-light">
        <div>
          <h2>Handpicked Aesthetic Plants Handpicked Aesthetic</h2>
          <p>
            Carefully selected indoor plants to add elegance and freshness to
            your living space.Carefully selected indoor plants to add elegance
            and freshness to your living space.
          </p>
          <div>
            <button className="btn btn-light text-primary">Explore Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlantsQuote = () => {
  return (
    <section className="section text-center section-plants-quote d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex justify-content-beetwen">
        <div>
          <h2>Handpicked Aesthetic Plants Handpicked Aesthetic</h2>
          <p>
            Carefully selected indoor plants to add elegance and freshness to
            your living space.
          </p>
        </div>
        <div>
          <i className="bi bi-quote"></i>
        </div>
      </div>
      <div className="d-flex mt-5 gap-4 justify-content-center flex-wrap">
        <div className="box-quote text-center px-5 d-flex justify-content-center align-items-center flex-column">
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
        <div className="box-quote text-center px-5 d-flex justify-content-center align-items-center flex-column">
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
        <div className="box-quote text-center px-5 d-flex justify-content-center align-items-center flex-column">
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
