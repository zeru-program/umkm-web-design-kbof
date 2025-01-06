import React, { useEffect } from 'react'
import Base from '../layouts/Base'
import AOS from 'aos';
import 'aos/dist/aos.css';

const SectionWelcoming = () => {
    return (
        <section className='w-100 d-flex flex-column align-content-center container-main section-aboutus'>
            <div className='d-flex flex-column align-items-center'>
                <h2 className='text-font-color' data-aos="fade-down">About Us</h2>
            </div>
            <div className='contain-about-top my-5 pb-5'>
                <div className='d-flex flex-column'>
                    <div className="d-flex flex-column text-primary">
                    <h1 className="text-font-color" data-aos="fade-right" data-aos-delay="100">Handpicked Aesthetic Plants</h1>
                    <p className="text-font-color" data-aos="fade-right" data-aos-delay="300">
                        Carefully selected indoor plants to add elegance and freshness to
                        your living space.
                    </p>
                    <div className="d-flex gap-3">
                        <i
                        className="iconify icon-excess"
                        data-icon="game-icons:tree-branch"
                        data-aos="zoom-in" data-aos-delay="500"
                        ></i>
                        <div>
                        <h3 data-aos="fade-right" data-aos-delay="400">Discover our curated</h3>
                        <p data-aos="fade-right" data-aos-delay="500">
                            Discover our curated selection of aesthetic houseplants to
                            transform your home int
                        </p>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <i
                        className="iconify icon-excess"
                        data-icon="emojione-monotone:deciduous-tree"
                        data-aos="zoom-in" data-aos-delay="500"
                        ></i>
                        <div>
                        <h3 data-aos="fade-right" data-aos-delay="600">Eco-Friendly Solutions</h3>
                        <p data-aos="fade-right" data-aos-delay="700">
                            Our plants and pots are sourced with sustainability in mind, for
                            a greener future.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='img-about-us'>
                    <img src="/images/logo-navbar.png" data-aos="zoom-in" data-aos-delay="700" alt="" />
                </div>
                <div>
                    <img src="" alt="" />
                </div>
            </div>
        </section>
    )
}


const AboutUs = () => {
    useEffect(() => {
      AOS.init({
          duration: 1000,
          once: true,
      })
  }, [])
  return (
    <Base mainContent={<>
    <SectionWelcoming />
    </>} />
  )
}

export default AboutUs